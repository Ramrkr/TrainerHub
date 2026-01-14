import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-trainer-assign-dialog',
  templateUrl: './confirm-trainer-assign-dialog.component.html',
  styleUrls: ['./confirm-trainer-assign-dialog.component.css']
})
export class ConfirmTrainerAssignDialogComponent {

  constructor(
      public dialogRef: MatDialogRef<ConfirmTrainerAssignDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: { title: string ,trainer:string}
    ) {}
  
    onConfirm(): void {
      this.dialogRef.close('confirm');
    }
  
    onCancel(): void {
      this.dialogRef.close('cancel');
    }

}
