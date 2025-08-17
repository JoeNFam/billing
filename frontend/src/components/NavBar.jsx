import React from "react";

export default function NavBar({ page, setPage }) {
  return (
    <header>
      <div><b>MikroTik RB951 Manager</b></div>
      <nav>
        <a
          href="#"
          className={page === "dashboard" ? "active" : ""}
          onClick={() => setPage("dashboard")}
        >
          Dashboard
        </a>
        <a
          href="#"
          className={page === "users" ? "active" : ""}
          onClick={() => setPage("users")}
        >
          Users
        </a>
        <a href="https://github.com/your-username/mikrotik-manager" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
      </nav>
    </header>
  );
}