using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Text;
using TodoListApp.Domain.Entities;
using TodoListApp.Domain.Interfaces;

namespace TodoListApp.Infrastructure.Repositories
{
    public class InMemoryTodoRepository : ITodoRepository
    {
        // Stores TODO items in memory using their ID as the key.
        // ConcurrentDictionary provides thread-safe access when multiple requests
        // read, add, or delete TODOs at the same time.
        private readonly ConcurrentDictionary<int, TodoItem> _todos = new();

        public IReadOnlyCollection<TodoItem> GetAll()
        {
            return _todos.Values
                .OrderBy(todo => todo.CreatedAtUtc)
                .ToList()
                .AsReadOnly();
        }

        public TodoItem Add(TodoItem todo)
        {
            ArgumentNullException.ThrowIfNull(todo);

            if (!_todos.TryAdd(todo.Id, todo))
            {
                throw new InvalidOperationException(
                    $"A TODO with ID {todo.Id} already exists.");
            }

            return todo;
        }

        public bool Delete(int id)
        {
            return _todos.TryRemove(id, out _);
        }

    }
}
