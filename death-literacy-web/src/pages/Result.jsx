import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import TopNav from "../components/TopNav";
import jsPDF from "jspdf";

function Result() {
  const navigate = useNavigate();
  const [result, setResult] = useState([]);
  const [score, setScore] = useState(0);
  const resultRef = useRef();

  // Load quiz result from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("quizResult") || "[]");
    setResult(stored);
    const correctCount = stored.filter(q => q.isCorrect).length;
    setScore(correctCount);
  }, []);

  // Generate and download result PDF
  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text("Quiz Result", 10, 10);
    doc.text(`Score: ${score} / ${result.length}`, 10, 20);

    let y = 30;
    result.forEach((item, index) => {
      doc.text(`${index + 1}. ${item.question}`, 10, y);
      y += 7;
      doc.text(`Your Answer: ${item.selected?.toUpperCase()} | Correct: ${item.correct?.toUpperCase()}`, 12, y);
      y += 10;
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
    });

    doc.save("quiz-result.pdf");
  };

  // Handle Save button: logged-in users save now; guests redirected and save later
  const handleSaveRecord = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const newEntry = {
      timestamp: new Date().toISOString(),
      score,
      total: result.length,
      answers: result,
    };

    if (!user) {
      // Guest: store pending record and redirect to register
      localStorage.setItem("pendingRecord", JSON.stringify(newEntry));
      navigate("/register");
    } else {
      // Logged in: save immediately
      const history = JSON.parse(localStorage.getItem("quizHistory") || "[]");
      const completeEntry = { ...newEntry, username: user.username };
      localStorage.setItem("quizHistory", JSON.stringify([...history, completeEntry]));
      navigate("/profile");
    }
  };

  return (
    <>
      <TopNav />
      <div style={{ padding: "2rem" }} ref={resultRef}>
        <h2>Quiz Completed</h2>
        <p style={{ fontSize: "1.2rem" }}>
          ✅ Your Score: {score} / {result.length}
        </p>

        <h3>Answer Summary:</h3>
        <ul>
          {result.map((item, index) => (
            <li key={index} style={{ marginBottom: "1rem" }}>
              <strong>Q{index + 1}: {item.question}</strong><br />
              Your Answer: {item.selected?.toUpperCase()} <br />
              Correct Answer: {item.correct?.toUpperCase()} <br />
              {item.isCorrect ? "✔️ Correct" : "❌ Incorrect"}
            </li>
          ))}
        </ul>

        <div style={{ marginTop: "2rem" }}>
          <button onClick={handleDownloadPDF} style={{ marginRight: "1rem" }}>
            📥 Download PDF
          </button>
          <button onClick={handleSaveRecord}>
            💾 Save Record
          </button>
        </div>
      </div>
    </>
  );
}

export default Result;
