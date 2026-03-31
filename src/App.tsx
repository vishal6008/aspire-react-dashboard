import React, { useEffect } from 'react';
import { useCardStore } from './store/useCardStore';
import Sidebar      from './components/Sidebar/Sidebar';
import CardCarousel from './components/CardCarousel/CardCarousel';
import CardActions  from './components/CardActions/CardActions';
import CardDetails  from './components/CardDetails/Carddetails';
import Modal        from './components/AddCardModal/AddCardModal';
import Toast        from './components/Toast/ToastContainer';
import IconPlus from './assets/icon_plus.svg';
import styles from './App.module.css';

const App: React.FC = () => {
  const { loadCards, activeTab, setActiveTab, openModal } = useCardStore();

  useEffect(() => {
    loadCards();
  }, [loadCards]);

  return (
    <div className={styles.shell}>
      <Sidebar />

      <main className={styles.main}>
        {/* ── Available balance ── */}
        <div className={styles.balanceRow}>
          <div className={styles.balanceInfo}>
            <div className={styles.balanceLabel}>Available balance</div>
            <div className={styles.balanceAmount}>
              <span className={styles.balanceBadge}>S$</span>
              <span className={styles.balanceValue}>3,000</span>
            </div>
          </div>
          <button className={styles.btnNewCard} onClick={openModal}>
            <img src={IconPlus} alt="IconPlus logo" />
            New card
          </button>
        </div>

        {/* ── Tab bar ── */}
        <div className={styles.tabBar} role="tablist">
          <button
            className={`${styles.tab} ${activeTab === 'my' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('my')}
            role="tab"
            aria-selected={activeTab === 'my'}
          >
            My debit cards
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'company' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('company')}
            role="tab"
            aria-selected={activeTab === 'company'}
          >
            All company cards
          </button>
        </div>

        {/* ── Card panel (grey container) ── */}
        <div className={styles.cardPanel}>
          <div className={styles.contentGrid}>
            {/* Left: show card number + carousel + actions */}
            <div className={styles.panelLeft}>
              <CardCarousel />
              <CardActions />
            </div>

            {/* Right: card details accordion + transactions */}
            <div className={styles.panelRight}>
              <CardDetails />
            </div>
          </div>
        </div>
      </main>

      <Modal />
      <Toast />
    </div>
  );
};

export default App;