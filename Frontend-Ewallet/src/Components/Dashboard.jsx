import { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import TransfererPopup from "./transferer-popup";
import RechargerPopup from "./recharger-popup";
import DemanderPopup from "./demander-popup";

export default function Dashboard({ user, onLogout, onUpdateUser }) {
  const [activePopup, setActivePopup] = useState("");

  if (!user) {
    return null;
  }

  const transactions = user.wallet.transactions || [];
  const cards = user.wallet.cards || [];

  function closePopup() {
    setActivePopup("");
  }

  function applyWalletUpdate(nextWallet) {
    const updatedUser = {
      ...user,
      wallet: nextWallet,
    };

    if (typeof onUpdateUser === "function") {
      onUpdateUser(updatedUser);
    }
  }

  function buildTransaction(type, amount, extra = {}) {
    return {
      id: `tx-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      type,
      amount,
      date: new Date().toLocaleDateString("fr-FR"),
      state: type === "request" ? "pending" : "success",
      ...extra,
    };
  }

  function handleTransferSubmit(payload) {
    if (payload.amount > user.wallet.balance) {
      alert("Solde insuffisant.");
      return;
    }

    const transaction = buildTransaction("debit", payload.amount, {
      from: user.account || user.name,
      to: payload.beneficiaryAccount,
      sourceCard: payload.sourceCard,
    });

    applyWalletUpdate({
      ...user.wallet,
      balance: Number((user.wallet.balance - payload.amount).toFixed(2)),
      transactions: [transaction, ...transactions],
    });

    closePopup();
    alert("Transfert effectué avec succès.");
  }

  function handleRechargeSubmit(payload) {
    const transaction = buildTransaction("recharge", payload.amount, {
      from: payload.sourceCard,
      to: user.account || user.name,
      sourceCard: payload.sourceCard,
    });

    applyWalletUpdate({
      ...user.wallet,
      balance: Number((user.wallet.balance + payload.amount).toFixed(2)),
      transactions: [transaction, ...transactions],
    });

    closePopup();
    alert("Recharge effectuée avec succès.");
  }

  function handleRequestSubmit(payload) {
    const transaction = buildTransaction("request", payload.amount, {
      from: user.account || user.name,
      to: payload.beneficiaryAccount,
      message: payload.message,
    });

    applyWalletUpdate({
      ...user.wallet,
      transactions: [transaction, ...transactions],
    });

    closePopup();
    alert("Demande envoyée avec succès.");
  }

  return (
    <>
      <Header />
      <main className="dashboard-main">
        <div className="dashboard-container">
          <aside className="dashboard-sidebar">
            <nav className="sidebar-nav">
              <ul>
                <li className="active">
                  <a href="#overview">
                    <i className="fas fa-home"></i>
                    <span>Vue d'ensemble</span>
                  </a>
                </li>
                <li>
                  <a href="#transactions">
                    <i className="fas fa-exchange-alt"></i>
                    <span>Transactions</span>
                  </a>
                </li>
                <li>
                  <a href="#cards">
                    <i className="fas fa-credit-card"></i>
                    <span>Mes cartes</span>
                  </a>
                </li>
                <li>
                  <a href="#transfers">
                    <i className="fas fa-paper-plane"></i>
                    <span>Transferts</span>
                  </a>
                </li>
                <li className="separator"></li>
                <li>
                  <a href="#support">
                    <i className="fas fa-headset"></i>
                    <span>Aide & Support</span>
                  </a>
                </li>
              </ul>
            </nav>
          </aside>

          <div className="dashboard-content">
            <section id="overview" className="dashboard-section active">
              <div className="section-header">
                <h2>Bonjour, <span>{user.name}</span> !</h2>
                <p className="date-display">{new Date().toLocaleDateString("fr-FR")}</p>
              </div>

              <div className="summary-cards">
                <div className="summary-card">
                  <div className="card-icon blue">
                    <i className="fas fa-wallet"></i>
                  </div>
                  <div className="card-details">
                    <span className="card-label">Solde disponible</span>
                    <span className="card-value">{user.wallet.balance} {user.wallet.currency}</span>
                  </div>
                </div>

                <div className="summary-card">
                  <div className="card-icon green">
                    <i className="fas fa-arrow-up"></i>
                  </div>
                  <div className="card-details">
                    <span className="card-label">Revenus</span>
                    <span className="card-value">
                      {transactions
                        .filter((t) => t.type === "credit" || t.type === "recharge")
                        .reduce((total, t) => total + t.amount, 0)} MAD
                    </span>
                  </div>
                </div>

                <div className="summary-card">
                  <div className="card-icon red">
                    <i className="fas fa-arrow-down"></i>
                  </div>
                  <div className="card-details">
                    <span className="card-label">Dépenses</span>
                    <span className="card-value">
                      {transactions
                        .filter((t) => t.type === "debit")
                        .reduce((total, t) => total + t.amount, 0)} MAD
                    </span>
                  </div>
                </div>

                <div className="summary-card">
                  <div className="card-icon purple">
                    <i className="fas fa-credit-card"></i>
                  </div>
                  <div className="card-details">
                    <span className="card-label">Cartes actives</span>
                    <span className="card-value">{cards.length}</span>
                  </div>
                </div>
              </div>

              <div className="quick-actions">
                <h3>Actions rapides</h3>
                <div className="action-buttons">
                  <button className="action-btn" type="button" onClick={() => setActivePopup("transfer")}> 
                    <i className="fas fa-paper-plane"></i>
                    <span>Transférer</span>
                  </button>
                  <button className="action-btn" type="button" onClick={() => setActivePopup("recharge")}> 
                    <i className="fas fa-plus-circle"></i>
                    <span>Recharger</span>
                  </button>
                  <button className="action-btn" type="button" onClick={() => setActivePopup("request")}> 
                    <i className="fas fa-hand-holding-usd"></i>
                    <span>Demander</span>
                  </button>
                  <button className="action-btn" type="button" onClick={onLogout}>
                    <i className="fas fa-sign-out-alt"></i>
                    <span>Déconnecter</span>
                  </button>
                </div>
              </div>

              <div className="recent-transactions">
                <div className="section-header">
                  <h3>Transactions récentes</h3>
                </div>
                <div className="transactions-list">
                  {transactions.map((transaction) => (
                    <div className="transaction-item" key={transaction.id}>
                      <div>{transaction.date}</div>
                      <div>{transaction.amount} MAD</div>
                      <div>{transaction.type}</div>
                      <div>{transaction.state}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section id="cards" className="dashboard-section">
              <div className="section-header">
                <h2>Mes cartes</h2>
                <button className="btn btn-secondary" type="button">
                  <i className="fas fa-plus"></i> Ajouter une carte
                </button>
              </div>

              <div className="cards-grid">
                {cards.map((card) => (
                  <div className="card-item" key={card.numcards}>
                    <div className={`card-preview ${card.type}`}>
                      <div className="card-chip"></div>
                      <div className="card-number">{card.numcards}</div>
                      <div className="card-holder">{user.name}</div>
                      <div className="card-expiry">{card.expiry}</div>
                      <div className="card-type">{card.type}</div>
                    </div>
                    <div className="card-actions">
                      <button className="card-action" title="Définir par défaut" type="button">
                        <i className="fas fa-star"></i>
                      </button>
                      <button className="card-action" title="Geler la carte" type="button">
                        <i className="fas fa-snowflake"></i>
                      </button>
                      <button className="card-action" title="Supprimer" type="button">
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>

      {activePopup === "transfer" && (
        <TransfererPopup
          user={user}
          onClose={closePopup}
          onSubmit={handleTransferSubmit}
        />
      )}

      {activePopup === "recharge" && (
        <RechargerPopup
          user={user}
          onClose={closePopup}
          onSubmit={handleRechargeSubmit}
        />
      )}

      {activePopup === "request" && (
        <DemanderPopup
          user={user}
          onClose={closePopup}
          onSubmit={handleRequestSubmit}
        />
      )}

      <Footer />
    </>
  );
}