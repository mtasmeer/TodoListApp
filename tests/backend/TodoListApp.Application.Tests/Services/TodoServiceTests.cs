using TodoListApp.Application.DTO;
using TodoListApp.Application.Services;
using TodoListApp.Infrastructure.Repositories;

namespace TodoListApp.Application.Tests.Services
{
    public class TodoServiceTests
    {
        [Fact]
        public void GetAll_WhenRepositoryIsEmpty_ReturnsEmptyCollection()
        {
            // Arrange
            var repository =
                new InMemoryTodoRepository();

            var service =
                new TodoService(repository);

            // Act
            var result =
                service.GetAll();

            // Assert
            Assert.Empty(result);
        }

        [Fact]
        public void Add_WithValidRequest_CreatesTodo()
        {
            // Arrange
            var repository =
                new InMemoryTodoRepository();

            var service =
                new TodoService(repository);

            var request =
                new CreateTodoRequest
                {
                    Title = "Learn Angular"
                };

            // Act
            var result =
                service.Add(request);

            // Assert
            Assert.Equal(1, result.Id);

            Assert.Equal(
                "Learn Angular",
                result.Title);

            Assert.NotEqual(
                default,
                result.CreatedAtUtc);
        }

        [Fact]
        public void Add_TrimsWhitespaceFromTitle()
        {
            // Arrange
            var repository =
                new InMemoryTodoRepository();

            var service =
                new TodoService(repository);

            var request =
                new CreateTodoRequest
                {
                    Title = "  Learn .NET  "
                };

            // Act
            var result =
                service.Add(request);

            // Assert
            Assert.Equal(
                "Learn .NET",
                result.Title);
        }

        [Fact]
        public void Add_WithEmptyTitle_ThrowsException()
        {
            // Arrange
            var repository =
                new InMemoryTodoRepository();

            var service =
                new TodoService(repository);

            var request =
                new CreateTodoRequest
                {
                    Title = "   "
                };

            // Act & Assert
            Assert.Throws<ArgumentException>(
                () => service.Add(request));
        }

        [Fact]
        public void GetAll_AfterAddingTodos_ReturnsAllTodos()
        {
            // Arrange
            var repository =
                new InMemoryTodoRepository();

            var service =
                new TodoService(repository);

            service.Add(
                new CreateTodoRequest
                {
                    Title = "First TODO"
                });

            service.Add(
                new CreateTodoRequest
                {
                    Title = "Second TODO"
                });

            // Act
            var result =
                service.GetAll();

            // Assert
            Assert.Equal(2, result.Count);

            Assert.Equal(
                "First TODO",
                result.ElementAt(0).Title);

            Assert.Equal(
                "Second TODO",
                result.ElementAt(1).Title);
        }

        [Fact]
        public void Delete_WhenTodoExists_ReturnsTrue()
        {
            // Arrange
            var repository =
                new InMemoryTodoRepository();

            var service =
                new TodoService(repository);

            var todo =
                service.Add(
                    new CreateTodoRequest
                    {
                        Title = "Delete me"
                    });

            // Act
            var result =
                service.Delete(todo.Id);

            // Assert
            Assert.True(result);

            Assert.Empty(
                service.GetAll());
        }

        [Fact]
        public void Delete_WhenTodoDoesNotExist_ReturnsFalse()
        {
            // Arrange
            var repository =
                new InMemoryTodoRepository();

            var service =
                new TodoService(repository);

            // Act
            var result =
                service.Delete(999);

            // Assert
            Assert.False(result);
        }
    }
}
