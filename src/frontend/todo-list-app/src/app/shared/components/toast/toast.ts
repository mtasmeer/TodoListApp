import { Component, inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { DATA_TABLE_IMPORTS } from '../../data-table-imports';

export interface ToastData {
  message: string;
  icon: string;
}

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [...DATA_TABLE_IMPORTS],
  templateUrl: './toast.html',
  styleUrl: './toast.css'
})
export class ToastComponent {
  readonly data = inject<ToastData>(MAT_SNACK_BAR_DATA);
}
