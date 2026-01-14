 import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Trainer } from 'src/app/models/trainer.model';
import { TrainerService } from 'src/app/services/trainer.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteDialogComponent } from 'src/app/custom-snackBar/confirm-delete-dialog/confirm-delete-dialog.component';
import { ConfirmEditDialogComponent } from 'src/app/custom-snackBar/confirm-edit-dialog/confirm-edit-dialog.component';
import { CustomPaginatorService } from 'src/app/pagination/custom-paginator.service';

@Component({
  selector: 'app-coordinator-view-trainers',
  templateUrl: './coordinator-view-trainers.component.html',
  styleUrls: ['./coordinator-view-trainers.component.css']
})
export class CoordinatorViewTrainersComponent implements OnInit {

  resumeUrl: SafeResourceUrl | null = null;
  showResumeModal = false;

  trainers: Trainer[] = [];
  statusFilter: string = "";
  trainerName: string = "";

  currentPage=0;
  pageSize=10;
  totalPages=0;
  totalElements=0;
  trainer_index=0;

  constructor(
    private trainerService: TrainerService,
    private router: Router,
    private sanitizer: DomSanitizer,
    private dialog:MatDialog,
    private customPaginationService:CustomPaginatorService
  ) {}

  ngOnInit(): void {
    this.loadTrainersByPages();
    this.customPaginationService.setLabels('trainers');
  }

  loadTrainersByPages()
  {
    this.trainerService.getTrainersByPages(this.currentPage,this.pageSize).subscribe((data)=>
    {
      this.trainers=data.content;
      this.totalPages=data.totalPages;
      this.totalElements=data.totalElements;
      this.trainer_index=this.currentPage*this.pageSize+1;
    })
  }

  onPageChange(event:PageEvent):void
  {
    this.currentPage=event.pageIndex;
    this.pageSize=event.pageSize;
    this.loadTrainersByPages();
  }


  deleteTrainer(trainer: Trainer) {

    const dialogRef=this.dialog.open(ConfirmDeleteDialogComponent,{
      width:'350px',
      data:{title:trainer.name}
    })

    dialogRef.afterClosed().subscribe(result=>{
      if(result=='confirm' && trainer)
      {
        this.trainerService.deleteTrainer(trainer.trainerId!).subscribe(
      () => {
        this.loadTrainersByPages();
      },
      (error) => {
        console.log(error);
      });
      }
    })
  }

  editTrainer(trainer: Trainer) {

    const dialog=this.dialog.open(ConfirmEditDialogComponent,{
      width:'350px',
      data:{title:trainer.name}
    })

    dialog.afterClosed().subscribe(result=>
    {
      if(result=='confirm' && trainer)
      {
        this.router.navigate(['/edit-trainer', trainer.trainerId]);
      }
    }
    )
  }

  viewResume(trainer: Trainer) {
    if (trainer?.resume) {
      let base64String = trainer.resume;

      if (base64String.startsWith('data:')) {
        base64String = base64String.split(',')[1];
      }

      try {
        const byteCharacters = atob(base64String);
        const byteNumbers = new Array(byteCharacters.length).fill(0).map((_, i) => byteCharacters.charCodeAt(i));
        const byteArray = new Uint8Array(byteNumbers);

        const firstByte = byteArray[0];
        let mimeType = 'application/pdf';

        if (firstByte === 0xFF) {
          mimeType = 'image/jpeg';
        } else if (firstByte === 0x89) {
          mimeType = 'image/png';
        }

        const blob = new Blob([byteArray], { type: mimeType });
        const url = URL.createObjectURL(blob);
        this.resumeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
        this.showResumeModal = true;
      } catch (error) {
        console.error('Invalid Base64 string:', error);
        alert('Resume file is corrupted or not properly encoded.');
      }
    } else {
      alert('No resume available to preview.');
    }
  }

  closeResumeModal() {
    this.showResumeModal = false;
  }

  //Toggle Active Inactive Status

  // toggleStatus(trainer: Trainer) {
  //   trainer.status = trainer.status === 'Active' ? 'Inactive' : 'Active';

  //   this.trainerService.updateTrainer(trainer.trainerId!, trainer).subscribe(
  //     () => {
  //       console.log('status updated successfully');
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   );
  // }


  
}
