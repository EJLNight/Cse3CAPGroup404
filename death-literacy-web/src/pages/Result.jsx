import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TopNav from "../components/TopNav";

function Result() {
  const navigate = useNavigate();
  const [result, setResult] = useState(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("lastResult");
    if (stored) {
      setResult(JSON.parse(stored));
    } else {
      navigate("/quiz");
    }
  }, [navigate]);

  const handleSave = () => {
    const result = JSON.parse(localStorage.getItem("lastResult"));
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("Please login to save your result.");
      navigate("/login");
      return;
    }

    const updatedUser = {
      ...user,
      quizRecords: [...(user.quizRecords || []), result],
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));
    setSaved(true);
  };

  return (
    <>
      <TopNav />
      <div style={styles.container}>
        <h2>Quiz Result</h2>

        {result && (
          <>
            <p><strong>Score:</strong> {result.score}</p>
            <p><strong>Feedback:</strong> {result.feedback}</p>
          </>
        )}

        {!saved ? (
          <button onClick={handleSave} style={styles.button}>💾 Save to Profile</button>
        ) : (
          <p style={styles.successMsg}>
            ✅ Saved! Go to your <Link to="/profile">profile</Link>.
          </p>
        )}

        <Link to="/quiz" style={styles.linkButton}>🔁 Try Again</Link>
      </div>
    </>
  );
}

// Responsive inline styles
const styles = {
  container: {
    maxWidth: "500px",
    margin: "2rem auto",
    padding: "2rem",
    border: "1px solid #ccc",
    borderRadius: "8px",
    textAlign: "center",
    backgroundColor: "#fff",
    boxShadow: "0 0 10px rgba(0,0,0,0.05)",
  },
  button: {
    marginTop: "1rem",
    padding: "0.75rem 1.5rem",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    fontSize: "1rem",
    cursor: "pointer",
    borderRadius: "5px",
  },
  linkButton: {
    display: "inline-block",
    marginTop: "1rem",
    padding: "0.6rem 1.2rem",
    backgroundColor: "#007bff",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "5px",
  },
  successMsg: {
    color: "green",
    marginTop: "1rem",
  }
};

export default Result;
