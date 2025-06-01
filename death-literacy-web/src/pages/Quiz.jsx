import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TopNav from "../components/TopNav";

function Quiz() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("");

  const handleSubmit = () => {
    if (!selected) return alert("Please select an answer.");

    const isCorrect = selected === "b";
    const score = isCorrect ? 100 : 0;
    const feedback = isCorrect ? "Correct!" : "Incorrect. The correct answer is 2.";

    // Save result for Result page
    const result = {
      title: "Simple Math Test",
      score,
      feedback,
    };

    localStorage.setItem("lastResult", JSON.stringify(result));
    navigate("/result");
  };

  return (
    <>
      <TopNav />
      <div style={styles.container}>
        <h2>Mini Quiz</h2>
        <p><strong>Question:</strong> 1 + 1 = ?</p>

        {/* Option A */}
        <div style={styles.option}>
          <label>
            <input
              type="radio"
              name="answer"
              value="a"
              checked={selected === "a"}
              onChange={() => setSelected("a")}
              style={styles.radio}
            />
            a. 1
          </label>
        </div>

        {/* Option B */}
        <div style={styles.option}>
          <label>
            <input
              type="radio"
              name="answer"
              value="b"
              checked={selected === "b"}
              onChange={() => setSelected("b")}
              style={styles.radio}
            />
            b. 2
          </label>
        </div>

        <button onClick={handleSubmit} style={styles.button}>Submit</button>
      </div>
    </>
  );
}

// Responsive styling
const styles = {
  container: {
    maxWidth: "500px",
    margin: "2rem auto",
    padding: "1.5rem",
    border: "1px solid #ccc",
    borderRadius: "8px",
    textAlign: "center",
    backgroundColor: "#fff",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
  },
  option: {
    margin: "1rem 0",
    fontSize: "1.1rem",
    textAlign: "left",
    paddingLeft: "1rem",
  },
  radio: {
    marginRight: "0.5rem",
    transform: "scale(1.2)",
  },
  button: {
    padding: "0.75rem 1.5rem",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    fontSize: "1rem",
    borderRadius: "5px",
    marginTop: "1rem",
    width: "100%",
    maxWidth: "250px",
  },
};

export default Quiz;
