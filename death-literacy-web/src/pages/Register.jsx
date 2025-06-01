import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import TopNav from "../components/TopNav";

function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const usernameTaken = users.some((u) => u.username === username.trim());
    const emailTaken = users.some((u) => u.email === email.trim());

    if (usernameTaken) {
      setError("Username is already taken.");
      return;
    }

    if (emailTaken) {
      setError("Email is already registered.");
      return;
    }

    const passwordRegex = /^[a-zA-Z0-9]+$/;
    if (!passwordRegex.test(password)) {
      setError("Password can only contain letters and numbers.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // If there's a quiz result pending from result page
    const pending = JSON.parse(localStorage.getItem("pendingRecord"));
    const quizRecords = pending ? [pending] : [];

    const userData = {
      email: email.trim(),
      username: username.trim(),
      password,
      role: "user",
      quizRecords,
      subscription: {
        status: "Inactive",
        expires: null,
        plan: "none"
      }
    };

    const updatedUsers = [...users, userData];
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem("user", JSON.stringify(userData));

    if (pending) {
      localStorage.removeItem("pendingRecord");
    }

    setError("");
    setMessage("Registration successful! Redirecting to login...");

    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  return (
    <>
      <TopNav />
      <div style={styles.container}>
        <h2>Register</h2>

        <form onSubmit={handleRegister} style={styles.form}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="password"
            placeholder="Password (letters and numbers only)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={styles.input}
            required
          />
          {error && <p style={styles.error}>{error}</p>}
          <button type="submit" style={styles.button}>Register</button>
        </form>

        {message && <p style={styles.success}>{message}</p>}

        <p style={styles.linkText}>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </>
  );
}

// Styles
const styles = {
  container: {
    maxWidth: "400px",
    margin: "2rem auto",
    padding: "2rem",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#fff",
    textAlign: "center",
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
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
  },
  button: {
    padding: "0.75rem",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    fontSize: "1rem",
    borderRadius: "4px",
    cursor: "pointer",
  },
  error: {
    color: "red",
  },
  success: {
    color: "green",
  },
  linkText: {
    marginTop: "1rem",
  }
};

export default Register;
