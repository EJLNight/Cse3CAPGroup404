import TopNav from "../components/TopNav";
import { Link } from "react-router-dom";

function Pricing() {
  return (
    <>
      <TopNav /> {/* Top navigation bar */}
      <div style={styles.container}>
        <h2 style={styles.heading}>Choose Your Subscription Plan</h2>

        <div style={styles.cardContainer}>
          {/* $0.99 Daily Plan */}
          <div style={styles.card}>
            <h3 style={styles.title}>$0.99 / day</h3>
            <p><strong>Daily Subscription</strong></p>
            <ul style={styles.list}>
              <li>✔ 1 personalized AI feedback report</li>
              <li>🚫 No access to video courses</li>
              <li>🚫 No templates or live sessions</li>
            </ul>
            <Link to="/checkout?plan=basic" style={styles.button}>Subscribe</Link>
          </div>

          {/* $4.99 Weekly Plan */}
          <div style={styles.card}>
            <h3 style={styles.title}>$4.99 / week</h3>
            <p><strong>Weekly Subscription</strong></p>
            <ul style={styles.list}>
              <li>✔ Unlimited AI reports</li>
              <li>✔ Access to all video courses</li>
              <li>✔ Downloadable planning templates</li>
              <li>✔ Weekly live Q&A sessions</li>
            </ul>
            <Link to="/checkout?plan=weekly" style={styles.button}>Subscribe</Link>
          </div>

          {/* $16.99 Monthly Plan */}
          <div style={styles.card}>
            <h3 style={styles.title}>$16.99 / month</h3>
            <p><strong>Monthly Subscription</strong></p>
            <ul style={styles.list}>
              <li>✔ Unlimited AI reports</li>
              <li>✔ All video courses</li>
              <li>✔ Templates + tools</li>
              <li>✔ Priority live Q&A access</li>
            </ul>
            <Link to="/checkout?plan=monthly" style={styles.button}>Subscribe</Link>
          </div>
        </div>
      </div>
    </>
  );
}

// Inline responsive styles
const styles = {
  container: {
    maxWidth: "1100px",
    margin: "2rem auto",
    padding: "2rem 1rem",
    backgroundColor: "#ffffff",
    color: "#000000",
    borderRadius: "10px",
    colorScheme: "light",
  },
  heading: {
    textAlign: "center",
    marginBottom: "2rem",
    color: "#333",
    fontSize: "1.8rem",
  },
  cardContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "2rem",
  },
  card: {
    flex: "1 1 280px",
    maxWidth: "320px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    padding: "1.5rem",
    backgroundColor: "#fff",
    color: "#000",
    textAlign: "center",
    boxShadow: "0 0 8px rgba(0,0,0,0.05)",
  },
  title: {
    fontSize: "1.5rem",
    marginBottom: "0.5rem",
    color: "#000",
  },
  list: {
    textAlign: "left",
    paddingLeft: "1.5rem",
    marginTop: "1rem",
    marginBottom: "1rem",
    color: "#000",
  },
  button: {
    display: "inline-block",
    marginTop: "1rem",
    padding: "0.6rem 1.2rem",
    backgroundColor: "#007bff",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "5px",
    fontWeight: "bold",
  },
};

export default Pricing;
