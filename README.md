# todo-app-groovy

Create a minimal full-stack TODO app, React + Node, in this structure:

```
/server
  - server.js (Express, port 5000, CORS enabled)
  - In-memory array for todos (no DB)
  - Routes: GET /todos, POST /todos, PATCH /todos/:id, DELETE /todos/:id
  - Each todo: { id, text, done }

/client
  - Vite + React app (port 5173)
  - Single App.jsx with: input + add button, list of todos with checkbox (toggle done) and delete button
  - Fetch calls to http://localhost:5000/todos for all CRUD ops
  - Minimal inline CSS, no extra libraries

Output only the code for: server.js, client/src/App.jsx, client/src/main.jsx, and package.json files for both folders. No explanations, no comments beyond essential ones.
```
