import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NotificationService } from './services/notification.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'app';

  constructor(
    private notificationService: NotificationService,
    private snackBar: MatSnackBar
  ) {
    this.notificationService.notification$.subscribe((message) => {
      this.snackBar.open(message, 'Close', {
        duration: 5000,
        verticalPosition: 'top',
      });
    });
  }
}
