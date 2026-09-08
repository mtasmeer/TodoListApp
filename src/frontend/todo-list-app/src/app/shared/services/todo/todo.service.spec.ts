import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

import { TodoService } from './todo.service';
import { Todo } from '../../models/todo.model';
import { environment } from '../../../environments/environments.development';

describe('TodoService', () => {
  let service: TodoService;
  let httpTesting: HttpTestingController;
  const apiUrl = `${environment.apiUrl}/todos`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TodoService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(TodoService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should get all TODOs with GET', async () => {
    const todos: Todo[] = [
      {
        id: 1,
        title: 'Review tests',
        createdAtUtc: '2026-09-06T10:00:00Z'
      }
    ];
    const resultPromise = firstValueFrom(service.getAll());

    const request = httpTesting.expectOne(apiUrl);
    expect(request.request.method).toBe('GET');
    request.flush(todos);

    expect(await resultPromise).toEqual(todos);
  });

  it('should propagate getAll HTTP errors', async () => {
    const resultPromise = firstValueFrom(service.getAll()).catch(error => error);

    const request = httpTesting.expectOne(apiUrl);
    request.flush('Unable to load TODOs', {
      status: 500,
      statusText: 'Server Error'
    });

    const error = await resultPromise;
    expect(error.status).toBe(500);
  });

  it('should create a TODO with POST and the request body', async () => {
    const requestBody = { title: 'Write documentation' };
    const createdTodo: Todo = {
      id: 2,
      title: requestBody.title,
      createdAtUtc: '2026-09-06T11:00:00Z'
    };
    const resultPromise = firstValueFrom(service.create(requestBody));

    const request = httpTesting.expectOne(apiUrl);
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual(requestBody);
    request.flush(createdTodo);

    expect(await resultPromise).toEqual(createdTodo);
  });

  it('should propagate create HTTP errors', async () => {
    const resultPromise = firstValueFrom(
      service.create({ title: 'Failing task' })
    ).catch(error => error);

    const request = httpTesting.expectOne(apiUrl);
    request.flush('Unable to create TODO', {
      status: 400,
      statusText: 'Bad Request'
    });

    const error = await resultPromise;
    expect(error.status).toBe(400);
  });

  it('should delete a TODO with DELETE', async () => {
    const resultPromise = firstValueFrom(service.delete(3));

    const request = httpTesting.expectOne(`${apiUrl}/3`);
    expect(request.request.method).toBe('DELETE');
    request.flush(null);

    expect(await resultPromise).toBeNull();
  });

  it('should propagate delete HTTP errors', async () => {
    const resultPromise = firstValueFrom(service.delete(4)).catch(error => error);

    const request = httpTesting.expectOne(`${apiUrl}/4`);
    request.flush('Unable to delete TODO', {
      status: 404,
      statusText: 'Not Found'
    });

    const error = await resultPromise;
    expect(error.status).toBe(404);
  });
});
