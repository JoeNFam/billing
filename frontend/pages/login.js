import { useState } from "react";
import axios from "axios";

const packages = [
  { name: "1 Hour", price: 20, duration: 60 },
  { name: "1 Day", price: 100, duration: 1440 },
];

export default function LoginPage() {
  const [phone, setPhone] = useState("");
  const [selected, setSelected] = useState(packages[0]);
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("");

  const handlePay = async () => {
    setLoading(true);
    setPaymentStatus("");
    try {
      const { data } = await axios.post("/api/mpesa/pay", {
        phone,
        amount: selected.price,
        account: phone,
      });
      setPaymentStatus("Payment prompt sent to your phone. Complete payment to get online.");
    } catch (err) {
      setPaymentStatus("Payment failed. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <h1 className="text-3xl font-bold text-accent mb-6">Digital Oasis Hotspot</h1>
      <div className="bg-primary p-8 rounded shadow-lg w-full max-w-md">
        <label className="block text-accent mb-2">Choose Package:</label>
        <select
          className="w-full p-2 mb-4 rounded"
          value={selected.name}
          onChange={e =>
            setSelected(packages.find(p => p.name === e.target.value))
          }
        >
          {packages.map(pkg => (
            <option key={pkg.name} value={pkg.name}>
              {pkg.name} - KES {pkg.price}
            </option>
          ))}
        </select>
        <label className="block text-accent mb-2">Phone Number:</label>
        <input
          type="tel"
          className="w-full p-2 mb-4 rounded"
          placeholder="e.g. 07xxxxxxxx"
          value={phone}
          onChange={e => setPhone(e.target.value)}
        />
        <button
          onClick={handlePay}
          className="w-full bg-accent text-primary font-bold py-2 rounded mb-4"
          disabled={loading}
        >
          {loading ? "Processing..." : "Pay with MPesa"}
        </button>
        <p className="text-accent2">{paymentStatus}</p>
      </div>
    </div>
  );
}