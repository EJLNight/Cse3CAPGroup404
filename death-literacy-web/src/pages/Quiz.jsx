import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopNav from "../components/TopNav";
import defaultQuestions from "../data/questions";

function Quiz() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({}); // Store selected answers

  // Initialize questions once on page load
  useEffect(() => {
    let stored = JSON.parse(localStorage.getItem("questionBank") || "[]");

    // Merge with default if needed
    const usedText = new Set(stored.map(q => q.text));
    const remaining = defaultQuestions.filter(q => !usedText.has(q.text));
    const needed = 20 - stored.length;

    const filler = needed > 0
      ? remaining.sort(() => 0.5 - Math.random()).slice(0, needed)
      : [];

    const combined = [...stored, ...filler]
      .sort(() => 0.5 - Math.random()) // shuffle all
      .slice(0, 20); // take exactly 20

    setQuestions(combined);
  }, []);

  const current = questions[currentIndex];

  const handleSelect = (value) => {
    setAnswers({ ...answers, [currentIndex]: value });
  };

  const handleNext = () => {
    if (!answers[currentIndex]) {
      alert("Please select an answer.");
      return;
    }

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Prepare result and go to result page
      const result = questions.map((q, i) => {
        const selected = answers[i];
        const correct = q.correct || (q.answer === "Yes" ? "a" : "b"); // support both formats
        return {
          question: q.text,
          selected,
          correct,
          isCorrect: selected === correct
        };
      });
      localStorage.setItem("quizResult", JSON.stringify(result));
      navigate("/result");
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <>
      <TopNav />
      <div style={{ padding: "2rem" }}>
        <h2>Q{currentIndex + 1}: {current?.text}</h2>
        <div>
          <label>
            <input
              type="radio"
              value="a"
              checked={answers[currentIndex] === "a"}
              onChange={() => handleSelect("a")}
            />
            {current?.optionA || "Yes"}
          </label>
          <br />
          <label>
            <input
              type="radio"
              value="b"
              checked={answers[currentIndex] === "b"}
              onChange={() => handleSelect("b")}
            />
            {current?.optionB || "No"}
          </label>
        </div>

        <div style={{ marginTop: "1rem" }}>
          <button onClick={handlePrev} disabled={currentIndex === 0}>
            ⬅️ Previous
          </button>
          <button onClick={handleNext} style={{ marginLeft: "1rem" }}>
            {currentIndex === questions.length - 1 ? "Finish" : "Next ➡️"}
          </button>
        </div>
      </div>
    </>
  );
}

export default Quiz;
