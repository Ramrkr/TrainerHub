import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Feedback } from 'src/app/models/feedback.model';
import { Trainer } from 'src/app/models/trainer.model';
import { FeedbackService } from 'src/app/services/feedback.service';
import { TrainerService } from 'src/app/services/trainer.service';


@Component({
  selector: 'app-managerviewfeedback',
  templateUrl: './managerviewfeedback.component.html',
  styleUrls: ['./managerviewfeedback.component.css']
})
export class ManagerviewfeedbackComponent implements OnInit {
 
  feedbackList: Feedback[] = [];
  showDeleteConfirm: boolean = false;
  showTrainerInfo: boolean = false;
  selectedTrainer: Trainer | null =null;
  feedbackToDelete: Feedback | null = null;

  constructor(private feedbackService: FeedbackService,private trainerService:TrainerService,private route :ActivatedRoute) {}
  id :number = 0;
  ngOnInit() {
    this.loadFeedbacks();
  }
  loadFeedbacks() {
    const jsonData=JSON.parse(sessionStorage.getItem('LogggedInUser')!);
    const currentUserId=jsonData.userId;
    console.log(currentUserId);
    
    this.feedbackService.getAllFeedbacksByUserId(currentUserId).subscribe((data)=>
    {
      this.feedbackList=data;
      console.log('data loaded');
      console.log(this.feedbackList);
    },(error)=>{
      console.log(error);
      
    })
  }

  viewTrainerInfo(trainerId:number)
  {
    this.trainerService.getTrainerById(trainerId).subscribe((data)=>
    {
      this.selectedTrainer=data;
      console.log(this.selectedTrainer);
      this.showTrainerInfo=true;
    },(error)=>{
      console.log(error);
    })

  }

  confirmDelete(feedback:Feedback)
  {
    this.showDeleteConfirm=true;
    this.feedbackToDelete=feedback;

  }

  closeTrainerInfo() {
    this.selectedTrainer = null;
    this.showTrainerInfo = false;
  }

  cancelDelete() {
    this.feedbackToDelete = null;
    this.showDeleteConfirm = false;
  }


  deleteFeedback() {
    if (this.feedbackToDelete && this.feedbackToDelete.feedbackId !== undefined) {
      this.feedbackService.deleteFeedback(this.feedbackToDelete.feedbackId).subscribe((result) => {
        console.log('feedback deleted successfully');
        this.loadFeedbacks();
        this.showDeleteConfirm=false;
      },(error)=>{
        console.log(error);
      });
    }
}
 

}

