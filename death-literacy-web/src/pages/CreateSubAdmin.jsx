import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TopNav from "../components/TopNav";

function CreateSubAdmin() {
  const [admins, setAdmins] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const adminsPerPage = 20;

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("subAdmins")) || [];
    setAdmins(stored);
  }, []);

  const updateStorage = (newList) => {
    setAdmins(newList);
    localStorage.setItem("subAdmins", JSON.stringify(newList));
  };

  const getUsedIds = () => admins.map((a) => parseInt(a.id));

  const getNextId = () => {
    const usedIds = getUsedIds();
    const allDeleted = JSON.parse(localStorage.getItem("deletedSubAdminIds")) || [];
    const maxUsedId = usedIds.length > 0 ? Math.max(...usedIds) : -1;
    let nextId = maxUsedId + 1;

    const reusableId = allDeleted.find((deletedId) => {
      return nextId - deletedId >= 1000;
    });

    if (reusableId !== undefined) {
      const filtered = allDeleted.filter((id) => id !== reusableId);
      localStorage.setItem("deletedSubAdminIds", JSON.stringify(filtered));
      return reusableId;
    }

    return nextId;
  };

  const handleCreate = () => {
    const newId = getNextId();
    const idStr = newId.toString().padStart(6, "0");
    const username = `ad${idStr}`;

    const newAdmin = {
      id: idStr,
      username,
      email: username,
      password: "000000",
      status: "active",
      role: "admin",
    };

    const updatedList = [...admins, newAdmin];
    updateStorage(updatedList);
  };

  const toggleStatus = (id) => {
    const updated = admins.map((a) =>
      a.id === id
        ? { ...a, status: a.status === "active" ? "frozen" : "active" }
        : a
    );
    updateStorage(updated);
  };

  const handleDelete = (id) => {
    const updated = admins.filter((a) => a.id !== id);
    updateStorage(updated);

    const deletedIds = JSON.parse(localStorage.getItem("deletedSubAdminIds")) || [];
    if (!deletedIds.includes(parseInt(id))) {
      deletedIds.push(parseInt(id));
      localStorage.setItem("deletedSubAdminIds", JSON.stringify(deletedIds));
    }
  };

  const start = (currentPage - 1) * adminsPerPage;
  const pagedAdmins = admins.slice(start, start + adminsPerPage);
  const totalPages = Math.ceil(admins.length / adminsPerPage);

  return (
    <>
      <TopNav />
      <div style={styles.wrapper}>
        <div style={styles.container}>
          <h2>Create Sub-Admin Account</h2>

          <Link to="/profile" style={styles.link}>← Back to Admin Profile</Link>

          <button onClick={handleCreate} style={styles.createButton}>
            ➕ Create Sub-Admin
          </button>

          <div style={{ overflowX: "auto" }}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Password</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pagedAdmins.map((admin) => (
                  <tr key={admin.id}>
                    <td>{admin.username}</td>
                    <td>{admin.email}</td>
                    <td>{admin.status}</td>
                    <td>{admin.password}</td>
                    <td>
                      <button onClick={() => toggleStatus(admin.id)} style={styles.actionBtn}>
                        {admin.status === "active" ? "❄ Freeze" : "✅ Unfreeze"}
                      </button>
                      <button onClick={() => handleDelete(admin.id)} style={styles.deleteBtn}>
                        ❌ Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={styles.pagination}>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setCurrentPage(p)}
                style={{
                  ...styles.pageBtn,
                  backgroundColor: currentPage === p ? "#007bff" : "#eee",
                  color: currentPage === p ? "#fff" : "#000",
                }}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

const styles = {
  wrapper: {
    padding: "1rem",
  },
  container: {
    maxWidth: "1000px",
    margin: "0 auto",
    padding: "1.5rem",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#fff",
    overflowX: "auto",
  },
  link: {
    display: "inline-block",
    marginBottom: "1rem",
    textDecoration: "none",
    color: "#007bff",
  },
  createButton: {
    padding: "0.75rem 1rem",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    fontSize: "1rem",
    marginBottom: "1rem",
    cursor: "pointer",
    borderRadius: "5px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "1rem",
    minWidth: "600px",
  },
  actionBtn: {
    marginRight: "0.5rem",
    padding: "0.25rem 0.5rem",
    fontSize: "0.9rem",
    cursor: "pointer",
  },
  deleteBtn: {
    padding: "0.25rem 0.5rem",
    fontSize: "0.9rem",
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
  pagination: {
    textAlign: "center",
    marginTop: "1rem",
  },
  pageBtn: {
    margin: "0 0.25rem",
    padding: "0.5rem",
    cursor: "pointer",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
};

export default CreateSubAdmin;
