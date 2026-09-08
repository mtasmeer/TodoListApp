using System;
using System.Collections.Generic;
using System.Text;
using TodoListApp.Application.DTO;
using TodoListApp.Application.Interfaces;
using TodoListApp.Domain.Entities;
using TodoListApp.Domain.Interfaces;

namespace TodoListApp.Application.Services
{
    public class TodoService: ITodoService
    {
        private readonly ITodoRepository _todoRepository;

        private int _nextId;

        public TodoService(ITodoRepository todoRepository)
        {
            _todoRepository = todoRepository
                ?? throw new ArgumentNullException(nameof(todoRepository));
        }

        public IReadOnlyCollection<TodoResponse> GetAll()
        {
            return _todoRepository
                .GetAll()
                .Select(MapToResponse)
                .ToList()
                .AsReadOnly();
        }

        public TodoResponse Add(CreateTodoRequest request)
        {
            ArgumentNullException.ThrowIfNull(request);

            var title = request.Title?.Trim();

            if (string.IsNullOrWhiteSpace(title))
            {
                throw new ArgumentException(
                    "TODO title cannot be empty.",
                    nameof(request));
            }

            var id = Interlocked.Increment(ref _nextId);

            var todo = TodoItem.Create(
                id,
                title,
                DateTime.UtcNow);

            var createdTodo = _todoRepository.Add(todo);

            return MapToResponse(createdTodo);
        }

        public bool Delete(int id)
        {
            if (id <= 0)
            {
                return false;
            }

            return _todoRepository.Delete(id);
        }

        private static TodoResponse MapToResponse(
            TodoItem todo)
        {
            return new TodoResponse
            {
                Id = todo.Id,
                Title = todo.Title,
                CreatedAtUtc = todo.CreatedAtUtc
            };
        }


    }
}
