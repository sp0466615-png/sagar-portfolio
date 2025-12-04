import React, { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("");

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.message) {
      setStatus("Please fill email and message");
      return;
    }
    setStatus("Sending...");
    try {
      // Use full backend URL to avoid proxy confusion in dev
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      // Network-level success — now check response
      const text = await res.text(); // read raw text for better debug
      let json;
      try { json = JSON.parse(text); } catch (_) { json = null; }

      if (res.ok) {
        // expected success
        const msg = (json && (json.msg || json.ok)) || "Message sent!";
        setStatus(msg);
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        // server returned error status (400/500)
        console.error("Server error:", res.status, text);
        setStatus(`Server error: ${res.status} - ${(json && (json.error || text)) || text}`);
      }
    } catch (err) {
      // fetch threw — network error, CORS, DNS, etc.
      console.error("Fetch failed:", err);
      setStatus(`Network error: ${err.message || err}`);
      // Hint to user/developer:
      //  - Is backend running on http://localhost:5000 ?
      //  - Check browser console and server logs.
    }

    // clear status after 7s
    setTimeout(() => setStatus(""), 7000);
  };

  return (
    <div className="card" style={{ marginTop: 14 }}>
      <h4 style={{ marginTop: 0 }}>Contact</h4>
      <p className="small muted">Interested in working together? Send a message.</p>
      <form onSubmit={onSubmit} aria-label="Contact form">
        <label className="small muted">Name</label>
        <input name="name" value={form.name} onChange={onChange} placeholder="Your name" />

        <label className="small muted">Email</label>
        <input name="email" value={form.email} onChange={onChange} type="email" required placeholder="you@example.com" />

        <label className="small muted" style={{ marginTop: 8 }}>Subject</label>
        <input name="subject" value={form.subject} onChange={onChange} placeholder="Subject" />

        <label className="small muted" style={{ marginTop: 8 }}>Message</label>
        <textarea name="message" value={form.message} onChange={onChange} rows="4" required placeholder="Hi — I’d like to talk about..." />

        <button className="btn" type="submit" style={{ width: "100%", marginTop: 10 }}>Send</button>
        <p style={{ marginTop: 8, color: status.toLowerCase().includes("sent") ? "green" : "red" }}>{status}</p>
      </form>
    </div>
  );
}

