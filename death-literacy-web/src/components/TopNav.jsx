import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

// Top-right floating navigation bar with responsive layout
function TopNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const [active, setActive] = useState("/");

  useEffect(() => {
    setActive(location.pathname);
  }, [location]);

  // Handle profile navigation based on login state
  const handleProfileClick = () => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!user) {
      navigate("/login");
    } else {
      navigate("/profile");
    }
  };

  return (
    <div style={styles.navbar}>
      {/* Home navigation button */}
      <button
        onClick={() => navigate("/")}
        style={{ ...styles.button, ...(active === "/" ? styles.active : {}) }}
      >
        🏠 Home
      </button>

      {/* Quiz navigation button */}
      <button
        onClick={() => navigate("/quiz")}
        style={{ ...styles.button, ...(active === "/quiz" ? styles.active : {}) }}
      >
        ❓ Quiz
      </button>

      {/* Contact Us navigation button */}
      <button
        onClick={() => navigate("/contact-us")}
        style={{ ...styles.button, ...(active === "/contact-us" ? styles.active : {}) }}
      >
        📮 Contact Us
      </button>

      {/* Profile navigation button */}
      <button
        onClick={handleProfileClick}
        style={{ ...styles.button, ...(active === "/profile" ? styles.active : {}) }}
      >
        👤 Profile
      </button>
    </div>
  );
}

// Responsive styles
const styles = {
  navbar: {
    position: "absolute",
    top: "1rem",
    right: "1rem",
    display: "flex",
    flexWrap: "wrap", // ✅ allows wrapping on small screens
    justifyContent: "flex-end",
    gap: "0.5rem",
    zIndex: 1000,
    maxWidth: "90vw", // ✅ prevent overflow
  },
  button: {
    padding: "0.5rem 0.75rem",
    fontSize: "1rem",
    backgroundColor: "#eee",
    color: "#000",
    border: "1px solid #ccc",
    borderRadius: "4px",
    cursor: "pointer",
    flex: "1 1 auto", // ✅ allow flexible button width
    minWidth: "90px", // ✅ prevent shrinking too much
  },
  active: {
    backgroundColor: "#007bff",
    color: "#fff",
  },
};

export default TopNav;
