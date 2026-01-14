import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthguardComponent } from './components/authguard/authguard.component';
import { CoordinatorViewRequirementsComponent } from './components/coordinator-view-requirements/coordinator-view-requirements.component';
import { CoordinatorViewTrainersComponent } from './components/coordinator-view-trainers/coordinator-view-trainers.component';
import { CoordinatornavComponent } from './components/coordinatornav/coordinatornav.component';
import { CoordinatorviewfeedbackComponent } from './components/coordinatorviewfeedback/coordinatorviewfeedback.component';
import { ErrorComponent } from './components/error/error.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginComponent } from './components/login/login.component';
import { ManagerRequirementComponent } from './components/manager-requirement/manager-requirement.component';
import { ManagerViewRequirementsComponent } from './components/manager-view-requirements/manager-view-requirements.component';
import { ManagernavComponent } from './components/managernav/managernav.component';
import { ManagerpostfeedbackComponent } from './components/managerpostfeedback/managerpostfeedback.component';
import { ManagerviewfeedbackComponent } from './components/managerviewfeedback/managerviewfeedback.component';
import { SelectedTrainersComponent } from './components/selected-trainers/selected-trainers.component';
import { SignupComponent } from './components/signup/signup.component';
import { TrainerDetailsComponent } from './components/trainer-details/trainer-details.component';
import { TrainerManagementComponent } from './components/trainer-management/trainer-management.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmDeleteDialogComponent } from './custom-snackBar/confirm-delete-dialog/confirm-delete-dialog.component';

import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { SearchByNamePipe } from './pipes/search-by-name.pipe';
import { FilterByStatusPipe } from './pipes/filter-by-status.pipe';
import { FilterByCategoryPipe } from './pipes/filter-by-category.pipe';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { UnAuthorizedPageComponent } from './components/un-authorized-page/un-authorized-page.component';

import { MatPaginatorIntl, MatPaginatorModule} from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FilterByTitleOrDepartmentPipe } from './pipes/filter-by-title-or-department.pipe';
import { FilterByNameOrExpertisePipe } from './pipes/filter-by-name-or-expertise.pipe';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ConfirmLogOutDialogComponent } from './custom-snackBar/confirm-log-out-dialog/confirm-log-out-dialog.component';
import { ConfirmTrainerAssignDialogComponent } from './custom-snackBar/confirm-trainer-assign-dialog/confirm-trainer-assign-dialog.component';
import { ConfirmEditDialogComponent } from './custom-snackBar/confirm-edit-dialog/confirm-edit-dialog.component';
import { ConfirmActionDialogComponent } from './custom-snackBar/confirm-action-dialog/confirm-action-dialog.component';

import { MatTooltipModule } from '@angular/material/tooltip';


@NgModule({
  declarations: [
    AppComponent,
    AuthguardComponent,
    CoordinatorViewRequirementsComponent,
    CoordinatorViewTrainersComponent,
    CoordinatornavComponent,
    CoordinatorviewfeedbackComponent,
    ErrorComponent,
    HomePageComponent,
    LoginComponent,
    ManagerRequirementComponent,
    ManagerViewRequirementsComponent,
    ManagernavComponent,
    ManagerpostfeedbackComponent,
    ManagerviewfeedbackComponent,
    SelectedTrainersComponent,
    SignupComponent,
    TrainerDetailsComponent,
    TrainerManagementComponent,
    ContactUsComponent,
    ConfirmDeleteDialogComponent,
    SearchByNamePipe,
    FilterByStatusPipe,
    FilterByCategoryPipe,
    NavbarComponent,
    UnAuthorizedPageComponent,
    FilterByTitleOrDepartmentPipe,
    FilterByNameOrExpertisePipe,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    ConfirmLogOutDialogComponent,
    ConfirmTrainerAssignDialogComponent,
    ConfirmEditDialogComponent,
    ConfirmActionDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatButtonModule,
    CommonModule,
    MatDialogModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatTooltipModule
    
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:AuthInterceptor,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
