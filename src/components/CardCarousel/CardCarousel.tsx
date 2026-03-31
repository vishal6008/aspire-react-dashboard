import React, { useRef, useCallback, useState, useEffect } from 'react';
import type { Card } from '../../types';
import { useCardStore } from '../../store/useCardStore';
import styles from './CardCarousel.module.css';
import {
  IconHome
} from '../../assets/icons';
import IconVisa from '../../assets/visa_logo.svg';

const CARD_WIDTH = 404; // card width (380) + gap (24)

// ─── Eye icon ────────────────────────────────────────────────────────────────
const EyeIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#01D167" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

// ─── Single card render (no show/hide logic here) ─────────────────────────────
interface CardSlideProps {
  card: Card;
  showNumber: boolean;
}

const CardSlide: React.FC<CardSlideProps> = ({ card, showNumber }) => {
  const formattedNumber = showNumber
    ? card.number
    : '●●●●  ●●●●  ●●●●  ' + card.number.split(' ')[3];

  return (
    <div
      className={`${styles.card} ${card.frozen ? styles.cardFrozen : ''}`}
      aria-label={`Card for ${card.name}${card.frozen ? ', frozen' : ''}`}
    >
      {card.frozen && <span className={styles.frozenBadge}>Frozen</span>}

      <div className={styles.cardTop}>
        <div className={styles.aspireLogoWrap}>
          <IconHome />
          <span className={styles.aspireText}>aspire</span>
        </div>
      </div>

      {/* Card holder name */}
      <div className={styles.cardName}>{card.name}</div>

      {/* Number */}
      <div className={styles.cardNumber}>{formattedNumber}</div>

      {/* Bottom row */}
      <div className={styles.cardBottom}>
        <div className={styles.cardMeta}>
          <span className={styles.cardMetaItem}>Thru: <strong>{card.expiry}</strong></span>
          <span className={styles.cardMetaItem}>CVV: <strong>★ ★ ★</strong></span>
        </div>
        <span className={styles.visaText}><img src={IconVisa} alt="IconVisa logo" /></span>
      </div>
    </div>
  );
};

// ─── Carousel ─────────────────────────────────────────────────────────────────
const CardCarousel: React.FC = () => {
  const { cards, activeCardIndex, setActiveCardIndex } = useCardStore();
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [showNumber, setShowNumber] = useState(false);
  const prevCardLength = useRef(cards.length);

  useEffect(() => {
  const interval = setInterval(() => {
    if (!trackRef.current || cards.length === 0) return;

    const nextIndex = (activeCardIndex + 1) % cards.length;

    trackRef.current.scrollTo({
      left: nextIndex * CARD_WIDTH,
      behavior: "smooth",
    });

    setActiveCardIndex(nextIndex);
    setShowNumber(false);
  }, 5000); // change slide every 5 sec

  return () => clearInterval(interval);
}, [activeCardIndex, cards.length, setActiveCardIndex]);

useEffect(() => {
  if (cards.length > prevCardLength.current) {
    const newIndex = cards.length - 1;

    setActiveCardIndex(newIndex);

    trackRef.current?.scrollTo({
      left: newIndex * CARD_WIDTH,
      behavior: "smooth",
    });
  }

  prevCardLength.current = cards.length;
}, [cards.length, setActiveCardIndex]);

  const handleScroll = useCallback(() => {
    if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
    scrollTimerRef.current = setTimeout(() => {
      if (!trackRef.current) return;
      const idx = Math.round(trackRef.current.scrollLeft / CARD_WIDTH);
      const clamped = Math.max(0, Math.min(idx, cards.length - 1));
      if (clamped !== activeCardIndex) {
        setActiveCardIndex(clamped);
        setShowNumber(false); // reset on card change
      }
    }, 80);
  }, [activeCardIndex, cards.length, setActiveCardIndex]);

  const handleDotClick = useCallback((index: number) => {
    setActiveCardIndex(index);
    setShowNumber(false);
    trackRef.current?.scrollTo({ left: index * CARD_WIDTH, behavior: 'smooth' });
  }, [setActiveCardIndex]);

  return (
    <div className={styles.wrapper}>
      {/* Show/hide number toggle — always above the visible card */}
      <div className={styles.showNumberRow}>
        <button
          className={styles.showNumberBtn}
          onClick={() => setShowNumber((v) => !v)}
        >
          <EyeIcon />
          {showNumber ? 'Hide card number' : 'Show card number'}
        </button>
      </div>

      {/* Scrollable track */}
      <div
        className={styles.track}
        ref={trackRef}
        onScroll={handleScroll}
        aria-label="Card carousel"
      >
        {cards.map((card) => (
          <CardSlide key={card.id} card={card} showNumber={showNumber} />
        ))}
      </div>

      {/* Dot indicators */}
      <div className={styles.dots} role="tablist" aria-label="Select card">
        {cards.map((card, index) => (
          <button
            key={card.id}
            className={`${styles.dot} ${index === activeCardIndex ? styles.dotActive : ''}`}
            onClick={() => handleDotClick(index)}
            role="tab"
            aria-selected={index === activeCardIndex}
            aria-label={`Card ${index + 1}: ${card.name}`}
          />
        ))}
      </div>
    </div>
  );
};

export default CardCarousel;