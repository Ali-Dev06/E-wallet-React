import { useState } from "react";

export default function TransfererPopup({ user, onClose, onSubmit }) {
  const beneficiaries = user.wallet.beneficiaries || [];
  const cards = user.wallet.cards || [];
  const [form, setForm] = useState({
    beneficiaryAccount: beneficiaries[0]?.account || "",
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

    const beneficiary = beneficiaries.find((b) => b.account === form.beneficiaryAccount);
    if (!beneficiary) {
      alert("Bénéficiaire invalide.");
      return;
    }

    if (!form.sourceCard) {
      alert("Veuillez sélectionner une carte source.");
      return;
    }

    onSubmit({
      amount,
      beneficiaryAccount: beneficiary.account,
      beneficiaryName: beneficiary.name,
      sourceCard: form.sourceCard,
    });
  }

  return (
    <div className="popup-overlay active" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <div className="popup-header">
          <h2>Effectuer un transfert</h2>
          <button className="btn-close" type="button" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="popup-body">
          <p className="popup-balance">
            Solde disponible: <strong>{user.wallet.balance} {user.wallet.currency}</strong>
          </p>

          <form className="transfer-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="transfer-beneficiary">
                <i className="fas fa-user"></i> Bénéficiaire
              </label>
              <select
                id="transfer-beneficiary"
                name="beneficiary"
                required
                value={form.beneficiaryAccount}
                onChange={(e) => setForm({ ...form, beneficiaryAccount: e.target.value })}
              >
                {beneficiaries.length === 0 && <option value="">Aucun bénéficiaire</option>}
                {beneficiaries.map((b) => (
                  <option key={b.id} value={b.account}>
                    {b.name} - {b.account}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="transfer-card">
                <i className="fas fa-credit-card"></i> Depuis ma carte
              </label>
              <select
                id="transfer-card"
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
              <label htmlFor="transfer-amount">Montant</label>
              <div className="amount-input">
                <input
                  type="number"
                  id="transfer-amount"
                  name="amount"
                  min="1"
                  step="0.01"
                  placeholder="0.00"
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
                <i className="fas fa-paper-plane"></i> Transférer
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
