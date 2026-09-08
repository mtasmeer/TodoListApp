import { Component, inject, signal, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';

import { DATA_TABLE_IMPORTS } from '../../shared/data-table-imports';
import {
  ConfirmationDialogComponent,
  ConfirmationDialogData
} from '../../shared/components/dialog/confirmation-dialog';
import { NotificationService } from '../../shared/services/notification/notification.service';
import { TodoService } from '../../shared/services/todo/todo.service';
import { Todo } from '../../shared/models/todo.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [...DATA_TABLE_IMPORTS, FormsModule, CommonModule],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.css'
})
export class TodoListComponent implements OnInit {
  // Angular services used by the component.
  private readonly todoService = inject(TodoService);
  private readonly dialog = inject(MatDialog);
  private readonly notificationService = inject(NotificationService);

  // State values for the list UI.
  readonly todos = signal<Todo[]>([]);
  readonly newTodoTitle = signal('');
  readonly isLoading = signal(true);
  readonly isAdding = signal(false);
  readonly deletingTodoId = signal<number | null>(null);
  readonly errorMessage = signal('');

  // Columns shown in the Material table.
  readonly displayedColumns = ['title', 'createdAt', 'actions'];

  // Runs as soon as the component is created.
  ngOnInit(): void {
    void this.loadTodos();
  }

  // Fetch all tasks from the API and update the list.
  async loadTodos(): Promise<void> {
    this.isLoading.set(true);
    this.errorMessage.set('');

    try {
      const items = await firstValueFrom(this.todoService.getAll());
      this.todos.set(items);
    } catch {
      this.errorMessage.set('Unable to load your TODO list. Please try again.');
    } finally {
      this.isLoading.set(false);
    }
  }

  // Create a new task from the input field.
  async addTodo(): Promise<void> {
    const title = this.newTodoTitle().trim();

    // Ignore empty submissions.
    if (!title) {
      return;
    }

    this.isAdding.set(true);
    this.errorMessage.set('');

    try {
      const created = await firstValueFrom(
        this.todoService.create({ title })
      );

      // Add the newly created task to the top of the list.
      this.todos.update((current) => [created, ...current]);
      this.newTodoTitle.set('');
      this.notificationService.success(`TODO ${created.title} added successfully.`);
    } catch {
      this.errorMessage.set('Unable to add your TODO. Please try again.');
      this.notificationService.error('Failed to add TODO. Please try again.');
    } finally {
      this.isAdding.set(false);
    }
  }

  // Ask for confirmation before deleting a task.
  async deleteTodo(todo: Todo): Promise<void> {
    const dialogData: ConfirmationDialogData = {
      title: 'Delete TODO?',
      message: `Are you sure you want to delete "${todo.title}"?`,
      warning: 'This action cannot be undone.',
      confirmLabel: 'Yes, delete',
      cancelLabel: 'No',
      icon: 'delete_outline',
      confirmColor: 'warn'
    };

    // Open the shared confirmation dialog and wait for user choice.
    const confirmed = await firstValueFrom(
      this.dialog
        .open(ConfirmationDialogComponent, {
          width: '420px',
          disableClose: true,
          data: dialogData
        })
        .afterClosed()
    );

    // If user cancels, do nothing and close the flow.
    if (!confirmed) {
      return;
    }

    this.deletingTodoId.set(todo.id);

    try {
      await firstValueFrom(this.todoService.delete(todo.id));

      // Remove the item from the UI after successful delete.
      this.todos.update((current) => current.filter((item) => item.id !== todo.id));
      this.notificationService.success(`TODO ${todo.title} deleted successfully.`);
    } catch {
      this.errorMessage.set('Unable to delete this TODO. Please try again.');
      this.notificationService.error('Failed to delete TODO. Please try again.');
    } finally {
      this.deletingTodoId.set(null);
    }
  }
}
