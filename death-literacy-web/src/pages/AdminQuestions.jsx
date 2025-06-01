import { useState, useEffect } from "react";
import TopNav from "../components/TopNav";

function AdminQuestions() {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState({
    question: "",
    optionA: "",
    optionB: "",
    correct: "a",
  });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("questionBank")) || [];
    setQuestions(stored);
  }, []);

  const updateStorage = (list) => {
    setQuestions(list);
    localStorage.setItem("questionBank", JSON.stringify(list));
  };

  const handleAdd = () => {
    if (!newQuestion.question || !newQuestion.optionA || !newQuestion.optionB) {
      alert("All fields are required.");
      return;
    }

    const newEntry = {
      ...newQuestion,
      id: Date.now()
    };

    const updated = [...questions, newEntry];
    updateStorage(updated);
    setNewQuestion({ question: "", optionA: "", optionB: "", correct: "a" });
  };

  const handleDelete = (id) => {
    const filtered = questions.filter((q) => q.id !== id);
    updateStorage(filtered);
  };

  const handleExportJSON = () => {
    const blob = new Blob([JSON.stringify(questions, null, 2)], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "questionBank.json";
    link.click();
  };

  const handleExportCSV = () => {
    const header = "Question,Option A,Option B,Correct Answer\n";
    const rows = questions.map(q =>
      `"${q.question}","${q.optionA}","${q.optionB}","${q.correct}"`
    );
    const csv = header + rows.join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "questionBank.csv";
    link.click();
  };

  const handleImport = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    const isCSV = file.name.endsWith(".csv");

    reader.onload = (e) => {
      try {
        let imported = [];
        if (isCSV) {
          const lines = e.target.result.trim().split("\n").slice(1);
          imported = lines.map(line => {
            const [question, optionA, optionB, correct] = line.split(",").map(x => x.replace(/^"|"$/g, ""));
            return { question, optionA, optionB, correct, id: Date.now() + Math.random() };
          });
        } else {
          imported = JSON.parse(e.target.result).map(q => ({ ...q, id: Date.now() + Math.random() }));
        }
        updateStorage([...questions, ...imported]);
      } catch (err) {
        alert("Import failed: Invalid file format.");
      }
    };

    reader.readAsText(file);
  };

  return (
    <>
      <TopNav />
      <div style={styles.container}>
        <h2>Manage Question Bank</h2>

        {/* Question Form */}
        <div style={styles.form}>
          <input
            type="text"
            placeholder="Question"
            value={newQuestion.question}
            onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
            style={styles.input}
          />
          <input
            type="text"
            placeholder="Option A"
            value={newQuestion.optionA}
            onChange={(e) => setNewQuestion({ ...newQuestion, optionA: e.target.value })}
            style={styles.input}
          />
          <input
            type="text"
            placeholder="Option B"
            value={newQuestion.optionB}
            onChange={(e) => setNewQuestion({ ...newQuestion, optionB: e.target.value })}
            style={styles.input}
          />
          <label>
            Correct Answer:
            <select
              value={newQuestion.correct}
              onChange={(e) => setNewQuestion({ ...newQuestion, correct: e.target.value })}
              style={{ marginLeft: "1rem", padding: "0.5rem", fontSize: "1rem" }}
            >
              <option value="a">A</option>
              <option value="b">B</option>
            </select>
          </label>
          <button onClick={handleAdd} style={styles.button}>Add Question</button>
        </div>

        {/* Export & Import Buttons */}
        <div style={styles.toolRow}>
          <button onClick={handleExportJSON} style={styles.exportButton}>📤 Export JSON</button>
          <button onClick={handleExportCSV} style={styles.exportButton}>📤 Export CSV</button>
          <label style={{ marginLeft: "1rem", fontWeight: "bold" }}>
            📥 Import:
            <input
              type="file"
              accept=".json,.csv"
              onChange={handleImport}
              style={{ marginLeft: "0.5rem" }}
            />
          </label>
        </div>

        {/* Display Question List */}
        <h3 style={{ marginTop: "2rem" }}>Current Questions</h3>
        {questions.length > 0 ? (
          <ul style={{ paddingLeft: "0" }}>
            {questions.map((q) => (
              <li key={q.id} style={styles.item}>
                <strong>{q.question}</strong><br />
                A: {q.optionA} | B: {q.optionB} <br />
                ✅ Correct: {q.correct.toUpperCase()} <br />
                <button onClick={() => handleDelete(q.id)} style={styles.delete}>🗑 Delete</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No questions added yet.</p>
        )}
      </div>
    </>
  );
}

const styles = {
  container: {
    maxWidth: "800px",
    margin: "2rem auto",
    padding: "2rem",
    border: "1px solid #ccc",
    borderRadius: "10px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
    marginBottom: "1rem",
  },
  input: {
    padding: "0.5rem",
    fontSize: "1rem",
    width: "100%",
  },
  button: {
    padding: "0.5rem 1rem",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    fontSize: "1rem",
    width: "fit-content",
  },
  exportButton: {
    padding: "0.5rem 1rem",
    backgroundColor: "#17a2b8",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    fontSize: "0.95rem",
    marginRight: "0.5rem",
    marginTop: "0.5rem",
  },
  toolRow: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: "0.5rem",
    marginTop: "1rem",
    marginBottom: "1rem",
  },
  item: {
    listStyle: "none",
    marginBottom: "1rem",
    padding: "1rem",
    backgroundColor: "#f9f9f9",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  delete: {
    marginTop: "0.5rem",
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    padding: "0.4rem 0.8rem",
    cursor: "pointer",
    fontSize: "0.9rem",
  }
};

export default AdminQuestions;
