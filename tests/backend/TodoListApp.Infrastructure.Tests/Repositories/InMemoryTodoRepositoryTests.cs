using TodoListApp.Domain.Entities;
using TodoListApp.Infrastructure.Repositories;

namespace TodoListApp.Infrastructure.Tests.Repositories;

public sealed class InMemoryTodoRepositoryTests
{
    [Fact]
    public void GetAll_WhenRepositoryIsEmpty_ReturnsEmptyCollection()
    {
        // Arrange
        var repository = new InMemoryTodoRepository();

        // Act
        var result = repository.GetAll();

        // Assert
        Assert.Empty(result);
    }

    [Fact]
    public void Add_AddsTodoToRepository()
    {
        // Arrange
        var repository = new InMemoryTodoRepository();

        var todo = TodoItem.Create(
            1,
            "Learn .NET",
            DateTime.UtcNow);

        // Act
        repository.Add(todo);

        // Assert
        var result = repository.GetAll();

        Assert.Single(result);
        Assert.Equal("Learn .NET", result.First().Title);
    }

    [Fact]
    public void Delete_WhenTodoExists_RemovesTodo()
    {
        // Arrange
        var repository = new InMemoryTodoRepository();

        var todo = TodoItem.Create(
            1,
            "Delete me",
            DateTime.UtcNow);

        repository.Add(todo);

        // Act
        var result = repository.Delete(1);

        // Assert
        Assert.True(result);
        Assert.Empty(repository.GetAll());
    }

    [Fact]
    public void Delete_WhenTodoDoesNotExist_ReturnsFalse()
    {
        // Arrange
        var repository = new InMemoryTodoRepository();

        // Act
        var result = repository.Delete(999);

        // Assert
        Assert.False(result);
    }

    [Fact]
    public void Add_WithDuplicateId_ThrowsInvalidOperationException()
    {
        // Arrange
        var repository = new InMemoryTodoRepository();

        var first = TodoItem.Create(
            1,
            "First",
            DateTime.UtcNow);

        var second = TodoItem.Create(
            1,
            "Second",
            DateTime.UtcNow);

        repository.Add(first);

        // Act & Assert
        Assert.Throws<InvalidOperationException>(
            () => repository.Add(second));
    }
}