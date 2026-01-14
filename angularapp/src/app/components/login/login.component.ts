import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { slideInOutAnimation } from 'src/app/animations';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  
  animations: [slideInOutAnimation],
  host: { '[@slideInOut]': '' }

})
export class LoginComponent implements OnInit{

  loginForm!: FormGroup;

  constructor(private fb:FormBuilder,private authService:AuthService,private router:Router,private snackBar:MatSnackBar) {

  }

  ngOnInit(): void {
    this.loginForm=this.fb.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required]]
    })
    
  }

  onSubmit()
  {

    console.log('form submitted');
    if(this.loginForm.valid)
    {
      console.log(this.loginForm.value);
      this.authService.login(this.loginForm.value).subscribe({
        next:(response)=>{
          console.log(response);
          const jsonData=JSON.stringify(response);
          this.authService.logInSaveSession(jsonData);
          this.resetForm();
          this.snackBar.open('Login Successful!!!','Close',{duration:3000});
          this.router.navigate(['/']);
        },
        error:(error:HttpErrorResponse)=>
        {
          if(error.status==401)
          {
            this.snackBar.open('Invalid Credentials..Try again!!!','Close',{duration:3000});
          }
          
        }
      });

    }

  }

  resetForm()
  {
    this.loginForm.reset();
  }

  

}
