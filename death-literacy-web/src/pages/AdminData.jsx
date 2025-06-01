import { useEffect, useState } from "react";
import TopNav from "../components/TopNav";

// Export to CSV
const exportToCSV = (data, filename = "quiz_data.csv") => {
  const headers = ["Username", "Email", "Quiz Title", "Score", "Feedback"];
  const rows = data.map(row =>
    [row.username, row.email, row.title, row.score, row.feedback].join(",")
  );
  const csvContent = [headers.join(","), ...rows].join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Export to JSON
const exportToJSON = (data, filename = "quiz_data.json") => {
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

function AdminData() {
  const [records, setRecords] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const users = [];
    const mainUser = JSON.parse(localStorage.getItem("user"));
    const subAdmins = JSON.parse(localStorage.getItem("subAdmins")) || [];

    if (mainUser) users.push(mainUser);
    if (subAdmins.length > 0) users.push(...subAdmins);

    const results = [];

    users.forEach(u => {
      const quizzes = u.quizRecords || [];
      quizzes.forEach(q => {
        results.push({
          username: u.username,
          email: u.email,
          title: q.title,
          score: q.score,
          feedback: q.feedback
        });
      });
    });

    setRecords(results);
  }, []);

  const filtered = filter.trim()
    ? records.filter(r => r.username.toLowerCase().includes(filter.toLowerCase()))
    : records;

  const averageScore = filtered.length > 0
    ? (filtered.reduce((sum, r) => sum + r.score, 0) / filtered.length).toFixed(2)
    : "N/A";

  return (
    <>
      <TopNav />
      <div style={styles.container}>
        <h2>Export & Analyze Quiz Data</h2>

        {/* Filter and export section */}
        <div style={styles.controls}>
          <input
            type="text"
            placeholder="Filter by username"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={styles.input}
          />
          <button onClick={() => exportToCSV(filtered)} style={styles.exportButton}>
            📤 Export CSV
          </button>
          <button onClick={() => exportToJSON(filtered)} style={styles.exportButton}>
            📥 Export JSON
          </button>
        </div>

        {/* Summary */}
        <p><strong>Average Score:</strong> {averageScore} | <strong>Total Records:</strong> {filtered.length}</p>

        {/* Table with scrollable container */}
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Quiz</th>
                <th>Score</th>
                <th>Feedback</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? (
                filtered.map((r, idx) => (
                  <tr key={idx}>
                    <td>{r.username}</td>
                    <td>{r.email}</td>
                    <td>{r.title}</td>
                    <td>{r.score}</td>
                    <td>{r.feedback}</td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="5">No matching data found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

// Responsive styles
const styles = {
  container: {
    maxWidth: "1000px",
    margin: "2rem auto",
    padding: "2rem",
    border: "1px solid #ccc",
    borderRadius: "10px",
    backgroundColor: "#f9f9f9"
  },
  controls: {
    display: "flex",
    flexWrap: "wrap",
    gap: "1rem",
    marginBottom: "1rem",
    alignItems: "center"
  },
  input: {
    padding: "0.5rem",
    fontSize: "1rem",
    flex: "1 1 200px",
    minWidth: "180px"
  },
  exportButton: {
    padding: "0.6rem 1rem",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
    fontWeight: "bold"
  },
  tableWrapper: {
    overflowX: "auto"
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    minWidth: "600px"
  }
};

export default AdminData;
