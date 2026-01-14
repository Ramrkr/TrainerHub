import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Requirement } from 'src/app/models/requirement.model';
import { Trainer } from 'src/app/models/trainer.model';
import { RequirementService } from 'src/app/services/requirement.service';
import { TrainerService } from 'src/app/services/trainer.service';

@Component({
  selector: 'app-selected-trainers',
  templateUrl: './selected-trainers.component.html',
  styleUrls: ['./selected-trainers.component.css']
})
export class SelectedTrainersComponent implements OnInit {

  trainersWithClosedRequirements: any[] = [];

  constructor(
    private trainerService: TrainerService,
    private requirementService: RequirementService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  
navigateToFeedback(trainerId: number): void {
  this.router.navigate(['add-feedback', trainerId]);
}

loadData(): void {
  this.trainerService.getAllTrainers().subscribe((trainers: Trainer[]) => {
    this.requirementService.getAllRequirements().subscribe((requirements: Requirement[]) => {
      const closedRequirements = requirements.filter(requirement => requirement.status === 'Closed' && requirement.trainerId);

      closedRequirements.forEach(requirement => {
        const trainer = trainers.find(t => t.trainerId === requirement.trainerId);
        if (trainer) {
          this.trainersWithClosedRequirements.push({
            id:trainer.trainerId,
            name: trainer.name,
            email: trainer.email,
            phone: trainer.phone,
            expertise: trainer.expertise,
            experience: trainer.experience,
            certification: trainer.certification,
            requirementTitle: requirement.title,
            requirementStatus: requirement.status
          });
        }
      });
    });
  });
}

}