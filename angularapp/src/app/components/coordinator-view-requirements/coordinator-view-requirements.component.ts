import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmTrainerAssignDialogComponent } from 'src/app/custom-snackBar/confirm-trainer-assign-dialog/confirm-trainer-assign-dialog.component';
import { Requirement } from 'src/app/models/requirement.model';
import { Trainer } from 'src/app/models/trainer.model';
import { CustomPaginatorService } from 'src/app/pagination/custom-paginator.service';
import { RequirementService } from 'src/app/services/requirement.service';
import { TrainerService } from 'src/app/services/trainer.service';

@Component({
  selector: 'app-coordinator-view-requirements',
  templateUrl: './coordinator-view-requirements.component.html',
  styleUrls: ['./coordinator-view-requirements.component.css']
})
export class CoordinatorViewRequirementsComponent implements OnInit {
  
  showAssignTrainerPopup = false;
  trainerSearch = '';
  searchTitle = '';
  requirements: Requirement[] = [];
  trainers: Trainer[] = [];
  selectedRequirement: Requirement | null = null;
  activeTrainers: Trainer[] = [];
  InactiveTrainers: Trainer[] = [];

  currentPage=0;
  pageSize=10;
  totalPages=0;
  totalElements=0;
  req_index=0;

  constructor(
    private requirementService: RequirementService,
    private trainerService: TrainerService,
    private snackBar:MatSnackBar,
    private dialog:MatDialog,
    private customPaginationService:CustomPaginatorService
  ) {}

  ngOnInit(): void {
 
    this.loadTrainers();
    this.loadRequirementsByPages();
    this.customPaginationService.setLabels('requirements');
    
  }
  loadTrainers(): void {
    this.trainerService.getAllTrainers().subscribe(data => {
      this.trainers = data;
      this.activeTrainers = data.filter((trainer:Trainer) => trainer.status === 'Active');
      console.log(this.activeTrainers);
      
      this.InactiveTrainers = data.filter((trainer:Trainer) => trainer.status === 'Inactive');
    });
  }

  openAssignTrainerPopup(requirement: Requirement): void {
    this.selectedRequirement = requirement;
    this.showAssignTrainerPopup = true;
    this.trainerSearch = '';
  }

  closeAssignTrainerPopup(): void {
    this.showAssignTrainerPopup = false;
    //this.selectedRequirement = null;
  }

  selectTrainer(trainer: Trainer): void {
    this.closeAssignTrainerPopup();
    const dialogRef=this.dialog.open(ConfirmTrainerAssignDialogComponent,{
      width:'350px',
      data:{title:this.selectedRequirement?.title,trainer:trainer.name}
    });
    dialogRef.afterClosed().subscribe((result=>
    {
      if(result=='confirm')
      {
         if (this.selectedRequirement && !this.selectedRequirement.trainerId) {
      this.selectedRequirement.trainerId = trainer.trainerId;
      trainer.status = 'Inactive';

      this.requirementService.updateRequirement(
        this.selectedRequirement.requirementId!,
        this.selectedRequirement
      ).subscribe(() => {
        this.trainerService.updateTrainer(trainer.trainerId!, trainer).subscribe(() => {
          this.snackBar.open('Trainer Assigned successfully ','Close',{duration:2000});
          this.loadRequirementsByPages();
          this.loadTrainers();
          this.closeAssignTrainerPopup();
        });
      });
    }
    }
    }
    ))
   
  }

  loadRequirementsByPages()
  {
    this.requirementService.getRequirementsByPages(this.currentPage,this.pageSize).subscribe((data)=>
    {
      this.requirements=data.content;
      this.totalPages=data.totalPages;
      this.totalElements=data.totalElements;
      this.req_index=(this.currentPage)*this.pageSize+1;
      console.log("data loaded as pages");
      
    })
  }

  onPageChange(event:PageEvent)
  {
    this.pageSize=event.pageSize;
    this.currentPage=event.pageIndex;
    this.loadRequirementsByPages();
  }

  
  

  

}

