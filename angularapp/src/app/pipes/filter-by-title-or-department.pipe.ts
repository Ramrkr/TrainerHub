import { Pipe, PipeTransform } from '@angular/core';
import { Requirement } from '../models/requirement.model';

@Pipe({
  name: 'filterByTitleOrDepartment'
})
export class FilterByTitleOrDepartmentPipe implements PipeTransform {

  transform(requirements: Requirement[], searchText: string): Requirement[] {
    if (!searchText) return requirements;

    const query = searchText.trim().toLowerCase();
    return requirements.filter(requirement =>
      requirement.title.toLowerCase().includes(query) ||
      requirement.department.toLowerCase().includes(query)
    );
  }

}
