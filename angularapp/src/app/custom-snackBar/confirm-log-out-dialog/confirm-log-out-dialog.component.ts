import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-log-out-dialog',
  templateUrl: './confirm-log-out-dialog.component.html',
  styleUrls: ['./confirm-log-out-dialog.component.css']
})
export class ConfirmLogOutDialogComponent {

  constructor(
      public dialogRef: MatDialogRef<ConfirmLogOutDialogComponent>,
      // @Inject(MAT_DIALOG_DATA) public data: { title: string }
    ) {}
  
    onConfirm(): void {
      this.dialogRef.close('confirm');
    }
  
    onCancel(): void {
      this.dialogRef.close('cancel');
    }

}
