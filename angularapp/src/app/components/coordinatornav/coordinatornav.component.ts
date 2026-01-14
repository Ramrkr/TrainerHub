import { Component } from '@angular/core';

@Component({
  selector: 'app-coordinatornav',
  templateUrl: './coordinatornav.component.html',
  styleUrls: ['./coordinatornav.component.css']
})
export class CoordinatornavComponent {


  logOut()
  {
    console.log('coordinator logged out ');
  }

}
