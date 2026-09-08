using Microsoft.AspNetCore.Mvc;
using TodoListApp.Application.DTO;
using TodoListApp.Application.Interfaces;

namespace TodoListApp.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodosController : ControllerBase
    {
        private readonly ITodoService _todoService;

        public TodosController(ITodoService todoService)
        {
            _todoService = todoService;
        }

        [HttpGet]
        [ProducesResponseType(
            typeof(IEnumerable<TodoResponse>),
            StatusCodes.Status200OK)]
        public ActionResult<IEnumerable<TodoResponse>> GetAll()
        {
            var todos = _todoService.GetAll();

            return Ok(todos);
        }

        [HttpPost]
        [ProducesResponseType(
            typeof(TodoResponse),
            StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<TodoResponse> Create(
            [FromBody] CreateTodoRequest request)
        {
            var todo = _todoService.Add(request);

            return Created(
                $"/api/todos/{todo.Id}",
                todo);
        }

        [HttpDelete("{id:int}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult Delete(int id)
        {
            var deleted = _todoService.Delete(id);

            if (!deleted)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
