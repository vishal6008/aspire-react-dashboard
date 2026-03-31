/**
 * api/index.ts
 *
 * Simulates an API layer. All functions are async to mirror real HTTP calls.
 * Data is persisted to localStorage so state survives page refresh.
 * No real server-side code required.
 */

import type { ApiResponse, Card, NewCardInput, Transaction } from '../types';
import { generateCardNumber, generateExpiry, generateId } from '../utils';

// ─── Storage key ─────────────────────────────────────────────────────────────

const STORAGE_KEY = 'aspire_cards_v1';

// ─── Seed data ────────────────────────────────────────────────────────────────

const SEED_CARDS: Card[] = [
  {
    id: 'card_001',
    name: 'Mark Henry',
    number: '4111 1111 1111 1234',
    expiry: '12/25',
    frozen: false,
  },
  {
    id: 'card_002',
    name: 'Sarah Chen',
    number: '5200 8282 8282 8210',
    expiry: '08/26',
    frozen: false,
  },
  {
    id: 'card_003',
    name: 'Alex Rivera',
    number: '3782 8224 6310 0054',
    expiry: '03/27',
    frozen: false,
  },
];

export const SEED_TRANSACTIONS: Transaction[] = [
  { id: 't1', merchant: 'Hamleys',         date: '20 May 2020', amount: 150,   type: 'debit',  category: 'shopping', cardId: 'card_001' },
  { id: 't2', merchant: 'Spotify',          date: '18 May 2020', amount: 9.99,  type: 'debit',  category: 'tech',     cardId: 'card_001' },
  { id: 't3', merchant: 'Refund – Amazon',  date: '15 May 2020', amount: 45.50, type: 'credit', category: 'shopping', cardId: 'card_001' },
  { id: 't4', merchant: 'Grab',             date: '12 May 2020', amount: 12,    type: 'debit',  category: 'travel',   cardId: 'card_001' },
  { id: 't5', merchant: 'Netflix',          date: '10 May 2020', amount: 15.99, type: 'debit',  category: 'tech',     cardId: 'card_002' },
  { id: 't6', merchant: 'Starbucks',        date: '9 May 2020',  amount: 6.50,  type: 'debit',  category: 'food',     cardId: 'card_002' },
  { id: 't7', merchant: 'Shopee',           date: '7 May 2020',  amount: 88,    type: 'debit',  category: 'shopping', cardId: 'card_003' },
  { id: 't8', merchant: 'ComfortDelGro',    date: '5 May 2020',  amount: 14,    type: 'debit',  category: 'travel',   cardId: 'card_003' },
];

// ─── Persistence helpers ──────────────────────────────────────────────────────

function readStorage(): Card[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as Card[];
  } catch {
    // corrupted storage – fall through to seed
  }
  return [];
}

function writeStorage(cards: Card[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
  } catch {
    console.warn('[API] localStorage write failed');
  }
}

// ─── Simulated network delay ──────────────────────────────────────────────────

function delay(ms = 120): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ─── API functions ────────────────────────────────────────────────────────────

/**
 * Fetches all cards. Seeds localStorage on first run.
 */
export async function fetchCards(): Promise<ApiResponse<Card[]>> {
  await delay();
  let cards = readStorage();
  if (cards.length === 0) {
    cards = SEED_CARDS;
    writeStorage(cards);
  }
  return { data: cards, success: true };
}

/**
 * Creates a new card with a randomly generated number and expiry.
 */
export async function createCard(
  input: NewCardInput
): Promise<ApiResponse<Card>> {
  await delay();
  const card: Card = {
    id: generateId('card'),
    name: input.name.trim(),
    number: generateCardNumber(),
    expiry: generateExpiry(),
    frozen: false,
  };
  const cards = readStorage();
  cards.push(card);
  writeStorage(cards);
  return { data: card, success: true, message: 'Card created successfully.' };
}

/**
 * Toggles the frozen state of a card.
 */
export async function toggleFreezeCard(
  cardId: string
): Promise<ApiResponse<Card>> {
  await delay();
  const cards = readStorage();
  const index = cards.findIndex((c) => c.id === cardId);
  if (index === -1) {
    return { data: {} as Card, success: false, message: 'Card not found.' };
  }
  cards[index] = { ...cards[index], frozen: !cards[index].frozen };
  writeStorage(cards);
  return { data: cards[index], success: true };
}

/**
 * Fetches transactions for a specific card.
 */
export async function fetchTransactionsByCard(
  cardId: string
): Promise<ApiResponse<Transaction[]>> {
  await delay();
  const transactions = SEED_TRANSACTIONS.filter((t) => t.cardId === cardId);
  return { data: transactions, success: true };
}