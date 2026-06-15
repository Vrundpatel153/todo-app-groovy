import React, { useEffect, useState } from "react";

const API_URL = "http://localhost:5000/todos";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const remaining = todos.filter((todo) => !todo.done).length;

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
        <header style={styles.header}>
          <div>
            <p style={styles.kicker}>Today</p>
            <h1 style={styles.title}>TODO</h1>
          </div>
          <div style={styles.count}>
            <strong style={styles.countNumber}>{remaining}</strong>
            <span>{remaining === 1 ? "task" : "tasks"} left</span>
          </div>
        </header>

        <form onSubmit={addTodo} style={styles.form}>
          <input
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="What needs doing?"
            style={styles.input}
          />
          <button type="submit" style={styles.button}>
            Add
          </button>
        </form>

        {todos.length === 0 ? (
          <div style={styles.empty}>No todos yet. Add your first one.</div>
        ) : (
          <ul style={styles.list}>
            {todos.map((todo) => (
              <li key={todo.id} style={styles.item}>
                <label style={styles.label}>
                  <input
                    type="checkbox"
                    checked={todo.done}
                    onChange={() => toggleTodo(todo)}
                    style={styles.checkbox}
                  />
                  <span style={todo.done ? styles.doneText : styles.todoText}>
                    {todo.text}
                  </span>
                </label>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  style={styles.delete}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "grid",
    placeItems: "center",
    padding: 20,
    boxSizing: "border-box",
    fontFamily:
      "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
    background:
      "linear-gradient(135deg, #f7f3ea 0%, #e8f0ee 48%, #f1e4df 100%)",
    color: "#202124"
  },
  app: {
    width: "min(560px, 100%)",
    padding: 28,
    boxSizing: "border-box",
    background: "rgba(255, 255, 255, 0.9)",
    border: "1px solid rgba(32, 33, 36, 0.08)",
    borderRadius: 8,
    boxShadow: "0 24px 70px rgba(47, 55, 70, 0.16)"
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
    marginBottom: 22
  },
  kicker: {
    margin: "0 0 4px",
    color: "#687076",
    fontSize: 13,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: 0
  },
  title: {
    margin: 0,
    fontSize: 38,
    lineHeight: 1,
    fontWeight: 800,
    letterSpacing: 0
  },
  count: {
    display: "grid",
    placeItems: "center",
    minWidth: 72,
    minHeight: 58,
    border: "1px solid #d5ded9",
    borderRadius: 8,
    background: "#f8fbf9",
    color: "#405149",
    fontSize: 12
  },
  countNumber: {
    display: "block",
    fontSize: 22
  },
  form: {
    display: "flex",
    gap: 10,
    marginBottom: 18
  },
  input: {
    flex: 1,
    minWidth: 0,
    padding: "13px 14px",
    border: "1px solid #cfd7d3",
    borderRadius: 8,
    fontSize: 16
  },
  button: {
    padding: "0 18px",
    border: 0,
    borderRadius: 8,
    background: "#215c4f",
    color: "#fff",
    cursor: "pointer",
    fontSize: 15,
    fontWeight: 700
  },
  empty: {
    padding: "28px 16px",
    border: "1px dashed #c7d0cc",
    borderRadius: 8,
    background: "#fbfcfb",
    color: "#687076",
    textAlign: "center"
  },
  list: {
    display: "grid",
    gap: 10,
    padding: 0,
    margin: 0,
    listStyle: "none"
  },
  item: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    padding: "12px 12px",
    border: "1px solid #e4e9e6",
    borderRadius: 8,
    background: "#fff"
  },
  label: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    minWidth: 0
  },
  checkbox: {
    width: 18,
    height: 18,
    accentColor: "#215c4f",
    flex: "0 0 auto"
  },
  todoText: {
    overflowWrap: "anywhere",
    lineHeight: 1.4
  },
  doneText: {
    color: "#8a9490",
    textDecoration: "line-through",
    overflowWrap: "anywhere",
    lineHeight: 1.4
  },
  delete: {
    padding: "8px 10px",
    border: "1px solid #e4c7c2",
    borderRadius: 8,
    background: "#fff",
    color: "#9a3f35",
    cursor: "pointer",
    fontWeight: 700
  }
};
