// ─── Card ────────────────────────────────────────────────────────────────────

export interface Card {
  id: string;
  name: string;
  /** Full 16-digit number, e.g. "4111 1111 1111 1234" */
  number: string;
  /** "MM/YY" */
  expiry: string;
  frozen: boolean;
}

export type NewCardInput = Pick<Card, 'name'>;

// ─── Transaction ─────────────────────────────────────────────────────────────

export type TransactionType = 'debit' | 'credit';
export type TransactionCategory = 'shopping' | 'travel' | 'food' | 'tech';

export interface Transaction {
  id: string;
  merchant: string;
  date: string;
  amount: number;
  type: TransactionType;
  category: TransactionCategory;
  cardId: string;
}

// ─── API response shape ───────────────────────────────────────────────────────

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

// ─── Store state ──────────────────────────────────────────────────────────────

export interface CardsState {
  cards: Card[];
  activeCardIndex: number;
  activeTab: 'my' | 'company';
  isModalOpen: boolean;
  isLoading: boolean;
}

// ─── Toast ───────────────────────────────────────────────────────────────────

export type ToastVariant = 'success' | 'error' | 'info';

export interface Toast {
  id: string;
  message: string;
  variant: ToastVariant;
}