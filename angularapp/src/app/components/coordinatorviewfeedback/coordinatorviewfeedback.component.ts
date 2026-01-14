import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Feedback } from 'src/app/models/feedback.model';
import { Requirement } from 'src/app/models/requirement.model';
import { Trainer } from 'src/app/models/trainer.model';
import { User } from 'src/app/models/user.model';
import { CustomPaginatorService } from 'src/app/pagination/custom-paginator.service';
import { AuthService } from 'src/app/services/auth.service';
import { FeedbackService } from 'src/app/services/feedback.service';
import { TrainerService } from 'src/app/services/trainer.service';

@Component({
  selector: 'app-coordinatorviewfeedback',
  templateUrl: './coordinatorviewfeedback.component.html',
  styleUrls: ['./coordinatorviewfeedback.component.css']
})
export class CoordinatorviewfeedbackComponent implements OnInit {

  feedbacks: Feedback[] = [];
  filterCategory: string = "";
  viewTrainer: boolean = false;
  viewUser: boolean = false;

  trainer: Trainer = {
    name: '',
    email: '',
    phone: '',
    expertise: '',
    experience: '',
    certification: '',
    resume: '',
    joiningDate: null,
    status: ''
  };

  selectedUser: User | null = null;

  categories: string[] = [
    "Session Quality", "Punctuality", "Responsiveness", "Technical Knowledge",
    "Time Management", "Communication", "Presentation Skills", "Other"
  ];

  constructor(
    private feedbackService: FeedbackService,
    private authService: AuthService,
    private trainerService: TrainerService,
    private customPaginationService:CustomPaginatorService
  ) {}

  ngOnInit(): void {
    this.getAllUsers();
    this.loadFeedbacksByPages();
    this.customPaginationService.setLabels('feedback');
  }

  loadFeedbacks() {
    this.feedbackService.getFeedbacks().subscribe(
      (result) => {
        this.feedbacks = result;
        console.log(result);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  showUserDetails(userId: number) {
    this.authService.getUserById(userId).subscribe(
      (data) => {
        this.selectedUser = data;        
        this.viewUser = true;
        console.log('User data loaded:', this.selectedUser);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  viewTrainerDetails(trainerId: number) {
    this.trainerService.getTrainerById(trainerId).subscribe(
      (result) => {
        this.trainer = result;
        this.viewTrainer = true;
        console.log('Trainer data loaded:', this.trainer);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  closeUserDetails() {
    this.viewUser = false;
    this.selectedUser = null;
  }

  close() {
    this.viewTrainer = false;
  }

  currentPage=0;
  pageSize=10;
  totalpages=0;
  totalElements=0;
  feedback_index=0;

  loadFeedbacksByPages()
  {
    this.feedbackService.getFeedbacksByPages(this.currentPage,this.pageSize).subscribe((data)=>
    {
      this.feedbacks=data.content;
      this.totalpages=data.totalPages;
      this.totalElements=data.totalElements;
      this.feedback_index=this.currentPage*this.pageSize+1;

    })
  }

  onPageChange(event:PageEvent)
  {
    this.currentPage=event.pageIndex;
    this.pageSize=event.pageSize;
    this.loadFeedbacksByPages();
  }

  users: User[] = [];

  getAllUsers() {
    this.authService.getAllUsers().subscribe((data: User[]) => {
      this.users = data;
    });
  }

  getUsername(userId:number):string
  {
    const user=this.users.find(u=>u.userId==userId);
    return user ? user.username : 'Unkown user'; 
  }

  trackByFeedbackId(index:number,item:Feedback):number
  {
    return item.feedbackId!;
  }

}