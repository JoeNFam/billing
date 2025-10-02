import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    try {
      const { data } = await axios.post("/api/admin/login", { email, password });
      localStorage.setItem("admin_token", data.token);
      router.push("/admin");
    } catch (err) {
      setError("Invalid login credentials.");
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="bg-primary p-8 rounded shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-accent mb-6">Admin Login</h1>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            className="w-full p-2 mb-4 rounded"
            placeholder="Email address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="w-full p-2 mb-4 rounded"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button className="w-full bg-accent text-primary font-bold py-2 rounded mb-4" type="submit">
            Login
          </button>
          {error && <div className="text-red-500">{error}</div>}
        </form>
      </div>
    </div>
  );
}