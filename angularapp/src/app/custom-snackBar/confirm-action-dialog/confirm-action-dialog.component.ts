import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-action-dialog',
  templateUrl: './confirm-action-dialog.component.html',
  styleUrls: ['./confirm-action-dialog.component.css']
})
export class ConfirmActionDialogComponent {

  constructor(
      public dialogRef: MatDialogRef<ConfirmActionDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: { title: string,type:string }
    ) {}
  
    onConfirm(): void {
      this.dialogRef.close('confirm');
    }
  
    onCancel(): void {
      this.dialogRef.close('cancel');
    }

}
