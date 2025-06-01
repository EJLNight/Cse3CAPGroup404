import { HashRouter, Routes, Route } from "react-router-dom";

// Import all page components
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import CreateSubAdmin from "./pages/CreateSubAdmin";
import AdminProfile from "./pages/AdminProfile";
import SubAdminProfile from "./pages/SubAdminProfile";
import UserProfile from "./pages/UserProfile";
import AdminQuestions from "./pages/AdminQuestions";
import AdminData from "./pages/AdminData";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";
import Subscribe from "./pages/Subscribe";
import Checkout from "./pages/Checkout";

// Automatically create default super admin if missing
const defaultAdmin = {
  username: "admin",
  email: "admin",
  password: "admin",
  role: "admin",
};

if (!localStorage.getItem("admin")) {
  localStorage.setItem("admin", JSON.stringify(defaultAdmin));
}

// Optional router to handle generic "/profile" fallback
function ProfileRouter() {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  if (!user) return <Login />;
  if (user.role === "admin") {
    return user.username === "admin"
      ? <AdminProfile />
      : <SubAdminProfile />;
  }
  return <UserProfile />;
}

function App() {
  return (
    <HashRouter>
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/subscribe" element={<Subscribe />} />
        <Route path="/checkout" element={<Checkout />} />

        {/* Quiz System */}
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/result" element={<Result />} />

        {/* Role-specific Profiles */}
        <Route path="/admin/profile" element={<AdminProfile />} />
        <Route path="/subadmin/profile" element={<SubAdminProfile />} />
        <Route path="/user/profile" element={<UserProfile />} />

        {/* Optional generic profile redirector */}
        <Route path="/profile" element={<ProfileRouter />} />

        {/* Admin Features */}
        <Route path="/create-admin" element={<CreateSubAdmin />} />
        <Route path="/admin/questions" element={<AdminQuestions />} />
        <Route path="/admin/data" element={<AdminData />} />

      </Routes>
    </HashRouter>
  );
}

export default App;
