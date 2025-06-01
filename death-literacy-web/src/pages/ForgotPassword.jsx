import { useState } from "react";
import { Link } from "react-router-dom";
import TopNav from "../components/TopNav"; // Top navigation bar

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // Simulate sending a reset link
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.includes("@")) {
      setMessage("Please enter a valid email address.");
      return;
    }

    setMessage(`If an account with ${email} exists, a reset link has been sent.`);
  };

  return (
    <>
      <TopNav />
      <div style={styles.wrapper}>
        <div style={styles.container}>
          <h2>Forgot Password</h2>

          <form onSubmit={handleSubmit} style={styles.form}>
            <input
              type="email"
              placeholder="Enter your registered email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              required
            />
            <button type="submit" style={styles.button}>Send Reset Link</button>
          </form>

          {message && <p style={styles.message}>{message}</p>}

          <p style={styles.linkText}>
            <Link to="/login">← Back to Login</Link>
          </p>
        </div>
      </div>
    </>
  );
}

// Responsive styles
const styles = {
  wrapper: {
    padding: "1rem",
  },
  container: {
    maxWidth: "400px",
    margin: "3rem auto",
    padding: "2rem",
    border: "1px solid #ccc",
    borderRadius: "8px",
    textAlign: "center",
    backgroundColor: "#fff",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  input: {
    padding: "0.75rem",
    fontSize: "1rem",
    borderRadius: "4px",
    border: "1px solid #ccc",
    width: "100%",
  },
  button: {
    padding: "0.75rem",
    backgroundColor: "#17a2b8",
    color: "#fff",
    border: "none",
    fontSize: "1rem",
    borderRadius: "4px",
    cursor: "pointer",
  },
  message: {
    marginTop: "1rem",
    color: "green",
  },
  linkText: {
    marginTop: "1rem",
  },
};

export default ForgotPassword;
