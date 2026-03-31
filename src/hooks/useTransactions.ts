/**
 * hooks/useTransactions.ts
 *
 * Fetches and caches transactions for the currently active card.
 */

import { useState, useEffect } from 'react';
import type { Transaction } from '../types';
import { fetchTransactionsByCard } from '../api/index';
import { useCardStore } from '../store/useCardStore';

interface UseTransactionsResult {
  transactions: Transaction[];
  isLoading: boolean;
}

export function useTransactions(): UseTransactionsResult {
  const { cards, activeCardIndex } = useCardStore();
  const activeCard = cards[activeCardIndex];

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!activeCard) return;

    let cancelled = false;
    setIsLoading(true);

    fetchTransactionsByCard(activeCard.id).then((response) => {
      if (!cancelled && response.success) {
        setTransactions(response.data);
      }
      if (!cancelled) setIsLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [activeCard?.id]);

  return { transactions, isLoading };
}