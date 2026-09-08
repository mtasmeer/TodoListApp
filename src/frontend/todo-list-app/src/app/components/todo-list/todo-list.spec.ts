import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of, throwError } from 'rxjs';

import { TodoListComponent } from './todo-list';
import { TodoService } from '../../shared/services/todo/todo.service';
import { Todo } from '../../shared/models/todo.model';
import { NotificationService } from '../../shared/services/notification/notification.service';

describe('TodoListComponent', () => {
	let component: TodoListComponent;
	let fixture: ComponentFixture<TodoListComponent>;
	let serviceDouble: {
		getAll: () => Observable<Todo[]>;
		create: (request: { title: string }) => Observable<Todo>;
		delete: (id: number) => Observable<void>;
	};
	let dialogDouble: {
		open: () => { afterClosed: () => Observable<boolean> };
	};
	let notificationDouble: {
		success: (message: string) => void;
		error: (message: string) => void;
	};

	const todos: Todo[] = [
		{
			id: 1,
			title: 'First task',
			createdAtUtc: '2026-09-06T10:00:00Z'
		},
		{
			id: 2,
			title: 'Second task',
			createdAtUtc: '2026-09-06T11:00:00Z'
		}
	];

	beforeEach(async () => {
		serviceDouble = {
			getAll: () => of([]),
			create: () => of(todos[0]),
			delete: () => of(void 0)
		};
		dialogDouble = {
			open: () => ({ afterClosed: () => of(false) })
		};
		notificationDouble = {
			success: () => undefined,
			error: () => undefined
		};

		await TestBed.configureTestingModule({
			imports: [TodoListComponent],
			providers: [
				{ provide: TodoService, useValue: serviceDouble },
				{ provide: NotificationService, useValue: notificationDouble }
			]
		});
		TestBed.overrideProvider(MatDialog, { useValue: dialogDouble });
		await TestBed.compileComponents();

		fixture = TestBed.createComponent(TodoListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
		await fixture.whenStable();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should load TODOs during initialization', async () => {
		serviceDouble.getAll = () => of(todos);

		await component.loadTodos();

		expect(component.todos()).toEqual(todos);
		expect(component.isLoading()).toBeFalsy();
	});

	it('should add a trimmed TODO and clear the input', async () => {
		const createdTodo: Todo = {
			id: 3,
			title: 'New task',
			createdAtUtc: '2026-09-06T12:00:00Z'
		};
		let requestTitle = '';
		serviceDouble.create = request => {
			requestTitle = request.title;
			return of(createdTodo);
		};
		let successMessage = '';
		notificationDouble.success = message => {
			successMessage = message;
		};
		component.newTodoTitle.set('  New task  ');

		await component.addTodo();

		expect(requestTitle).toBe('New task');
		expect(component.todos()).toContain(createdTodo);
		expect(component.newTodoTitle()).toBe('');
		expect(component.isAdding()).toBeFalsy();
		expect(successMessage).toBe(`TODO ${createdTodo.title} added successfully.`);
	});

	it('should ignore an empty TODO title', async () => {
		let createCalled = false;
		serviceDouble.create = () => {
			createCalled = true;
			return of(todos[0]);
		};
		component.newTodoTitle.set('   ');

		await component.addTodo();

		expect(createCalled).toBeFalsy();
	});

	it('should show an error when loading fails', async () => {
		serviceDouble.getAll = () => throwError(() => new Error('Network error'));

		await component.loadTodos();

		expect(component.errorMessage()).toBe(
			'Unable to load your TODO list. Please try again.'
		);
		expect(component.isLoading()).toBeFalsy();
	});

	it('should delete a TODO after confirmation', async () => {
		let deleteId: number | undefined;
		component.todos.set(todos);
		dialogDouble.open = () => ({ afterClosed: () => of(true) });
		serviceDouble.delete = id => {
			deleteId = id;
			return of(void 0);
		};
		let successMessage = '';
		notificationDouble.success = message => {
			successMessage = message;
		};

		await component.deleteTodo(todos[0]);

		expect(deleteId).toBe(todos[0].id);
		expect(component.todos()).not.toContain(todos[0]);
		expect(component.deletingTodoId()).toBeNull();
		expect(successMessage).toBe(`TODO ${todos[0].title} deleted successfully.`);
	});

	it('should not delete a TODO when confirmation is cancelled', async () => {
		let deleteCalled = false;
		component.todos.set(todos);
		dialogDouble.open = () => ({ afterClosed: () => of(false) });
		serviceDouble.delete = () => {
			deleteCalled = true;
			return of(void 0);
		};

		await component.deleteTodo(todos[0]);

		expect(deleteCalled).toBeFalsy();
		expect(component.todos()).toContain(todos[0]);
	});
});
