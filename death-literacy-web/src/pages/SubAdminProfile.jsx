import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TopNav from "../components/TopNav";

// Utility function: export quiz records to CSV
const exportToCSV = (quizzes, username) => {
  const headers = ["Title", "Score", "Feedback"];
  const rows = quizzes.map(q => [q.title, q.score, q.feedback].join(","));
  const csvContent = [headers.join(","), ...rows].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.setAttribute("download", `${username}_quiz_records.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

function SubAdminProfile() {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  const navigate = useNavigate();

  const [searchUsername, setSearchUsername] = useState("");
  const [foundUserData, setFoundUserData] = useState(null);

  // Handle search for user data by username
  const handleSearch = () => {
    const allUsers = [];

    const mainUser = JSON.parse(localStorage.getItem("user"));
    const subAdmins = JSON.parse(localStorage.getItem("subAdmins")) || [];
    const superAdmin = JSON.parse(localStorage.getItem("admin"));

    if (mainUser) allUsers.push(mainUser);
    if (superAdmin) allUsers.push(superAdmin);
    if (subAdmins.length > 0) allUsers.push(...subAdmins);

    const match = allUsers.find(u => u.username === searchUsername.trim());
    setFoundUserData(match || null);
  };

  // Logout and redirect to login
  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  return (
    <>
      <TopNav />
      <div style={{ padding: "2rem" }}>
        <div style={styles.container}>
          <h2>Sub-Admin Profile</h2>
          <p><strong>Logged in as:</strong> {user?.username} ({user?.role})</p>

          {/* Search bar */}
          <div style={styles.searchSection}>
            <input
              type="text"
              placeholder="Search user by username"
              value={searchUsername}
              onChange={(e) => setSearchUsername(e.target.value)}
              style={styles.input}
            />
            <button onClick={handleSearch} style={styles.button}>Search</button>
          </div>

          {/* Search result display */}
          {foundUserData ? (
            <div style={styles.result}>
              <h3>User: {foundUserData.username}</h3>
              <ul>
                {(foundUserData.quizRecords || []).map((q, idx) => (
                  <li key={idx}>
                    <strong>{q.title}</strong><br />
                    Score: {q.score}<br />
                    Feedback: {q.feedback}
                  </li>
                ))}
              </ul>

              {(foundUserData.quizRecords || []).length > 0 && (
                <button
                  onClick={() => exportToCSV(foundUserData.quizRecords, foundUserData.username)}
                  style={styles.downloadButton}
                >
                  📤 Download CSV
                </button>
              )}
            </div>
          ) : (
            searchUsername && <p>No user found.</p>
          )}

          <hr style={{ margin: "2rem 0" }} />

          {/* Functional links */}
          <div style={styles.links}>
            <Link to="/admin/questions">🧠 Manage Question Bank</Link><br />
            <Link to="/admin/data">📊 Export & Analyze User Data</Link><br />
          </div>

          {/* Logout button */}
          <button onClick={handleLogout} style={styles.logoutButton}>🚪 Logout</button>
        </div>
      </div>
    </>
  );
}

// Styles optimized for mobile responsiveness
const styles = {
  container: {
    maxWidth: "700px",
    margin: "0 auto",
    padding: "2rem 1rem",
    border: "1px solid #ccc",
    borderRadius: "10px",
    textAlign: "left",
  },
  searchSection: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.5rem",
    marginBottom: "1rem",
  },
  input: {
    flex: "1 1 200px",
    padding: "0.5rem",
    fontSize: "1rem",
    minWidth: "0",
  },
  button: {
    padding: "0.5rem 1rem",
    fontSize: "1rem",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
  result: {
    marginTop: "1rem",
    backgroundColor: "#f9f9f9",
    padding: "1rem",
    borderRadius: "5px",
    wordBreak: "break-word",
  },
  downloadButton: {
    marginTop: "1rem",
    padding: "0.5rem 1rem",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    fontSize: "1rem",
    cursor: "pointer",
  },
  links: {
    fontSize: "1.1rem",
    lineHeight: "2rem",
    wordBreak: "break-word",
  },
  logoutButton: {
    marginTop: "2rem",
    padding: "0.5rem 1rem",
    fontSize: "1rem",
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  }
};

export default SubAdminProfile;
