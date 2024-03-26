import { Component, Inject  } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confim-dialog',
  templateUrl: './confim-dialog.component.html',
  styleUrl: './confim-dialog.component.scss',
})
export class ConfimDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { message: string }) {}
}
