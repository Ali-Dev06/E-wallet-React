import { useState } from "react";

export default function DemanderPopup({ user, onClose, onSubmit }) {
  const beneficiaries = user.wallet.beneficiaries || [];
  const [form, setForm] = useState({
    beneficiaryAccount: beneficiaries[0]?.account || "",
    amount: "",
    message: "",
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

    onSubmit({
      amount,
      beneficiaryAccount: beneficiary.account,
      beneficiaryName: beneficiary.name,
      message: form.message.trim(),
    });
  }

  return (
    <div className="popup-overlay active" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <div className="popup-header">
          <h2>Demander de l'argent</h2>
          <button className="btn-close" type="button" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="popup-body">
          <form className="transfer-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="request-beneficiary">
                <i className="fas fa-user"></i> Demander à
              </label>
              <select
                id="request-beneficiary"
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
              <label htmlFor="request-amount">Montant (MAD)</label>
              <div className="amount-input">
                <input
                  type="number"
                  id="request-amount"
                  name="amount"
                  min="1"
                  step="0.01"
                  placeholder="Ex: 200"
                  required
                  value={form.amount}
                  onChange={(e) => setForm({ ...form, amount: e.target.value })}
                />
                <span className="currency">MAD</span>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="request-message">Message (optionnel)</label>
              <input
                type="text"
                id="request-message"
                name="message"
                placeholder="Ex: Pour le dîner d'hier"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
            </div>

            <div className="form-actions">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Annuler
              </button>
              <button type="submit" className="btn btn-primary">
                <i className="fas fa-hand-holding-usd"></i> Envoyer
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
