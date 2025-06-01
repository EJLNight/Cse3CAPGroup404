import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import TopNav from "../components/TopNav";

// Subscription plan options
const subscriptionPlans = {
  basic: {
    label: "$0.99 One-Time (1 Day Access)",
    benefits: ["1 personalized AI report only"],
    price: 0.99,
    duration: 1,
  },
  weekly: {
    label: "$4.99 / Week",
    benefits: ["Unlimited AI reports", "Video courses", "Templates", "Weekly Q&A"],
    price: 4.99,
    duration: 7,
  },
  monthly: {
    label: "$16.99 / Month",
    benefits: ["Unlimited AI reports", "Courses", "Templates", "Priority Q&A"],
    price: 16.99,
    duration: 30,
  },
};

function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [planKey, setPlanKey] = useState("basic");
  const [confirmed, setConfirmed] = useState(false);

  // Get selected plan from query string
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const planParam = searchParams.get("plan");
    if (planParam && subscriptionPlans[planParam]) {
      setPlanKey(planParam);
    }
  }, [location.search]);

  const plan = subscriptionPlans[planKey];

  // Confirm and apply subscription
  const handleConfirm = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    const now = new Date();
    const existingExpiry = user?.subscription?.expires
      ? new Date(user.subscription.expires)
      : null;

    const baseTime = existingExpiry && existingExpiry > now ? existingExpiry : now;
    const newExpiry = new Date(baseTime.getTime() + plan.duration * 86400000);
    const expires = newExpiry.toISOString().split("T")[0];

    const updatedUser = {
      ...user,
      subscription: {
        status: "Active",
        expires,
        plan: planKey,
      },
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));
    if (loggedInUser?.email === user?.email) {
      localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));
    }

    setConfirmed(true);
    setTimeout(() => {
      navigate("/profile");
    }, 2000);
  };

  return (
    <>
      <TopNav />
      <div style={styles.container}>
        <h2>Checkout</h2>
        <div style={styles.card}>
          <p><strong>Plan:</strong> {plan.label}</p>
          <p><strong>Price:</strong> ${plan.price.toFixed(2)}</p>
          <ul style={styles.list}>
            {plan.benefits.map((b, i) => (
              <li key={i}>✔ {b}</li>
            ))}
          </ul>

          {!confirmed ? (
            <button onClick={handleConfirm} style={styles.button}>
              ✅ Confirm Payment (Simulated)
            </button>
          ) : (
            <p style={{ color: "green", fontWeight: "bold" }}>
              ✅ Subscription activated! Redirecting to profile...
            </p>
          )}
        </div>
      </div>
    </>
  );
}

// Styles with mobile responsiveness
const styles = {
  container: {
    maxWidth: "600px",
    margin: "2rem auto",
    padding: "1rem",
    backgroundColor: "#ffffff",
    color: "#000000",
    border: "1px solid #ccc",
    borderRadius: "10px",
    colorScheme: "light",
  },
  card: {
    padding: "1.5rem",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 0 5px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  list: {
    textAlign: "left",
    margin: "1rem auto",
    maxWidth: "90%",
  },
  button: {
    marginTop: "1rem",
    padding: "0.75rem 1.5rem",
    fontSize: "1rem",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Checkout;
