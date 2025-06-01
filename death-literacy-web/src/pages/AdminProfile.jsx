import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TopNav from "../components/TopNav";

// Export a single quiz record
const exportSingleRecord = (username, email, record) => {
  const headers = ["Username", "Email", "Quiz Title", "Score", "Feedback"];
  const row = [username, email, record.title, record.score, record.feedback].join(",");
  const csvContent = [headers.join(","), row].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.setAttribute("download", `${username}_quiz_record.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Export all quiz records for a user
const exportAllRecords = (username, email, quizzes) => {
  const headers = ["Username", "Email", "Quiz Title", "Score", "Feedback"];
  const rows = quizzes.map(q =>
    [username, email, q.title, q.score, q.feedback].join(",")
  );
  const csvContent = [headers.join(","), ...rows].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.setAttribute("download", `${username}_all_quiz_records.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

function AdminProfile() {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  const navigate = useNavigate();

  const [searchUsername, setSearchUsername] = useState("");
  const [foundUserData, setFoundUserData] = useState(null);

  // Handle username search
  const handleSearch = () => {
    const allUsers = [];

    const mainUser = JSON.parse(localStorage.getItem("user"));
    if (mainUser) allUsers.push(mainUser);

    const subAdmins = JSON.parse(localStorage.getItem("subAdmins")) || [];
    allUsers.push(...subAdmins);

    const adminRecord = JSON.parse(localStorage.getItem("admin"));
    if (adminRecord) allUsers.push(adminRecord);

    const match = allUsers.find((u) => u.username === searchUsername.trim());
    if (match && Array.isArray(match.quizRecords)) {
      setFoundUserData(match);
    } else {
      setFoundUserData(null);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  return (
    <>
      <TopNav />
      <div style={styles.container}>
        <h2>Admin Profile</h2>
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

        {/* Quiz result panel */}
        {foundUserData ? (
          <div style={styles.result}>
            <h3>User: {foundUserData.username}</h3>
            <p><strong>Email:</strong> {foundUserData.email}</p>
            <ul>
              {foundUserData.quizRecords.map((q, idx) => (
                <li key={idx} style={{ marginBottom: "1rem" }}>
                  <strong>{q.title}</strong><br />
                  Score: {q.score}<br />
                  Feedback: {q.feedback}<br />
                  <button
                    onClick={() =>
                      exportSingleRecord(foundUserData.username, foundUserData.email, q)
                    }
                    style={styles.exportBtn}
                  >
                    📥 Export This
                  </button>
                </li>
              ))}
            </ul>
            <button
              onClick={() =>
                exportAllRecords(
                  foundUserData.username,
                  foundUserData.email,
                  foundUserData.quizRecords
                )
              }
              style={styles.exportBtn}
            >
              📤 Export All Records (CSV)
            </button>
          </div>
        ) : (
          searchUsername && <p>No user found or no records.</p>
        )}

        <hr style={{ margin: "2rem 0" }} />

        {/* Admin-only links */}
        <div style={styles.links}>
          <Link to="/admin/questions">🧠 Manage Question Bank</Link><br />
          <Link to="/admin/data">📊 Export & Analyze User Data</Link><br />
          {user?.username === "admin" && (
            <Link to="/create-admin">👤 Create Sub-Admin Account</Link>
          )}
        </div>

        <button onClick={handleLogout} style={styles.logoutButton}>🚪 Logout</button>
      </div>
    </>
  );
}

// Responsive styles
const styles = {
  container: {
    maxWidth: "700px",
    margin: "2rem auto",
    padding: "2rem",
    border: "1px solid #ccc",
    borderRadius: "10px",
    textAlign: "left",
  },
  searchSection: {
    display: "flex",
    flexWrap: "wrap",
    gap: "1rem",
    marginBottom: "1rem",
  },
  input: {
    flex: "1 1 200px",
    padding: "0.5rem",
    fontSize: "1rem",
    minWidth: "180px"
  },
  button: {
    padding: "0.5rem 1rem",
    fontSize: "1rem",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    borderRadius: "4px"
  },
  result: {
    marginTop: "1rem",
    backgroundColor: "#f9f9f9",
    padding: "1rem",
    borderRadius: "5px",
  },
  exportBtn: {
    marginTop: "0.5rem",
    padding: "0.4rem 0.8rem",
    fontSize: "0.9rem",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  links: {
    fontSize: "1.1rem",
    lineHeight: "2rem",
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

export default AdminProfile;
