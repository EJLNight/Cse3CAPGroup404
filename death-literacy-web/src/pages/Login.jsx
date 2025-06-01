import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import TopNav from "../components/TopNav";

function Login() {
  const navigate = useNavigate();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [inputError, setInputError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const remembered = localStorage.getItem("rememberedUser");
    if (remembered) {
      const { identifier, rememberMe } = JSON.parse(remembered);
      setIdentifier(identifier);
      setRememberMe(rememberMe);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    if (!/^[a-zA-Z0-9]+$/.test(password)) {
      setError("Password must only contain letters and numbers.");
      setInputError(true);
      return;
    }

    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedAdmin = JSON.parse(localStorage.getItem("admin"));
    const storedSubAdmins = JSON.parse(localStorage.getItem("subAdmins")) || [];

    const matchedSub = storedSubAdmins.find(
      (sa) =>
        (identifier === sa.email || identifier === sa.username) &&
        password === sa.password
    );

    if (matchedSub) {
      if (matchedSub.status === "frozen") {
        setError("This account has been frozen.");
        return;
      }
      if (matchedSub.status === "deleted") {
        setError("This account has been deleted.");
        return;
      }
    }

    const matched =
      (storedUser &&
        (identifier === storedUser.email || identifier === storedUser.username) &&
        password === storedUser.password) ? storedUser :
      (storedAdmin &&
        (identifier === storedAdmin.email || identifier === storedAdmin.username) &&
        password === storedAdmin.password) ? storedAdmin :
      matchedSub || null;

    if (matched) {
      // ✅ Check for pending quiz record
      const pending = JSON.parse(localStorage.getItem("pendingRecord"));
      if (pending && matched.role === "user") {
        // Load all users
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const updatedUsers = users.map((u) => {
          if (u.email === matched.email) {
            const updatedUser = {
              ...u,
              quizRecords: [...(u.quizRecords || []), pending],
            };
            // Update logged in user data
            localStorage.setItem("user", JSON.stringify(updatedUser));
            return updatedUser;
          }
          return u;
        });
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        localStorage.removeItem("pendingRecord");
        matched.quizRecords = [...(matched.quizRecords || []), pending];
      }

      localStorage.setItem("loggedInUser", JSON.stringify(matched));
      if (rememberMe) {
        localStorage.setItem("rememberedUser", JSON.stringify({ identifier, rememberMe }));
      } else {
        localStorage.removeItem("rememberedUser");
      }
      setError("");
      setInputError(false);
      navigate("/profile");
    } else {
      setError("Invalid username/email or password");
      setInputError(true);
    }
  };

  return (
    <>
      <TopNav />

      <div style={styles.container}>
        <h2>Login</h2>

        <form onSubmit={handleLogin} style={styles.form}>
          <input
            type="text"
            placeholder="Email or Username"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            style={{
              ...styles.input,
              borderColor: inputError ? "red" : "#ccc",
            }}
            required
          />

          <div style={styles.passwordContainer}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password (letters and numbers only)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                ...styles.input,
                borderColor: inputError ? "red" : "#ccc",
                flex: 1,
              }}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={styles.toggleButton}
            >
              {showPassword ? "🙈 Hide" : "👁️ Show"}
            </button>
          </div>

          <div style={styles.checkboxContainer}>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label style={{ marginLeft: "0.5rem" }}>Remember me</label>
          </div>

          {error && <p style={styles.error}>{error}</p>}

          <button type="submit" style={styles.button}>Login</button>
        </form>

        <div style={styles.links}>
          <p>
            Forgot your password? <Link to="/forgot-password">Click here</Link>
          </p>
          <p>
            Don’t have an account? <Link to="/register">Register</Link>
          </p>
          <p>
            ← <Link to="/">Back to Home</Link>
          </p>
        </div>
      </div>
    </>
  );
}

// Styles
const styles = {
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
    border: "1px solid #ccc",
    borderRadius: "4px",
    width: "100%",
  },
  passwordContainer: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    flexWrap: "nowrap",
  },
  toggleButton: {
    padding: "0.5rem",
    fontSize: "0.9rem",
    cursor: "pointer",
    border: "1px solid #ccc",
    background: "#eee",
    borderRadius: "4px",
  },
  checkboxContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  button: {
    padding: "0.75rem",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    fontSize: "1rem",
    cursor: "pointer",
    borderRadius: "4px",
  },
  error: {
    color: "red",
  },
  links: {
    marginTop: "1.5rem",
    textAlign: "center",
    fontSize: "0.95rem",
    lineHeight: "1.6",
  },
};

export default Login;
