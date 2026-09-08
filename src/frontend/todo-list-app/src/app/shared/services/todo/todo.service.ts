import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  Todo,
  CreateTodoRequest
} from '../../models/todo.model';

import {
  environment
} from '../../../environments/environments.development';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private readonly http = inject(HttpClient);

  private readonly apiUrl =
    `${environment.apiUrl}/todos`;

  getAll(): Observable<Todo[]> {
    return this.http.get<Todo[]>(
      this.apiUrl
    );
  }

  create(
    request: CreateTodoRequest
  ): Observable<Todo> {

    return this.http.post<Todo>(
      this.apiUrl,
      request
    );
  }

  delete(id: number): Observable<void> {

    return this.http.delete<void>(
      `${this.apiUrl}/${id}`
    );
  }
}