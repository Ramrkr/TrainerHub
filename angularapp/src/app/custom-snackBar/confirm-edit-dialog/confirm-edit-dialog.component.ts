import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-edit-dialog',
  templateUrl: './confirm-edit-dialog.component.html',
  styleUrls: ['./confirm-edit-dialog.component.css']
})
export class ConfirmEditDialogComponent {

  constructor(
      public dialogRef: MatDialogRef<ConfirmEditDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: { title: string }
    ) {}
  
    onConfirm(): void {
      this.dialogRef.close('confirm');
    }
  
    onCancel(): void {
      this.dialogRef.close('cancel');
    }

}
