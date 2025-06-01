import TopNav from "../components/TopNav";

// Contact Us page with address, phone, and email
function ContactUs() {
  return (
    <>
      {/* Top navigation bar */}
      <TopNav />

      {/* Centered content area */}
      <div style={styles.page}>
        <div style={styles.card}>
          <h2 style={styles.title}>Contact Us</h2>
          <p style={styles.desc}>
            We're here to help. Please reach out to us with any questions or concerns.
          </p>

          {/* Contact details block */}
          <div style={styles.info}>
            <p>📍 123 Greenway Ave, Melbourne VIC 3000, Australia</p>
            <p>📞 +61 3 9123 4567</p>
            <p>✉️ info@deathliteracy.org</p>
          </div>
        </div>
      </div>
    </>
  );
}

// Inline style definitions for layout and styling
const styles = {
  page: {
    backgroundColor: "#f8f9fa",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "2rem",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: "2rem",
    maxWidth: "500px",
    width: "100%",
    textAlign: "center",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
  title: {
    color: "green",
    marginBottom: "1rem",
  },
  desc: {
    color: "#555",
    marginBottom: "1.5rem",
  },
  info: {
    color: "#333",
    lineHeight: "1.8rem",
    fontSize: "1rem",
  },
};

export default ContactUs;
