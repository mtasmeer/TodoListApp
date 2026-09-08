import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ToastComponent, ToastData } from '../../../shared/components/toast/toast';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private readonly snackBar = inject(MatSnackBar);

  success(message: string): void {
    this.open({ message, icon: 'check_circle' }, 'toast-success');
  }

  error(message: string): void {
    this.open({ message, icon: 'error_outline' }, 'toast-error');
  }

  private open(data: ToastData, panelClass: string): void {
    this.snackBar.openFromComponent(ToastComponent, {
      data,
      duration: 3500,
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
      panelClass: [panelClass]
    });
  }
}
