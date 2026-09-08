using System;
using System.Collections.Generic;
using System.Text;

namespace TodoListApp.Application.DTO
{
    public class TodoResponse
    {
        public int Id { get; init; }

        public string Title { get; init; } = string.Empty;

        public DateTime CreatedAtUtc { get; init; }

    }
}
