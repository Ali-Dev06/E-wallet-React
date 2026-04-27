import { useState } from "react";

export default function RechargerPopup({ user, onClose, onSubmit }) {
  const cards = user.wallet.cards || [];
  const [form, setForm] = useState({
    sourceCard: cards[0]?.numcards || "",
    amount: "",
  });

  function handleSubmit(e) {
    e.preventDefault();

    const amount = Number.parseFloat(form.amount);
    if (!Number.isFinite(amount) || amount <= 0) {
      alert("Montant invalide.");
      return;
    }

    if (amount < 10 || amount > 5000) {
      alert("Le montant doit être entre 10 et 5000 MAD.");
      return;
    }

    if (!form.sourceCard) {
      alert("Veuillez sélectionner une carte.");
      return;
    }

    onSubmit({
      amount,
      sourceCard: form.sourceCard,
    });
  }

  return (
    <div className="popup-overlay active" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <div className="popup-header">
          <h2>Recharger le wallet</h2>
          <button className="btn-close" type="button" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="popup-body">
          <p className="popup-balance">
            Solde actuel: <strong>{user.wallet.balance} {user.wallet.currency}</strong>
          </p>

          <form className="transfer-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="recharge-card">
                <i className="fas fa-credit-card"></i> Carte source
              </label>
              <select
                id="recharge-card"
                name="sourceCard"
                required
                value={form.sourceCard}
                onChange={(e) => setForm({ ...form, sourceCard: e.target.value })}
              >
                {cards.length === 0 && <option value="">Aucune carte</option>}
                {cards.map((c) => (
                  <option key={c.numcards} value={c.numcards}>
                    {c.type.toUpperCase()} **** {c.numcards.slice(-4)}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="recharge-amount">Montant (MAD)</label>
              <div className="amount-input">
                <input
                  type="number"
                  id="recharge-amount"
                  name="amount"
                  min="10"
                  max="5000"
                  step="0.01"
                  placeholder="Min: 10 / Max: 5000"
                  required
                  value={form.amount}
                  onChange={(e) => setForm({ ...form, amount: e.target.value })}
                />
                <span className="currency">MAD</span>
              </div>
            </div>

            <div className="form-actions">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Annuler
              </button>
              <button type="submit" className="btn btn-primary">
                <i className="fas fa-plus-circle"></i> Recharger
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
