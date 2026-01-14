
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Requirement } from 'src/app/models/requirement.model';
import { RequirementService } from 'src/app/services/requirement.service';
import { ChangeDetectorRef } from '@angular/core';
import { ConfirmDeleteDialogComponent } from 'src/app/custom-snackBar/confirm-delete-dialog/confirm-delete-dialog.component';
import { Trainer } from 'src/app/models/trainer.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmEditDialogComponent } from 'src/app/custom-snackBar/confirm-edit-dialog/confirm-edit-dialog.component';
import { CustomPaginatorService } from 'src/app/pagination/custom-paginator.service';



@Component({
  selector: 'app-manager-view-requirements',
  templateUrl: './manager-view-requirements.component.html',
  styleUrls: ['./manager-view-requirements.component.css']
})
export class ManagerViewRequirementsComponent implements OnInit {


  filterForm: FormGroup;
  resumeUrl: SafeResourceUrl | null = null;
  showResumeModal = false;
  requirements: Requirement[] = [];

  constructor(
    private fb: FormBuilder,
    private requirementService: RequirementService,
    private router: Router,
    private dialog: MatDialog,
    private sanitizer:DomSanitizer,
    private snackBar:MatSnackBar,
    private customPaginationService:CustomPaginatorService
  ) {
    this.filterForm = this.fb.group({
      searchTitle: [''],
      filterStatus: ['']
    });
  }

  ngOnInit(): void {
    this.loadRequirementsByPages();
    this.customPaginationService.setLabels('requirements');

  }

  get filteredRequirements(): Requirement[] {
    const title = this.filterForm.get('searchTitle')?.value.toLowerCase();
    const status = this.filterForm.get('filterStatus')?.value;

    return this.requirements.filter(requirement =>
      requirement.title.toLowerCase().includes(title) &&
      (status === '' || requirement.status === status)
    );
  }

  editRequirement(requirement: Requirement) {
    const dialogRef=this.dialog.open(ConfirmEditDialogComponent,{
      width:'350px',
      data:{title:requirement.title}
    })

    dialogRef.afterClosed().subscribe(result=>
    {
      if(result=='confirm' && requirement.requirementId)
      {
        this.router.navigate(['/edit-requirement',requirement.requirementId]);
      }
    }
    ) 
  }

  
deleteRequirement(requirement: Requirement) {
  const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
    width: '350px',
    data: { title: requirement.title }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result === 'confirm' && requirement.requirementId) {
      this.requirementService.deleteRequirement(requirement?.requirementId).subscribe(() => {
        this.loadRequirementsByPages();
      });
    }
  });
}

  viewTrainer(requirementId:number,trainerId:number) {
  if (trainerId && requirementId) {
  this.router.navigate([`requirement`, requirementId, `trainer-details`, trainerId]);
  } 
  else {
    this.snackBar.open('No Trainer Assigned..','Close',{duration:2000});
  
  }

}


viewResume(trainer:Trainer): void {
  if (trainer?.resume) {
    let base64String = trainer.resume;
 
    // If it's a full Data URL, extract only the Base64 part
    if (base64String.startsWith('data:')) {
      base64String = base64String.split(',')[1];
    }
 
    try {
      const byteCharacters = atob(base64String);
      const byteNumbers = new Array(byteCharacters.length).fill(0).map((_, i) => byteCharacters.charCodeAt(i));
      const byteArray = new Uint8Array(byteNumbers);
 
      // Detect MIME type based on file signature (basic check)
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
      alert('Resume file is corrupted or not properly encoded.');
    }
  } else {
    alert('No resume available to preview.');
  }
}

closeResumeModal()
{
  this.showResumeModal=false;
}


currentPage=0;
pageSize=10;
totalElements=0;
totalPages=0;

requirement_index=0;

loadRequirementsByPages()
{
  this.requirementService.getRequirementsByPages(this.currentPage,this.pageSize).subscribe((data)=>
  {
    this.requirements=data.content;
    this.totalElements=data.totalElements;
    this.totalPages=data.totalPages;
    this.requirement_index=this.currentPage*this.pageSize+1;
  })

}

onPageChange(event:PageEvent)
{
  this.currentPage=event.pageIndex;
  this.pageSize=event.pageSize;
  this.loadRequirementsByPages();

}


}