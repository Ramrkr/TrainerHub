import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Trainer } from 'src/app/models/trainer.model';
import { TrainerService } from 'src/app/services/trainer.service';

@Component({
  selector: 'app-trainer-management',
  templateUrl: './trainer-management.component.html',
  styleUrls: ['./trainer-management.component.css']
})
export class TrainerManagementComponent implements OnInit {

  trainerForm!: FormGroup;
  imagePreview: string | ArrayBuffer | null = null;
  isEditMode = false;
  trainerId: number | null = null;

  selectedTrainer:Trainer|null=null;

  constructor(
    private fb: FormBuilder,
    private trainerService: TrainerService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar:MatSnackBar
  ) {}

  ngOnInit(): void {
    this.trainerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      expertise: ['', Validators.required],
      experience: ['', Validators.required],
      certification: ['', Validators.required],
      joiningDate: ['', Validators.required],
      resume: ['']
    });

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.trainerId = +id;
        this.loadTrainer(this.trainerId);
      }
    });
  }

  loadTrainer(id: number): void {
    this.trainerService.getTrainerById(id).subscribe(trainer => {

    this.selectedTrainer=trainer;
    console.log(this.selectedTrainer);
      
    this.trainerForm.patchValue(trainer);
      
    const formattedDate = new Date(trainer.joiningDate[0], trainer.joiningDate[1] - 1, trainer.joiningDate[2])
    .toISOString()
    .split('T')[0]; 

      this.trainerForm.patchValue({joiningDate: formattedDate});
      console.log(trainer.joiningDate);
      console.log(formattedDate);

      this.selectedTrainer=trainer;
      console.log(this.selectedTrainer);
      if (trainer.resume) {
        this.imagePreview = 'data:application/pdf;base64,' + this.selectedTrainer?.resume;
      }
    });
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
        const base64 = (reader.result as string).split(',')[1];
        this.trainerForm.patchValue({ resume: base64 });
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.trainerForm.invalid) return;

    const trainerData: Trainer = {...this.trainerForm.value,status:this.selectedTrainer?.status};

    console.log('trainer data for update')
    console.log(trainerData);


    if (this.isEditMode && this.trainerId !== null) {
      this.trainerService.updateTrainer(this.trainerId, trainerData).subscribe(() => {
        this.snackBar.open('Trainer Details Updated !!!','Close',{duration:2000});
        this.router.navigate(['/view-trainer']);

      });
    } else {
      const trainerData: Trainer = {...this.trainerForm.value,status:'Active'};

      console.log(this.trainerForm.value);
      console.log(trainerData);
      this.trainerService.addTrainer(trainerData).subscribe(() => {
        this.snackBar.open('Trainer Added successfully!!!','Close',{duration:2000});
        this.router.navigate(['/view-trainer']);
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/view-trainer'])

  }
}




