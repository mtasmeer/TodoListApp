import { Component } from '@angular/core';

import { TodoListComponent } from './components/todo-list/todo-list';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    TodoListComponent,
    RouterOutlet,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
}