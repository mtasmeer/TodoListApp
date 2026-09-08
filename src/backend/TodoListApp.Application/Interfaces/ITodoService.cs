using System;
using System.Collections.Generic;
using System.Text;
using TodoListApp.Application.DTO;

namespace TodoListApp.Application.Interfaces
{
    public interface ITodoService
    {
        IReadOnlyCollection<TodoResponse> GetAll();

        TodoResponse Add(CreateTodoRequest request);

        bool Delete(int id);

    }
}
