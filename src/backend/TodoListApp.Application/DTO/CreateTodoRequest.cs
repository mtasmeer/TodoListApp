using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace TodoListApp.Application.DTO
{
    public class CreateTodoRequest
    {
        [Required(ErrorMessage = "Title is required.")]
        [StringLength(
        200,
        MinimumLength = 1,
        ErrorMessage = "Title must be between 1 and 200 characters.")]
        public string Title { get; init; } = string.Empty;
    }
}
