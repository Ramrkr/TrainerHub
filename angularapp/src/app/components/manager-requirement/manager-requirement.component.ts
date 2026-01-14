import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RequirementService } from 'src/app/services/requirement.service';
import { Requirement } from 'src/app/models/requirement.model';
import { slideInOutAnimation } from 'src/app/animations';
// import { SuccessSnackbarComponent } from 'src/app/success-snackbar/success-snackbar.component';
// import { UpdateSuccessDialogComponent } from 'src/app/update-success-dialog/update-success-dialog.component';

@Component({
  selector: 'app-manager-requirement',
  templateUrl: './manager-requirement.component.html',
  styleUrls: ['./manager-requirement.component.css'],
  animations: [slideInOutAnimation],
    host: { '[@slideInOut]': '' }
})
export class ManagerRequirementComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
  isEditMode = false;
  selectedRequirement: Requirement | null = null;
  modes:string[]=['Online','Offline'];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private requirementService: RequirementService,
    private dialog: MatDialog
  ) {this.initializeForm();}

  ngOnInit(): void {
    this.route.paramMap.subscribe(param => {
      const id = +param.get('requirementId')!;
      if (id) {
        this.isEditMode = true;
        this.requirementService.getRequirementById(id).subscribe(data => {
          this.selectedRequirement = data;
          this.initializeForm();
        });
      } else {
        this.initializeForm();
      }
    });
  }

  initializeForm(): void {
    this.form = this.fb.group({
      title: [this.selectedRequirement?.title || '', Validators.required],
      description: [this.selectedRequirement?.description || '', Validators.required],
      department: [this.selectedRequirement?.department || '', Validators.required],
      duration: [this.selectedRequirement?.duration || '', Validators.required],
      mode: [this.selectedRequirement?.mode || '', Validators.required],
      location: [this.selectedRequirement?.location || ''],
      skillLevel: [this.selectedRequirement?.skillLevel || '', Validators.required],
      budget: [this.selectedRequirement?.budget || ''],
      priority: [this.selectedRequirement?.priority || ''],
      status: [this.selectedRequirement?.status || 'Open'],
      trainerId: [this.selectedRequirement?.trainerId ?? null],
      postedDate: [this.selectedRequirement?.postedDate || new Date()]
    });
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) return;

    const requirement: Requirement = this.form.value;

    if (this.isEditMode && this.selectedRequirement?.requirementId) {
      this.requirementService.updateRequirement(this.selectedRequirement.requirementId, requirement).subscribe(() => {
        this.snackBar.open('Requirement Updated successfully!!!','Close',{duration:3000});
        this.router.navigate(['/manager/view-requirements']);
      });
    } else {
      this.requirementService.addRequirement(requirement).subscribe(() => {

        this.snackBar.open('Requirement added successfully!!!','Close',{duration:3000});
        this.router.navigate(['/manager/view-requirements']);

        this.form.reset();
        this.submitted = false;
      });
    }
  }

  goBack(): void {
    this.snackBar.open('Loading...','',{duration:1000});
    this.router.navigate(['/manager/view-requirements']);
  }
  
}

