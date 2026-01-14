import { Pipe, PipeTransform } from '@angular/core';
import { Trainer } from '../models/trainer.model';

@Pipe({
  name: 'searchByName'
})
export class SearchByNamePipe implements PipeTransform {

   transform(trainers:Trainer[] ,searchText:string):Trainer[] {
    if(!searchText){
      return trainers;
    }
    else{
      searchText=searchText.toLowerCase();
      return trainers.filter((trainer)=>trainer.name.toLowerCase().includes(searchText));
    }
  }

}
