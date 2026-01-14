import { Component } from '@angular/core';
import { slideInOutAnimation } from 'src/app/animations';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css'],
  animations: [slideInOutAnimation],
    host: { '[@slideInOut]': '' }
})
export class ContactUsComponent {

}
