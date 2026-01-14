import { Pipe, PipeTransform } from '@angular/core';
import { Trainer } from '../models/trainer.model';

@Pipe({
  name: 'filterByStatus'
})
export class FilterByStatusPipe implements PipeTransform {

   transform(trainers:Trainer[],selectedStatus:string): Trainer[] {
    if(!selectedStatus){
      return trainers;
    }
    else{
      return trainers.filter((trainer)=>trainer.status===selectedStatus);
    }
  }


}
