import React, { useEffect, useState } from "react";
import { getUsers, addUser, deleteUser } from "../api";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ name: "", password: "", group: "read" });
  const [error, setError] = useState("");

  function refresh() {
    getUsers()
      .then(setUsers)
      .catch(() => setError("Could not fetch users"));
  }
  useEffect(() => {
    refresh();
  }, []);

  const handleAdd = async e => {
    e.preventDefault();
    setAdding(true);
    setError("");
    try {
      await addUser(form);
      setForm({ name: "", password: "", group: "read" });
      refresh();
    } catch {
      setError("Failed to add user.");
    }
    setAdding(false);
  };

  const handleRemove = async id => {
    if (!window.confirm("Remove user?")) return;
    try {
      await deleteUser(id);
      refresh();
    } catch {
      setError("Failed to remove user.");
    }
  };

  return (
    <>
      <h2>Manage Users</h2>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <form onSubmit={handleAdd} style={{ marginBottom: "1.5rem" }}>
        <input
          placeholder="Username"
          value={form.name}
          required
          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
        />
        <input
          placeholder="Password"
          value={form.password}
          type="password"
          required
          onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
        />
        <select
          value={form.group}
          onChange={e => setForm(f => ({ ...f, group: e.target.value }))}
        >
          <option value="read">read</option>
          <option value="write">write</option>
          <option value="full">full</option>
        </select>
        <button type="submit" disabled={adding}>
          {adding ? "Adding..." : "Add User"}
        </button>
      </form>
      <table width="100%" border={0} cellPadding={8}>
        <thead>
          <tr>
            <th>Name</th><th>Group</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u[".id"]}>
              <td>{u.name}</td>
              <td>{u.group}</td>
              <td>
                <button onClick={() => handleRemove(u[".id"])} disabled={u.name === "admin"}>
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}