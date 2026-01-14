import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';


@Injectable({
  providedIn: 'root'
})
export class CustomPaginatorService {

  constructor(private paginatorIntl: MatPaginatorIntl) {}

  setLabels(context: string): void {
    switch (context) {
      case 'requirements':
        this.paginatorIntl.itemsPerPageLabel = 'Requirements per page';
        break;
      case 'trainers':
        this.paginatorIntl.itemsPerPageLabel = 'Trainers per page';
        break;
      case 'feedback':
        this.paginatorIntl.itemsPerPageLabel = 'Feedbacks per page';
        break;
      default:
        this.paginatorIntl.itemsPerPageLabel = 'Items per page';
    }

    this.paginatorIntl.nextPageLabel = 'Next';
    this.paginatorIntl.previousPageLabel = 'Previous';
    this.paginatorIntl.firstPageLabel = 'First';
    this.paginatorIntl.lastPageLabel = 'Last';

    this.paginatorIntl.getRangeLabel = (page: number, pageSize: number, length: number) => {
      if (length === 0 || pageSize === 0) {
        return `0 of ${length}`;
      }
      const startIndex = page * pageSize;
      const endIndex = Math.min(startIndex + pageSize, length);
      return `${startIndex + 1} - ${endIndex} of ${length}`;
    };

    this.paginatorIntl.changes.next(); // Notify Angular to update the labels
  }
}
