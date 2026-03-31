import React from 'react';
import type { Card } from '../../types';
import { maskCardNumber } from '../../utils';
import styles from './DebitCard.module.css';

interface DebitCardProps {
  card: Card;
  onClick?: () => void;
}

const DebitCard: React.FC<DebitCardProps> = ({ card, onClick }) => {
  return (
    <div
      className={`${styles.card} ${card.frozen ? styles.cardFrozen : ''}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick?.()}
      aria-label={`Card for ${card.name}${card.frozen ? ', frozen' : ''}`}
    >
      {card.frozen && (
        <span className={styles.frozenBadge} aria-hidden="true">
          Frozen
        </span>
      )}

      {/* Top row: name + logo */}
      <div className={styles.top}>
        <span className={styles.name}>{card.name}</span>
        <span className={styles.logo}>aspire</span>
      </div>

      {/* Masked number */}
      <div className={styles.number}>{maskCardNumber(card.number)}</div>

      {/* Bottom row: meta + network */}
      <div className={styles.bottom}>
        <div className={styles.meta}>
          <div className={styles.metaGroup}>
            <span className={styles.metaLabel}>Thru</span>
            <span className={styles.metaValue}>{card.expiry}</span>
          </div>
          <div className={styles.metaGroup}>
            <span className={styles.metaLabel}>CVV</span>
            <span className={styles.metaValue}>•••</span>
          </div>
        </div>
        <div className={styles.network} aria-label="Mastercard">
          <div className={`${styles.circle} ${styles.circleRed}`} />
          <div className={`${styles.circle} ${styles.circleOrange}`} />
        </div>
      </div>
    </div>
  );
};

export default DebitCard;