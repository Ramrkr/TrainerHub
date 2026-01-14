import { Component } from '@angular/core';

@Component({
  selector: 'app-managernav',
  templateUrl: './managernav.component.html',
  styleUrls: ['./managernav.component.css']
})
export class ManagernavComponent {

  showDropdown:boolean=false;

  dropChange(event:Event)
  {

  }

  toggleDropDown()
  {
    this.showDropdown=!this.showDropdown;
  }

  logOut()
  {
    console.log(' manager logged out succcessful');
  }


}
