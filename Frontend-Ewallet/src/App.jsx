import { useState } from "react";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import "./App.css";

function getStoredUser() {
  try {
    const rawUser = sessionStorage.getItem("currentUser");
    return rawUser ? JSON.parse(rawUser) : null;
  } catch {
    return null;
  }
}

function App() {
  const [currentUser, setCurrentUser] = useState(getStoredUser);
  const [currentPage, setCurrentPage] = useState(currentUser ? "dashboard" : "login");

  function handleLoginSuccess(user) {
    setCurrentUser(user);
    sessionStorage.setItem("currentUser", JSON.stringify(user));
    setCurrentPage("dashboard");
  }

  function handleUserUpdate(updatedUser) {
    setCurrentUser(updatedUser);
    sessionStorage.setItem("currentUser", JSON.stringify(updatedUser));
  }

  function handleLogout() {
    sessionStorage.removeItem("currentUser");
    setCurrentUser(null);
    setCurrentPage("login");
  }

  if (currentPage === "dashboard") {
    return (
      <Dashboard
        user={currentUser}
        onLogout={handleLogout}
        onUpdateUser={handleUserUpdate}
      />
    );
  }

  return <Login onLoginSuccess={handleLoginSuccess} />;
}

export default App;