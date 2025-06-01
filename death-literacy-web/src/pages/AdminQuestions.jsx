import { useState, useEffect } from "react";
import TopNav from "../components/TopNav";
import defaultQuestions from "../data/questions"; // ✅ Default import

function AdminQuestions() {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState({
    text: "",
    optionA: "",
    optionB: "",
    correct: "a",
  });

  // On initial load, get data from localStorage or use default questions
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("questionBank")) || [];
    if (stored.length === 0) {
      localStorage.setItem("questionBank", JSON.stringify(defaultQuestions));
      setQuestions(defaultQuestions);
    } else {
      setQuestions(stored);
    }
  }, []);

  // Save updated questions to state and localStorage
  const updateStorage = (list) => {
    setQuestions(list);
    localStorage.setItem("questionBank", JSON.stringify(list));
  };

  // Add a new question to the list
  const handleAdd = () => {
    if (!newQuestion.text || !newQuestion.optionA || !newQuestion.optionB) {
      alert("All fields are required.");
      return;
    }

    const newEntry = {
      ...newQuestion,
      id: Date.now()
    };

    updateStorage([...questions, newEntry]);
    setNewQuestion({ text: "", optionA: "", optionB: "", correct: "a" });
  };

  // Delete a question by its ID
  const handleDelete = (id) => {
    const filtered = questions.filter((q) => q.id !== id);
    updateStorage(filtered);
  };

  return (
    <>
      <TopNav />
      <div style={{ padding: "2rem" }}>
        <h2>Manage Question Bank</h2>
        <input
          placeholder="Question"
          value={newQuestion.text}
          onChange={(e) => setNewQuestion({ ...newQuestion, text: e.target.value })}
        />
        <input
          placeholder="Option A"
          value={newQuestion.optionA}
          onChange={(e) => setNewQuestion({ ...newQuestion, optionA: e.target.value })}
        />
        <input
          placeholder="Option B"
          value={newQuestion.optionB}
          onChange={(e) => setNewQuestion({ ...newQuestion, optionB: e.target.value })}
        />
        <select
          value={newQuestion.correct}
          onChange={(e) => setNewQuestion({ ...newQuestion, correct: e.target.value })}
        >
          <option value="a">A</option>
          <option value="b">B</option>
        </select>
        <button onClick={handleAdd}>Add Question</button>
        <ul>
          {questions.map((q) => (
            <li key={q.id}>
              {q.text} (A: {q.optionA} | B: {q.optionB}) ✅: {q.correct?.toUpperCase()}
              <button onClick={() => handleDelete(q.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default AdminQuestions;
