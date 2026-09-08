export interface Todo {
  id: number;
  title: string;
  createdAtUtc: string;
}

export interface CreateTodoRequest {
  title: string;
}