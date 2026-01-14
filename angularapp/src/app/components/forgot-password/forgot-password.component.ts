import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  
    constructor(private fb:FormBuilder,
      private authService:AuthService,
      private router:Router,
      private snackBar:MatSnackBar) {
  
    }

    email:string='';

    otp:string='';

    isOtp:boolean=false;
  
    ngOnInit(): void {
      
    }

    generateOtp()
    {
      this.authService.sendOtp(this.email).subscribe((data)=>
      {
        this.snackBar.open('OTP successfully sent to ' + this.email, 'Close', { duration: 3000 });
        //this.snackBar.open('We’ve sent an OTP to ' +this.email,'Close',{duration:3000});
        this.isOtp=true;
        this.timeLeft=this.totalTime;
        clearInterval(this.interval); // Clear any existing interval
        this.startTimer();
      })

    }

    verifyOtp()
    {
      this.authService.verifyOtp({email:this.email,otpInput:this.otp}).subscribe((data)=>
      {
        console.log(data);
        this.snackBar.open('OTP Verified Successfully!!!','Close',{duration:3000});
        this.router.navigate(['/reset-password'], { state: { email: this.email } });
      } 
      );
    }

  totalTime = 120; // 2 minutes in seconds
  timeLeft = this.totalTime;
  interval: any;

  get minutes(): number {
    return Math.floor(this.timeLeft / 60);
  }

  get seconds(): number {
    return this.timeLeft % 60;
  }

  startTimer(): void {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.isOtp=false;
        clearInterval(this.interval);
        this.otp='';
      }
    }, 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }
}

