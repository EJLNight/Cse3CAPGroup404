import { Link } from "react-router-dom";
import TopNav from "../components/TopNav"; // Global top navigation

function Home() {
  return (
    <>
      <TopNav />
      <div style={styles.wrapper}>
        <h1 style={styles.title}>Welcome to the Death Literacy Platform</h1>
        <p style={styles.description}>
          This platform helps you assess your knowledge and improve your death literacy skills.
        </p>

        {/* Navigation Buttons */}
        <div style={styles.buttonGroup}>
          <Link to="/quiz" style={styles.primary}>Start Quiz</Link>
          <Link to="/login" style={styles.secondary}>Login / Register</Link>
        </div>
      </div>
    </>
  );
}

// Responsive inline styles
const styles = {
  wrapper: {
    textAlign: "center",
    marginTop: "4rem",
    padding: "0 1rem",
  },
  title: {
    fontSize: "1.8rem",
    marginBottom: "1rem",
  },
  description: {
    fontSize: "1rem",
    color: "#333",
    maxWidth: "500px",
    margin: "0 auto",
  },
  buttonGroup: {
    marginTop: "2rem",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    alignItems: "center",
  },
  primary: {
    padding: "0.75rem 1.5rem",
    backgroundColor: "#007bff",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "5px",
    fontSize: "1rem",
    width: "200px",
    textAlign: "center",
  },
  secondary: {
    padding: "0.75rem 1.5rem",
    backgroundColor: "#6c757d",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "5px",
    fontSize: "1rem",
    width: "200px",
    textAlign: "center",
  }
};

export default Home;
