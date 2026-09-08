# TODO List Application

A full-stack TODO list application built with Angular and ASP.NET Core Web API.

The application allows users to:

* View TODO items
* Add new TODO items
* Delete TODO items

The backend uses an in-memory repository, so no database setup is required.

## Technology Stack

### Backend

* .NET 10
* ASP.NET Core Web API
* C#
* REST API
* Dependency Injection
* In-memory data storage
* xUnit
* Moq

### Frontend

* Angular
* TypeScript
* HTML
* CSS
* Angular HttpClient
* Vitest


## Prerequisites

Install the following before running the application:

* .NET 10 SDK
* Node.js
* npm
* Angular CLI

Verify the installations:

```powershell
dotnet --version
node --version
npm --version
ng version
```

## Running the Backend

From the repository root:

```powershell
dotnet restore
```

Run the API:

```powershell
dotnet run --project TodoListApp.Api
```

The API will start on the HTTPS/HTTP URLs shown in the terminal.

For example:

```text
https://localhost:7264
```

> The port may differ depending on the local environment.

## Running the Frontend

Open a second terminal:

```powershell
cd todo-list-app
```

Install dependencies:

```powershell
npm install
```

### Configure API URL

Before starting Angular, check:

```text
src/environments/environment.development.ts
```

Update the API URL to match the HTTPS URL used by the backend.

For example:

```typescript
export const environment = {
  production: false,
  apiUrl: 'https://localhost:7264/api'
};
```

Then start Angular:

```powershell
ng serve
```

Open:

```text
http://localhost:49837
```

## Data Storage

The application intentionally uses an in-memory repository as permitted by the assessment.

TODO items are stored in memory while the API process is running.

Therefore:

* No database setup is required.
* Data is lost when the API application stops or restarts.
* The repository uses `ConcurrentDictionary` to provide thread-safe access.

## Running Backend Tests

From the repository root:

```powershell
dotnet test
```

The backend tests are separated by responsibility:

```text
tests/
├── TodoListApp.Application.Tests
├── TodoListApp.Infrastructure.Tests
└── TodoListApp.Api.Tests
```

The coverage file will be generated under the `TestResults` directory.


## Running Frontend Tests

From the Angular project directory:

```powershell
cd todo-list-app
npm run test:coverage
```

The frontend tests cover the TODO service HTTP operations and component behavior.

The application is intended to run locally using the Angular development server and ASP.NET Core development server.
