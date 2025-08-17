import React, { useState } from "react";
import NavBar from "./components/NavBar";
import Dashboard from "./components/Dashboard";
import Users from "./components/Users";

function App() {
  const [page, setPage] = useState("dashboard");
  return (
    <>
      <NavBar page={page} setPage={setPage} />
      <div className="container">
        {page === "dashboard" && <Dashboard />}
        {page === "users" && <Users />}
      </div>
    </>
  );
}

export default App;