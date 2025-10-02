import axios from "axios";
import crypto from "crypto";

const {
  MPESA_CONSUMER_KEY,
  MPESA_CONSUMER_SECRET,
  MPESA_SHORTCODE,
  MPESA_PASSKEY,
  MPESA_CALLBACK_URL,
} = process.env;

let accessToken = null;
let tokenExpiry = 0;

async function getMpesaToken() {
  if (accessToken && Date.now() < tokenExpiry) return accessToken;
  const auth =
    "Basic " +
    Buffer.from(`${MPESA_CONSUMER_KEY}:${MPESA_CONSUMER_SECRET}`).toString("base64");
  const { data } = await axios.get(
    "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
    { headers: { Authorization: auth } }
  );
  accessToken = data.access_token;
  tokenExpiry = Date.now() + 3300 * 1000;
  return accessToken;
}

export async function initiateStkPush(phone, amount, account) {
  const timestamp = new Date()
    .toISOString()
    .replace(/[^0-9]/g, "")
    .slice(0, 14);
  const password = Buffer.from(
    `${MPESA_SHORTCODE}${MPESA_PASSKEY}${timestamp}`
  ).toString("base64");

  const token = await getMpesaToken();
  const payload = {
    BusinessShortCode: MPESA_SHORTCODE,
    Password: password,
    Timestamp: timestamp,
    TransactionType: "CustomerPayBillOnline",
    Amount: amount,
    PartyA: phone,
    PartyB: MPESA_SHORTCODE,
    PhoneNumber: phone,
    CallBackURL: MPESA_CALLBACK_URL,
    AccountReference: account,
    TransactionDesc: "Digital Oasis Hotspot",
  };

  const { data } = await axios.post(
    "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
    payload,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return data;
}

// Webhook handler for MPesa payment confirmation
export async function mpesaCallback(req, res) {
  // TODO: Validate signature (if provided)
  const body = req.body;
  // Parse payment confirmation, update DB, and trigger MikroTik login
  // Example: { Body: { stkCallback: { ... } } }
  if (body.Body?.stkCallback?.ResultCode === 0) {
    // Successful payment: trigger MikroTik login here (not shown)
    // Save payment log, update user session, etc.
    res.json({ result: "Payment processed" });
  } else {
    res.json({ result: "Payment failed or not completed" });
  }
}