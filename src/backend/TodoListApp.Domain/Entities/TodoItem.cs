using System;
using System.Collections.Generic;
using System.Text;

namespace TodoListApp.Domain.Entities
{
    public class TodoItem
    {
        public int Id { get; private set; }

        public string Title { get; private set; }

        public DateTime CreatedAtUtc { get; private set; }

        private TodoItem()
        {
            Title = string.Empty;
        }

        private TodoItem(
            int id,
            string title,
            DateTime createdAtUtc)
        {
            Id = id;
            Title = title;
            CreatedAtUtc = createdAtUtc;
        }

        public static TodoItem Create(
            int id,
            string title,
            DateTime createdAtUtc)
        {
            if (id <= 0)
            {
                throw new ArgumentOutOfRangeException(
                    nameof(id),
                    "TODO ID must be greater than zero.");
            }

            if (string.IsNullOrWhiteSpace(title))
            {
                throw new ArgumentException(
                    "TODO title cannot be empty.",
                    nameof(title));
            }

            title = title.Trim();

            if (title.Length > 200)
            {
                throw new ArgumentException(
                    "TODO title cannot exceed 200 characters.",
                    nameof(title));
            }

            return new TodoItem(
                id,
                title,
                createdAtUtc);
        }

    }
}
