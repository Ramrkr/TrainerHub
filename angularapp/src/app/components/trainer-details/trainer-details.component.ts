
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmActionDialogComponent } from 'src/app/custom-snackBar/confirm-action-dialog/confirm-action-dialog.component';
import { Requirement } from 'src/app/models/requirement.model';
import { Trainer } from 'src/app/models/trainer.model';
import { RequirementService } from 'src/app/services/requirement.service';
import { TrainerService } from 'src/app/services/trainer.service';


@Component({
  selector: 'app-trainer-details',
  templateUrl: './trainer-details.component.html',
  styleUrls: ['./trainer-details.component.css']
})
export class TrainerDetailsComponent implements OnInit {

  trainer: Trainer | null = null;

  selectedRequirementId:number | undefined;

  selectedRequirement : Requirement | null=null;


  resumeUrl: SafeResourceUrl | null = null;
  showResumeModal = false;
  showConfirmModal = false;
  showButton= true;

  actionType: 'accept' | 'reject' | null = null;

  constructor(
    private route:ActivatedRoute,private router:Router,private trainerService:TrainerService, private sanitizer:DomSanitizer,
    private requirementService:RequirementService,
    private snackBar:MatSnackBar,
    private dialog:MatDialog
  ) {

  }

  ngOnInit(): void {
  this.route.paramMap.subscribe(params => {
    const requirementId = +params.get('requirementId')!;
    const trainerId = +params.get('trainerId')!;

    this.selectedRequirementId = requirementId;

    this.trainerService.getTrainerById(trainerId).subscribe(trainer => {
      this.trainer = trainer;
    });

    this.requirementService.getRequirementById(requirementId).subscribe(requirement => {
      this.selectedRequirement = requirement;
      console.log(this.selectedRequirement);
      this.selectedRequirement?.status==='Closed' ? this.showButton=false : this.showButton=true;
    });
  });
  
  
}
  confirmAction(type: 'accept' | 'reject'): void {

    
    const dialogRef=this.dialog.open(ConfirmActionDialogComponent,{
      width:'350px',
      data:{title:this.trainer?.name,type:type}
    });
    
    //this.showConfirmModal = true;

    dialogRef.afterClosed().subscribe(result=>
    {
      if(result=='confirm')
      {
        this.actionType = type;
        this.proceedAction();
      }
    }
    )
  }

  proceedAction(): void {
    if (this.trainer) {
      if (this.actionType === 'accept') {
        if (this.selectedRequirement) {
          this.selectedRequirement.status = 'Closed';
          this.trainer.status = 'Inactive';
          this.requirementService.updateRequirement(this.selectedRequirement?.requirementId,this.selectedRequirement).subscribe((data)=>
          {
            this.trainerService.updateTrainer(this.trainer?.trainerId!,this.trainer!).subscribe((data)=>
            {
              this.snackBar.open('Trainer accepted...','Close',{duration:3000});
              this.router.navigate(['/manager/view-requirements']);

            })
            
          })
        }
      } else if (this.actionType === 'reject') {
        // this.trainer = null;
        if (this.selectedRequirement) {
          this.selectedRequirement.status = 'Open';
          this.trainer.status = 'Active';
          this.selectedRequirement.trainerId=null;
          this.requirementService.updateRequirement(this.selectedRequirement?.requirementId,this.selectedRequirement).subscribe((data)=>
          {

            this.trainerService.updateTrainer(this.trainer?.trainerId!,this.trainer!).subscribe((data)=>
            {
              this.snackBar.open('Trainer rejected...','Close',{duration:3000});
              this.router.navigate(['/manager/view-requirements']);
              this.trainer = null;
            })
            
          })
        }
      }
    }
  }
  viewResume(trainer:Trainer): void {
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
      let mimeType = 'application/pdf'; // default
 
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
      this.snackBar.open('Resume file is corrupted or not properly encoded.Try again later..','Close',{duration:2000});
    }
  } else {
    this.snackBar.open('No resume available to preview.','Close',{duration:2000});
  }
}

closeResumeModal()
{
  this.showResumeModal=false;
}
}
