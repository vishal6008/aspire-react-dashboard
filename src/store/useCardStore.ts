/**
 * store/useCardStore.ts
 *
 * Global state management using Zustand.
 * All async actions call the API layer; UI never talks to localStorage directly.
 */

import { create } from 'zustand';
import type { Card, CardsState, Toast, ToastVariant } from '../types/index';
import {
  fetchCards,
  createCard,
  toggleFreezeCard,
} from '../api';
import { generateId } from '../utils/index';

// ─── Extended store interface ─────────────────────────────────────────────────

interface CardStore extends CardsState {
  toasts: Toast[];

  // Actions
  loadCards: () => Promise<void>;
  addCard: (name: string) => Promise<void>;
  freezeCard: (cardId: string) => Promise<void>;
  setActiveCardIndex: (index: number) => void;
  setActiveTab: (tab: 'my' | 'company') => void;
  openModal: () => void;
  closeModal: () => void;

  // Toast actions
  addToast: (message: string, variant?: ToastVariant) => void;
  removeToast: (id: string) => void;
}

// ─── Store ────────────────────────────────────────────────────────────────────

export const useCardStore = create<CardStore>((set, get) => ({
  // ── Initial state ──
  cards: [],
  activeCardIndex: 0,
  activeTab: 'my',
  isModalOpen: false,
  isLoading: false,
  toasts: [],

  // ── Load cards from API ──
  loadCards: async () => {
    set({ isLoading: true });
    const response = await fetchCards();
    if (response.success) {
      set({ cards: response.data, isLoading: false });
    } else {
      set({ isLoading: false });
      get().addToast('Failed to load cards.', 'error');
    }
  },

  // ── Add a new card ──
  addCard: async (name: string) => {
    set({ isLoading: true });
    const response = await createCard({ name });
    if (response.success) {
      const updatedCards: Card[] = [...get().cards, response.data];
      set({
        cards: updatedCards,
        activeCardIndex: updatedCards.length - 1,
        isModalOpen: false,
        isLoading: false,
      });
      get().addToast(`Card for "${response.data.name}" added!`, 'success');
    } else {
      set({ isLoading: false });
      get().addToast('Failed to add card.', 'error');
    }
  },

  // ── Freeze / Unfreeze ──
  freezeCard: async (cardId: string) => {
    const response = await toggleFreezeCard(cardId);
    if (response.success) {
      set((state) => ({
        cards: state.cards.map((c) =>
          c.id === cardId ? { ...c, frozen: response.data.frozen } : c
        ),
      }));
      const status = response.data.frozen ? 'frozen' : 'unfrozen';
      get().addToast(`Card has been ${status}.`, 'success');
    } else {
      get().addToast('Action failed. Please try again.', 'error');
    }
  },

  // ── Navigation ──
  setActiveCardIndex: (index: number) => set({ activeCardIndex: index }),
  setActiveTab: (tab) => set({ activeTab: tab }),

  // ── Modal ──
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),

  // ── Toasts ──
  addToast: (message, variant = 'success') => {
    const toast: Toast = { id: generateId('toast'), message, variant };
    set((state) => ({ toasts: [...state.toasts, toast] }));
    // Auto-dismiss after 3s
    setTimeout(() => get().removeToast(toast.id), 3000);
  },
  removeToast: (id) =>
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
}));