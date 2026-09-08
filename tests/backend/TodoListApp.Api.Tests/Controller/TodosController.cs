using Microsoft.AspNetCore.Mvc;
using Moq;
using TodoListApp.Api.Controllers;
using TodoListApp.Application.DTO;
using TodoListApp.Application.Interfaces;

namespace TodoListApp.Api.Tests.Controllers;

    public sealed class TodosControllerTests
    {
        [Fact]
        public void GetAll_ReturnsOkResult()
        {
            // Arrange
            var service = new Mock<ITodoService>();

            service
                .Setup(x => x.GetAll())
                .Returns(
                [
                    new TodoResponse
                {
                    Id = 1,
                    Title = " Todos .NET"
                }
                ]);

            var controller = new TodosController(service.Object);

            // Act
            var result = controller.GetAll();

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result.Result);

            var todos = Assert.IsAssignableFrom<IEnumerable<TodoResponse>>(
                okResult.Value);

            Assert.Single(todos);
        }

        [Fact]
        public void Create_ReturnsCreatedResult()
        {
            // Arrange
            var service = new Mock<ITodoService>();

            var todo = new TodoResponse
            {
                Id = 1,
                Title = "Todos Angular"
            };

            service
                .Setup(x => x.Add(It.IsAny<CreateTodoRequest>()))
                .Returns(todo);

            var controller = new TodosController(service.Object);

            var request = new CreateTodoRequest
            {
                Title = "Todos Angular 22"
            };

            // Act
            var result = controller.Create(request);

            // Assert
            var createdResult =
                Assert.IsType<CreatedResult>(result.Result);

            Assert.Equal(
                "/api/todos/1",
                createdResult.Location);

            Assert.Equal(todo, createdResult.Value);
        }

        [Fact]
        public void Delete_WhenTodoExists_ReturnsNoContent()
        {
            // Arrange
            var service = new Mock<ITodoService>();

            service
                .Setup(x => x.Delete(1))
                .Returns(true);

            var controller = new TodosController(service.Object);

            // Act
            var result = controller.Delete(1);

            // Assert
            Assert.IsType<NoContentResult>(result);
        }

        [Fact]
        public void Delete_WhenTodoDoesNotExist_ReturnsNotFound()
        {
            // Arrange
            var service = new Mock<ITodoService>();

            service
                .Setup(x => x.Delete(999))
                .Returns(false);

            var controller = new TodosController(service.Object);

            // Act
            var result = controller.Delete(999);

            // Assert
            Assert.IsType<NotFoundResult>(result);
        }
}