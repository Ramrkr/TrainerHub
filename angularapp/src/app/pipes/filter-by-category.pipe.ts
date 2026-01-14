import { Pipe, PipeTransform } from '@angular/core';
import { Feedback } from '../models/feedback.model';

@Pipe({
  name: 'filterByCategory'
})
export class FilterByCategoryPipe implements PipeTransform {
  transform(feedbacks: Feedback[], filterCategory: string): Feedback[] {
    if (!filterCategory) return feedbacks;
    return feedbacks.filter(
      feedback => feedback.category.toLowerCase() === filterCategory.toLowerCase()
    );
  }
}
