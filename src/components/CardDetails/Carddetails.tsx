import React, { useState } from 'react';
import type { Transaction, TransactionCategory } from '../../types';
import { useTransactions } from '../../hooks/useTransactions';
import { formatCurrency } from '../../utils';
import {
  IconShopping,
  IconTravel,
  IconFood,
  IconTech,
  IconCardSmall,
} from '../../assets/icons';
import styles from './CardDetails.module.css';
import IconCardDetail from '../../assets/group_10889.svg';
import IconTransactions from '../../assets/group_11889.svg';
import IconChevronDown from '../../assets/down-arrow.svg';

const CATEGORY_ICON: Record<TransactionCategory, React.ReactNode> = {
  shopping: <IconShopping />,
  travel:   <IconTravel />,
  food:     <IconFood />,
  tech:     <IconTech />,
};

const CATEGORY_BG: Record<TransactionCategory, string> = {
  shopping: styles.iconPurple,
  travel:   styles.iconBlue,
  food:     styles.iconRed,
  tech:     styles.iconGreen,
};

interface TxnRowProps { transaction: Transaction; }

const TxnRow: React.FC<TxnRowProps> = ({ transaction }) => {
  const isCredit = transaction.type === 'credit';
  return (
    <div className={styles.txnRow}>
      <div className={`${styles.txnIcon} ${CATEGORY_BG[transaction.category]}`}>
        {CATEGORY_ICON[transaction.category]}
      </div>
      <div className={styles.txnInfo}>
        <div className={styles.txnMerchant}>{transaction.merchant}</div>
        <div className={styles.txnDate}>{transaction.date}</div>
        <div className={styles.txnTag}>
          <IconCardSmall />
          <span>{isCredit ? 'Refund on debit card' : 'Charged to debit card'}</span>
        </div>
      </div>
      <div className={`${styles.txnAmount} ${isCredit ? styles.txnCredit : styles.txnDebit}`}>
        {isCredit ? '+ ' : '- '}{formatCurrency(transaction.amount)}
      </div>
    </div>
  );
};

// ─── Main component ───────────────────────────────────────────────────────────

const CardDetails: React.FC = () => {
  const [expanded, setExpanded] = useState<string | null>('transactions');
  const { transactions, isLoading } = useTransactions();

  const toggle = (id: string) =>
    setExpanded((prev) => (prev === id ? null : id));

  return (
    <div className={styles.section}>

      {/* ── Card details row ── */}
      <button
        className={styles.accordionRow}
        onClick={() => toggle('details')}
        aria-expanded={expanded === 'details'}
      >
        <div className={styles.iconWrap}><img src={IconCardDetail} alt="IconCardDetail logo" /></div>
        <span className={styles.rowLabel}>Card details</span>
        <span className={`${styles.chevron} ${expanded === 'details' ? styles.chevronOpen : ''}`}>
          <img src={IconChevronDown} alt="IconChevronDown logo" />
        </span>
      </button>

      {/* ── Recent transactions row ── */}
      <button
        className={styles.accordionRow}
        onClick={() => toggle('transactions')}
        aria-expanded={expanded === 'transactions'}
      >
        <div className={styles.iconWrap}><img src={IconTransactions} alt="IconTransactions logo" /></div>
        <span className={styles.rowLabel}>Recent transactions</span>
        <span className={`${styles.chevron} ${expanded === 'transactions' ? styles.chevronOpen : ''}`}>
          <img src={IconChevronDown} alt="IconChevronDown logo" />
        </span>
      </button>

      {/* ── Inline transaction list (expands under the row) ── */}
      {expanded === 'transactions' && (
        <div className={styles.txnPanel}>
          {isLoading ? (
            <div className={styles.txnEmpty}>Loading…</div>
          ) : transactions.length === 0 ? (
            <div className={styles.txnEmpty}>No transactions for this card yet.</div>
          ) : (
            <>
              {transactions.map((t) => (
                <TxnRow key={t.id} transaction={t} />
              ))}
              <button className={styles.viewAll}>View all card transactions</button>
            </>
          )}
        </div>
      )}

    </div>
  );
};

export default CardDetails;