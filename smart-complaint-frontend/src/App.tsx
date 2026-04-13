import { useState } from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";

function App() {
  const [page, setPage] = useState("login");

  if (window.location.pathname === "/dashboard") {
    return <Dashboard />;
  }

  return page === "login" ? (
    <Login switchToSignup={() => setPage("signup")} />
  ) : (
    <Signup switchToLogin={() => setPage("login")} />
  );
}

export default App;