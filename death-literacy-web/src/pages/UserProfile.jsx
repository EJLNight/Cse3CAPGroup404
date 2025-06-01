import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TopNav from "../components/TopNav";

function UserProfile() {
  // Load user from localStorage
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const quizRecords = user.quizRecords || [];
  const subscription = user.subscription || {
    status: "Inactive",
    expires: null,
    plan: "none"
  };

  // Determine if subscription is expired
  const today = new Date().toISOString().split("T")[0];
  const isExpired = subscription.expires && today > subscription.expires;
  const displayStatus = isExpired ? "Expired" : subscription.status;

  // Handle password change logic
  const handlePasswordChange = () => {
    if (oldPassword !== user.password) {
      setMessage("Incorrect current password.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setMessage("New passwords do not match.");
      return;
    }
    if (!/^[a-zA-Z0-9]+$/.test(newPassword)) {
      setMessage("Password must use only letters and numbers.");
      return;
    }

    const updatedUser = { ...user, password: newPassword };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
    setMessage("Password updated successfully.");
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  // Handle logout action
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  // Export a single quiz record to CSV
  const exportSingleCSV = (username, email, record, index) => {
    const headers = ["Username", "Email", "Quiz Title", "Score", "Feedback"];
    const row = [username, email, record.title, record.score, record.feedback];
    const csv = [headers.join(","), row.join(",")].join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", `quiz_result_${index + 1}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Export all quiz records to CSV
  const exportAllCSV = () => {
    if (quizRecords.length === 0) return;

    const headers = ["Username", "Email", "Quiz Title", "Score", "Feedback"];
    const rows = quizRecords.map(q => [
      user.username,
      user.email,
      q.title,
      q.score,
      q.feedback
    ].join(","));

    const csvContent = [headers.join(","), ...rows].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "all_quiz_results.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <TopNav />
      <div style={styles.container}>
        <h2>User Profile</h2>

        {/* Basic account information */}
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Username:</strong> {user.username}</p>

        {/* Subscription section */}
        <div style={styles.section}>
          <h3>Subscription</h3>
          <p>Status: {displayStatus}</p>
          <p>Expires: {subscription.expires || "N/A"}</p>
          <p>Plan: {subscription.plan}</p>
          {isExpired && (
            <p style={{ color: "red", fontWeight: "bold" }}>
              Your subscription has expired. Please renew to regain access.
            </p>
          )}
          <Link to="/subscribe" style={styles.linkButton}>🔗 Go to Subscription Page</Link>
        </div>

        {/* Quiz records section */}
        <div style={styles.section}>
          <h3>Your Quiz Records</h3>
          {quizRecords.length > 0 ? (
            <>
              <button onClick={exportAllCSV} style={styles.exportAllButton}>
                📥 Export All as CSV
              </button>
              <ul style={styles.list}>
                {quizRecords.map((q, idx) => (
                  <li key={idx} style={styles.recordItem}>
                    <div>
                      <strong>{q.title}</strong><br />
                      Score: {q.score}<br />
                      Feedback: {q.feedback}
                    </div>
                    <button
                      onClick={() => exportSingleCSV(user.username, user.email, q, idx)}
                      style={styles.exportBtn}
                    >
                      📤 Export
                    </button>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p>No quiz records found.</p>
          )}
        </div>

        {/* Password update form */}
        <div style={styles.section}>
          <h3>Change Password</h3>
          <input
            type="password"
            placeholder="Current Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            style={styles.input}
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={styles.input}
          />
          <button onClick={handlePasswordChange} style={styles.button}>Update Password</button>
        </div>

        {/* Feedback message */}
        {message && <p style={styles.message}>{message}</p>}

        {/* Logout button */}
        <button onClick={handleLogout} style={styles.logoutButton}>🚪 Logout</button>
      </div>
    </>
  );
}

// Inline styles for layout and responsiveness
const styles = {
  container: {
    maxWidth: "700px",
    margin: "2rem auto",
    padding: "2rem 1rem",
    border: "1px solid #ccc",
    borderRadius: "8px",
    wordWrap: "break-word",
  },
  section: {
    marginBottom: "2rem",
  },
  input: {
    display: "block",
    width: "100%",
    padding: "0.6rem",
    marginBottom: "0.75rem",
    fontSize: "1rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  button: {
    padding: "0.6rem 1rem",
    fontSize: "1rem",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
  },
  logoutButton: {
    marginTop: "2rem",
    padding: "0.6rem 1rem",
    fontSize: "1rem",
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  linkButton: {
    display: "inline-block",
    marginTop: "0.75rem",
    padding: "0.5rem 1rem",
    backgroundColor: "#28a745",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "5px",
  },
  message: {
    marginTop: "1rem",
    color: "green",
  },
  list: {
    paddingLeft: 0,
    listStyleType: "none",
  },
  recordItem: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    backgroundColor: "#f1f1f1",
    padding: "1rem",
    marginBottom: "1rem",
    borderRadius: "5px",
  },
  exportBtn: {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    padding: "0.4rem 0.8rem",
    cursor: "pointer",
    borderRadius: "4px",
    fontSize: "0.9rem",
    alignSelf: "flex-start",
  },
  exportAllButton: {
    marginBottom: "1rem",
    backgroundColor: "#17a2b8",
    color: "#fff",
    border: "none",
    padding: "0.5rem 1rem",
    cursor: "pointer",
    borderRadius: "5px",
    fontSize: "0.95rem",
  },
};

export default UserProfile;
