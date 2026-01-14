import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  resetPasswordForm!:FormGroup;

  email: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private fb:FormBuilder,
    private authService:AuthService,
    private router:Router,
    private snackBar:MatSnackBar){}

  ngOnInit(): void {
    // Retrieve email from navigation state
    const navigation = history.state;
    if (navigation && navigation.email) {
      this.email = navigation.email;
      console.log('Email from navigation state:', this.email);
    } else {
      console.error('No email found in navigation state');
    }

    this.resetPasswordForm=this.fb.group({
      newPassword:['',[Validators.required]],
      confirmNewPassword:['',[Validators.required]]
    })
    
  }

  resetPassword()
  {
    if(this.resetPasswordForm.invalid) {
      console.error('Form is invalid');
      return;
    }
    else
    {

      this.authService.resetPassword({
        email:this.email,
        newPassword: this.resetPasswordForm.value.newPassword,
        confirmPassword: this.resetPasswordForm.value.confirmNewPassword
      }).subscribe({
        next:(response)=>
        {
          if(response.success)
          {
            this.successMessage=response.message;
            this.snackBar.open(response.message,'Close',{duration:3000});
          }
          else
          {
            this.errorMessage=response.message;
            this.snackBar.open(response.message,'Close',{duration:3000});
          }

        },
        error:(error:HttpErrorResponse)=>
        {
          //console.log(error.status+error.statusText);
          
          this.snackBar.open('Failed to reset password. Please try again.','Close',{duration:3000});
        }
      })

      this.resetFields();
      this.router.navigate(['/login']); // Uncomment if you want to redirect after reset
    }

  }

  resetFields()
  {
    this.email='';
    this.resetPasswordForm.reset();
    // this.errorMessage='';
    // this.successMessage=''
  }

 


}
