import { useState } from "react";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import "./App.css";

function App() {
  const [currentPage, setCurrentPage] = useState("login");
  const [currentUser, setCurrentUser] = useState(null);

  function handleLoginSuccess(user) {
    setCurrentUser(user);
    setCurrentPage("dashboard");
  }

  function handleLogout() {
    setCurrentUser(null);
    setCurrentPage("login");
  }

  if (currentPage === "dashboard") {
    return <Dashboard user={currentUser} onLogout={handleLogout} />;
  }

  return <Login onLoginSuccess={handleLoginSuccess} />;
}

export default App;