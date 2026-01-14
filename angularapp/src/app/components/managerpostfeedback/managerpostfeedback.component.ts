import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Feedback } from 'src/app/models/feedback.model';
import { Trainer } from 'src/app/models/trainer.model';
import { FeedbackService } from 'src/app/services/feedback.service';
import { TrainerService } from 'src/app/services/trainer.service';

@Component({
  selector: 'app-managerpostfeedback',
  templateUrl: './managerpostfeedback.component.html'
})
export class ManagerpostfeedbackComponent implements OnInit {

  feedbackForm!: FormGroup;
  selectedTrainerId: number | null = null;
  selectedTrainer:Trainer|null=null;

  catogories:string[]=["Session Quality","Punctuality","Responsiveness","Technical Knowledge","Time Managemen","Communication","Presentation Skills","Other"]

  constructor(private fb: FormBuilder,
     private feedbackService: FeedbackService,
     private route :ActivatedRoute,
     private snackBar:MatSnackBar,
     private trainerService:TrainerService,
    private router:Router) {}

  ngOnInit(): void {
    this.feedbackForm = this.fb.group({
      feedbackText: ['', Validators.required],
      category: ['', Validators.required]
    });

    this.selectedTrainerId=+this.route.snapshot.paramMap.get('trainerId')!;
    console.log(this.selectedTrainerId);

    this.trainerService.getTrainerById(this.selectedTrainerId).subscribe((data)=>
    {
      this.selectedTrainer=data;
    })


  }

  onSubmit(): void {
    if (this.feedbackForm.valid) {
      const jsonData=JSON.parse(sessionStorage.getItem('LogggedInUser')!);
      const currentUserId=jsonData.userId;
      console.log(currentUserId);
      const feedback: Feedback = {
        ...this.feedbackForm.value,
        userId:currentUserId , 
        trainerId:this.selectedTrainerId, 
        date: new Date().toISOString().split('T')[0]
      };
      console.log(feedback);
      this.feedbackService.sendFeedback(feedback).subscribe(() => {
        this.snackBar.open('Feedback addded on '+this.selectedTrainer?.name,'Close',{duration:2000});
        this.router.navigate(['/my-feedbacks']);
        this.feedbackForm.reset();
      });
    }
  }

}
