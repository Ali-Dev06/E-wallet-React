import { useState } from "react";
import { finduserbymail } from "../Model/database.js";
import Header from "./Header";
import Footer from "./Footer";

export default function Login({ onLoginSuccess }) {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit() {
    if (!mail || !password) {
      alert("Bad credentials.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const user = finduserbymail(mail, password);
      if (user) {
        sessionStorage.setItem("currentUser", JSON.stringify(user));
        onLoginSuccess(user); 
      } else {
        alert("Bad credentials.");
        setLoading(false);
      }
    }, 2000);
  }

  return (
    <>
      <Header />
      <main>
        <section className="hero">
          <div className="hero-content">
            <h1>Connexion</h1>
            <p>Accédez à votre E-Wallet en toute sécurité.</p>
            <div className="login-form">
              <div className="input-group">
                <input
                  type="email"
                  placeholder="Adresse e-mail"
                  value={mail}
                  onChange={(e) => setMail(e.target.value)}
                />
              </div>
              <div className="input-group">
                <input
                  type="password"
                  placeholder="Mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Vérification..." : "Se connecter"}
              </button>
            </div>
          </div>
          <div className="hero-image">
            <img src="./src/assets/e-Wallet6.gif" alt="E-Wallet" />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}