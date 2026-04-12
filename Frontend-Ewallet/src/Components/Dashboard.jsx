import Header from "./Header"
import Footer from "./Footer"
export default function Dashboard(){
return(
<>
<Header/>    
  <main class="dashboard-main">
    <div class="dashboard-container">
      
      <aside class="dashboard-sidebar">
        <nav class="sidebar-nav">
          <ul>
            <li class="active">
              <a href="#overview">
                <i class="fas fa-home"></i>
                <span>Vue d'ensemble</span>
              </a>
            </li>
            <li>
              <a href="#transactions">
                <i class="fas fa-exchange-alt"></i>
                <span>Transactions</span>
              </a>
            </li>
            <li>
              <a href="#cards">
                <i class="fas fa-credit-card"></i>
                <span>Mes cartes</span>
              </a>
            </li>
            <li>
              <a href="#transfers">
                <i class="fas fa-paper-plane"></i>
                <span>Transferts</span>
              </a>
            </li>
            <li class="separator"></li>
            <li>
              <a href="#support">
                <i class="fas fa-headset"></i>
                <span>Aide & Support</span>
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      <div class="dashboard-content">
        
        <section id="overview" class="dashboard-section active">
          <div class="section-header">
            <h2>Bonjour, <span id="greetingName">?</span> !</h2>
            <p class="date-display" id="currentDate"></p>
          </div>

          <div class="summary-cards">
            <div class="summary-card">
              <div class="card-icon blue">
                <i class="fas fa-wallet"></i>
              </div>
              <div class="card-details">
                <span class="card-label">Solde disponible</span>
                <span class="card-value" id="availableBalance">?</span>
              </div>
            </div>

            <div class="summary-card">
              <div class="card-icon green">
                <i class="fas fa-arrow-up"></i>
              </div>
              <div class="card-details">
                <span class="card-label">Revenus</span>
                <span class="card-value" id="monthlyIncome">?</span>
              </div>
            </div>

            <div class="summary-card">
              <div class="card-icon red">
                <i class="fas fa-arrow-down"></i>
              </div>
              <div class="card-details">
                <span class="card-label">Dépenses</span>
                <span class="card-value" id="monthlyExpenses">?</span>
              </div>
            </div>

            <div class="summary-card">
              <div class="card-icon purple">
                <i class="fas fa-credit-card"></i>
              </div>
              <div class="card-details">
                <span class="card-label">Cartes actives</span>
                <span class="card-value" id="activeCards">?</span>
              </div>
            </div>
          </div>

          <div class="quick-actions">
            <h3>Actions rapides</h3>
            <div class="action-buttons">
              <button class="action-btn" id="quickTransfer" type="button">
                <i class="fas fa-paper-plane"></i>
                <span>Transférer</span>
              </button>
              <button class="action-btn" id="quickTopup" type="button">
                <i class="fas fa-plus-circle"></i>
                <span>Recharger</span>
              </button>
              <button class="action-btn" id="quickRequest" type="button">
                <i class="fas fa-hand-holding-usd"></i>
                <span>Demander</span>
              </button>
            </div>
          </div>
          
          <div class="recent-transactions">
            <div class="section-header">
              <h3>Transactions récentes</h3>
            </div>
            <div class="transactions-list" id="recentTransactionsList"></div>
          </div>
        </section>

        <section id="cards" class="dashboard-section">
          <div class="section-header">
            <h2>Mes cartes</h2>
            <button class="btn btn-secondary" id="addCardBtn" type="button">
              <i class="fas fa-plus"></i> Ajouter une carte
            </button>
          </div>
          
          <div class="cards-grid" id="cardsGrid">
            <div class="card-item">
              <div class="card-preview visa">
                <div class="card-chip"></div>
                <div class="card-number">?</div>
                <div class="card-holder">?</div>
                <div class="card-expiry">?</div>
                <div class="card-type">?</div>
              </div>
              <div class="card-actions">
                <button class="card-action" title="Définir par défaut" type="button">
                  <i class="fas fa-star"></i>
                </button>
                <button class="card-action" title="Geler la carte" type="button">
                  <i class="fas fa-snowflake"></i>
                </button>
                <button class="card-action" title="Supprimer" type="button">
                  <i class="fas fa-trash"></i>
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </main>
  <Footer/>
</>
)
}