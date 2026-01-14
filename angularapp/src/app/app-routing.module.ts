import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ErrorComponent } from './components/error/error.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { ManagerRequirementComponent } from './components/manager-requirement/manager-requirement.component';
import { ManagerViewRequirementsComponent } from './components/manager-view-requirements/manager-view-requirements.component';
import { SelectedTrainersComponent } from './components/selected-trainers/selected-trainers.component';
import { ManagerviewfeedbackComponent } from './components/managerviewfeedback/managerviewfeedback.component';
import { ManagerpostfeedbackComponent } from './components/managerpostfeedback/managerpostfeedback.component';
import { TrainerManagementComponent } from './components/trainer-management/trainer-management.component';
import { TrainerDetailsComponent } from './components/trainer-details/trainer-details.component';
import { CoordinatorViewRequirementsComponent } from './components/coordinator-view-requirements/coordinator-view-requirements.component';
import { CoordinatorviewfeedbackComponent } from './components/coordinatorviewfeedback/coordinatorviewfeedback.component';
import { CoordinatorViewTrainersComponent } from './components/coordinator-view-trainers/coordinator-view-trainers.component';
import { AuthGuard } from './guards/auth.guard';
import { UnAuthorizedPageComponent } from './components/un-authorized-page/un-authorized-page.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { animation } from '@angular/animations';

const routes: Routes = [
  {path:'',
    component:HomePageComponent
    ,canActivate:[AuthGuard],
    data: {roles:['Permit All']} // data:{roles:'manager'}
  },

  {path:'login',component:LoginComponent
    ,canActivate:[AuthGuard],
    data: {
      roles:['Permit All'],
      animation:'LoginPage'
    }
  },

  {path:'signup',component:SignupComponent
    ,canActivate:[AuthGuard],
    data: {
      roles:['Permit All'],
      animation:'SignUpPage'

    }
  },
  {path:'contactus',component:ContactUsComponent
    ,canActivate:[AuthGuard],
    data: {roles:['Permit All'],
      animation:'ContactPage'

    }
  },
  {path:'add-requirement',component:ManagerRequirementComponent
    ,canActivate:[AuthGuard],
    data: {roles:['Manager']}
  },
  {path:'edit-requirement/:requirementId',component:ManagerRequirementComponent
    ,canActivate:[AuthGuard],
    data: {roles:['Manager']}
  },
  {path:'manager/view-requirements',component:ManagerViewRequirementsComponent
    ,canActivate:[AuthGuard],
    data: {roles:['Manager']}
  },
  {path:'selected-trainers',component:SelectedTrainersComponent
    ,canActivate:[AuthGuard],
    data: {roles:['Manager']}
  },
  {path:'my-feedbacks',component:ManagerviewfeedbackComponent
    ,canActivate:[AuthGuard],
    data: {roles:['Manager']}
  },
  {path:'add-feedback/:trainerId',component:ManagerpostfeedbackComponent
    ,canActivate:[AuthGuard],
    data: {roles:['Manager']}
  },
  {path:'add-trainer',component:TrainerManagementComponent
    ,canActivate:[AuthGuard],
    data: {roles:['Coordinator']}
  },
  {path:'edit-trainer/:id',component:TrainerManagementComponent
    ,canActivate:[AuthGuard],
    data: {roles:['Coordinator']}
  },
  {path:'view-trainer',component:CoordinatorViewTrainersComponent
    ,canActivate:[AuthGuard],
    data: {roles:['Coordinator']}
  },
  {path:'coordinator/view-requirements',component:CoordinatorViewRequirementsComponent
    ,canActivate:[AuthGuard],
    data: {roles:['Coordinator']}
  },
  {path:'view-feedback',component:CoordinatorviewfeedbackComponent
    ,canActivate:[AuthGuard],
    data: {roles:['Coordinator']}
  },
  {path:'requirement/:requirementId/trainer-details/:trainerId',component:TrainerDetailsComponent
    ,canActivate:[AuthGuard],
    data: {roles:['Manager']}
  },
  {
    path:'forgot-password',component:ForgotPasswordComponent,
    canActivate:[AuthGuard],
    data:{roles:['Permit All']}
  },
  {
    path:'reset-password',component:ResetPasswordComponent,
    canActivate:[AuthGuard],
    data:{roles:['Permit All']}
  },
  {path:'unauthorized',component:UnAuthorizedPageComponent,
    canActivate:[AuthGuard],
    data:{roles:['Permit All']}
  },


  {path:'**',component:ErrorComponent
    ,canActivate:[AuthGuard],
    data: {roles:['Permit All']}
  }

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
