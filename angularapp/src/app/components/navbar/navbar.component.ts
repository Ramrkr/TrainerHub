import { DialogRef } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmLogOutDialogComponent } from 'src/app/custom-snackBar/confirm-log-out-dialog/confirm-log-out-dialog.component';
import { AuthService } from 'src/app/services/auth.service';
import { MatTooltipModule } from '@angular/material/tooltip';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  constructor(private authService:AuthService,private router:Router,private dialog:MatDialog)
  {

  }

  ngOnInit(): void {

    this.authService.loggedInUser$.subscribe(user=>
    {
      this.isLoggedin=!!user;
      this.role=user?.role?.replace('[ROLE_', '').replace(']', '') || null;
      this.currentUsername=user?.username;
      }
    )
    
  }

  isLoggedin:boolean=false;

  role:string|null=null;

  currentUsername:string='';

  logOut()
  {
    const dialogRef=this.dialog.open(ConfirmLogOutDialogComponent,{
      width:'350px',
    })

    dialogRef.afterClosed().subscribe(result=>{
      if(result=='confirm' && this.isLoggedin)
      {
        this.isLoggedin=false;
        this.authService.logOut();
        this.currentUsername='';
        this.router.navigate(['/']);
      } 
    })
    
    // this.isLoggedin=false;
    // this.authService.logOut();
    // this.currentUsername='';
    // this.router.navigate(['/']);

  }

}
