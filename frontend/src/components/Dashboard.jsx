import React, { useEffect, useState } from "react";
import { getStatus, getInterfaces, getLeases, rebootRouter } from "../api";

export default function Dashboard() {
  const [status, setStatus] = useState(null);
  const [interfaces, setInterfaces] = useState([]);
  const [leases, setLeases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rebooting, setRebooting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    Promise.all([getStatus(), getInterfaces(), getLeases()])
      .then(([s, i, l]) => {
        setStatus(s);
        setInterfaces(i);
        setLeases(l);
        setError("");
      })
      .catch(() => setError("Could not fetch data from router"))
      .finally(() => setLoading(false));
  }, []);

  const handleReboot = async () => {
    if (!window.confirm("Reboot the router?")) return;
    setRebooting(true);
    try {
      await rebootRouter();
      alert("Reboot command sent!");
    } catch {
      alert("Failed to reboot.");
    }
    setRebooting(false);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <>
      <h2>Router Status</h2>
      <div>
        <b>Model:</b> {status.board_name} &nbsp;
        <b>CPU:</b> {status.cpu} ({status["cpu-count"]} cores)
        <br />
        <b>Uptime:</b> {status.uptime} &nbsp;
        <b>Free Memory:</b> {Math.round(status["free-memory"] / 1024 / 1024)} MB &nbsp;
        <b>Free HDD:</b> {Math.round(status["free-hdd-space"] / 1024 / 1024)} MB
        <br />
        <button onClick={handleReboot} disabled={rebooting}>
          {rebooting ? "Rebooting..." : "Reboot Router"}
        </button>
      </div>
      <h3 style={{ marginTop: "2rem" }}>Interfaces</h3>
      <table width="100%" border={0} cellPadding={8}>
        <thead>
          <tr>
            <th>Name</th><th>Type</th><th>Running</th><th>Tx</th><th>Rx</th>
          </tr>
        </thead>
        <tbody>
          {interfaces.map(i => (
            <tr key={i.name}>
              <td>{i.name}</td>
              <td>{i.type}</td>
              <td>{i.running ? "Yes" : "No"}</td>
              <td>{i["tx-byte"] ? (i["tx-byte"] / 1024).toFixed(0) + " KB" : "-"}</td>
              <td>{i["rx-byte"] ? (i["rx-byte"] / 1024).toFixed(0) + " KB" : "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3 style={{ marginTop: "2rem" }}>Connected Clients (DHCP leases)</h3>
      <table width="100%" border={0} cellPadding={8}>
        <thead>
          <tr>
            <th>Address</th><th>MAC</th><th>Host</th><th>Status</th>
          </tr>
        </thead>
        <tbody>
          {leases.map(l => (
            <tr key={l.mac_address}>
              <td>{l.address}</td>
              <td>{l.mac_address}</td>
              <td>{l.host_name || "-"}</td>
              <td>{l.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}