import React, { useEffect, useState } from "react";

const API_URL = "http://localhost:5000/todos";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then(setTodos);
  }, []);

  async function addTodo(event) {
    event.preventDefault();
    const trimmed = text.trim();

    if (!trimmed) return;

    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: trimmed })
    });

    const todo = await res.json();
    setTodos((current) => [...current, todo]);
    setText("");
  }

  async function toggleTodo(todo) {
    const res = await fetch(`${API_URL}/${todo.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ done: !todo.done })
    });

    const updated = await res.json();
    setTodos((current) =>
      current.map((item) => (item.id === updated.id ? updated : item))
    );
  }

  async function deleteTodo(id) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    setTodos((current) => current.filter((todo) => todo.id !== id));
  }

  return (
    <main style={styles.page}>
      <section style={styles.app}>
        <h1 style={styles.title}>TODO</h1>

        <form onSubmit={addTodo} style={styles.form}>
          <input
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="Add a todo"
            style={styles.input}
          />
          <button type="submit" style={styles.button}>
            Add
          </button>
        </form>

        <ul style={styles.list}>
          {todos.map((todo) => (
            <li key={todo.id} style={styles.item}>
              <label style={styles.label}>
                <input
                  type="checkbox"
                  checked={todo.done}
                  onChange={() => toggleTodo(todo)}
                />
                <span style={todo.done ? styles.doneText : undefined}>
                  {todo.text}
                </span>
              </label>
              <button onClick={() => deleteTodo(todo.id)} style={styles.delete}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "grid",
    placeItems: "center",
    margin: 0,
    fontFamily: "Arial, sans-serif",
    background: "#f5f5f5",
    color: "#222"
  },
  app: {
    width: "min(480px, 92vw)",
    padding: 24,
    background: "#fff",
    border: "1px solid #ddd",
    borderRadius: 8
  },
  title: {
    margin: "0 0 16px"
  },
  form: {
    display: "flex",
    gap: 8,
    marginBottom: 16
  },
  input: {
    flex: 1,
    padding: "10px 12px",
    border: "1px solid #ccc",
    borderRadius: 4,
    fontSize: 16
  },
  button: {
    padding: "10px 14px",
    border: 0,
    borderRadius: 4,
    background: "#222",
    color: "#fff",
    cursor: "pointer"
  },
  list: {
    display: "grid",
    gap: 8,
    padding: 0,
    margin: 0,
    listStyle: "none"
  },
  item: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    padding: "10px 0",
    borderTop: "1px solid #eee"
  },
  label: {
    display: "flex",
    alignItems: "center",
    gap: 8
  },
  doneText: {
    color: "#777",
    textDecoration: "line-through"
  },
  delete: {
    padding: "6px 10px",
    border: "1px solid #ccc",
    borderRadius: 4,
    background: "#fff",
    cursor: "pointer"
  }
};
