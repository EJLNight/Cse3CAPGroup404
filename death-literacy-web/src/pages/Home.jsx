import { Link } from "react-router-dom";
import TopNav from "../components/TopNav"; // Global top navigation
import deathLiteracyImg from "../assets/resources/death-literacy.png"; // ✅ Image import

function Home() {
  return (
    <>
      <TopNav />
      <div style={styles.wrapper}>
        <h1 style={styles.title}>Welcome to the Death Literacy Platform</h1>
        <p style={styles.description}>
          This platform helps you assess your knowledge and improve your death literacy skills.
        </p>

        {/* ✅ Added visual + explanation block from the resource site */}
        <div style={styles.previewBlock}>
          <img
            src={deathLiteracyImg}
            alt="What is Death Literacy?"
            style={styles.image}
          />
          <p style={styles.previewText}>
            Test your knowledge about end-of-life, palliative care, and more.
            This quiz will help you understand important aspects of death literacy and advance care planning.
          </p>
        </div>

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
  previewBlock: {
    marginTop: "2rem",
    maxWidth: "600px",
    marginLeft: "auto",
    marginRight: "auto",
  },
  image: {
    width: "100%",
    maxWidth: "100%",
    height: "auto",
    borderRadius: "10px",
    marginBottom: "1rem",
  },
  previewText: {
    fontSize: "1rem",
    color: "#555",
    lineHeight: "1.6",
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
  },
};

export default Home;
