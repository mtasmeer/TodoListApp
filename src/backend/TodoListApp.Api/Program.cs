using TodoListApp.Application.Interfaces;
using TodoListApp.Application.Services;
using TodoListApp.Domain.Interfaces;
using TodoListApp.Infrastructure.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddSingleton<ITodoService, TodoService>();

builder.Services.AddSingleton<
    ITodoRepository,
    InMemoryTodoRepository>();

builder.Services.AddCors(options =>
{
    options.AddPolicy(
        "AngularDevelopment",
        policy =>
        {
            policy
                .WithOrigins("http://localhost:4200", "http://localhost:49837", "http://localhost:51727")
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/openapi/v1.json", "TodoList API v1");
        options.RoutePrefix = "swagger";
    });
}

app.UseHttpsRedirection();

// Enable the CORS policy here
app.UseCors("AngularDevelopment");


app.UseAuthorization();

app.MapControllers();

app.Run();
