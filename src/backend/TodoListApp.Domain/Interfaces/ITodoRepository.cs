using System;
using System.Collections.Generic;
using System.Text;
using TodoListApp.Domain.Entities;

namespace TodoListApp.Domain.Interfaces
{
    public interface ITodoRepository
    {
        IReadOnlyCollection<TodoItem> GetAll();

        TodoItem Add(TodoItem todo);

        bool Delete(int id);
    }
}
