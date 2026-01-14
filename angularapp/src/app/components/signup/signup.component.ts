import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { slideInOutAnimation } from 'src/app/animations';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  animations: [slideInOutAnimation],
    host: { '[@slideInOut]': '' }
})
export class SignupComponent implements OnInit{

  signupForm!:FormGroup;

  constructor(private fb:FormBuilder,private authService:AuthService,private router:Router,private snackBar:MatSnackBar)
  {

  }


  passwordMismatch(group:AbstractControl):ValidationErrors | null
  {
    const password=group.get('password')?.value;
    const confirmPassword=group.get('confirmPassword')?.value;
    return password == confirmPassword ? null : {passwordMismatch:true};
  }

  ngOnInit(): void {

    this.signupForm=this.fb.group({
      username:['',[Validators.required]],
      email:['',[Validators.required,Validators.email]],
      mobileNumber:['',[Validators.required]],
      password:['',[Validators.required]],
      confirmPassword:['',[Validators.required]],
      userRole:['',[Validators.required]]
    },{validators:this.passwordMismatch})
    
  }

  onSubmit()
  {
    if(this.signupForm.valid)
    {
      this.authService.register(this.signupForm.value).subscribe({
        next:(response)=>{
          if(response.success)
          {
            console.log(response.data);
            this.snackBar.open(response.message,'Close',{duration:3000});
            this.resetForm();
            this.router.navigate(['/login']);

          }
          else
          {
            this.snackBar.open(response.message,'Close',{duration:3000});
          }
        },
        error:(error:HttpErrorResponse)=>
        {
          this.snackBar.open(error.message,'Close',{duration:3000});
        }
      })

    }
  }

  resetForm()
  {
    this.signupForm.reset();
  }

}
