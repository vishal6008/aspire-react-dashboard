import React from 'react';
import { useCardStore } from '../../store/useCardStore';
import { IconCheckCircle } from '../../assets/icons';
import type { ToastVariant } from '../../types';
import styles from './Toast.module.css';

const VARIANT_CLASS: Record<ToastVariant, string> = {
  success: styles.toastSuccess,
  error:   styles.toastError,
  info:    styles.toastInfo,
};

const Toast: React.FC = () => {
  const { toasts, removeToast } = useCardStore();

  if (toasts.length === 0) return null;

  return (
    <div className={styles.container} aria-live="polite" aria-atomic="false">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`${styles.toast} ${VARIANT_CLASS[toast.variant]}`}
          role="status"
        >
          <span className={styles.icon}>
            <IconCheckCircle size={17} />
          </span>
          <span className={styles.message}>{toast.message}</span>
          <button
            className={styles.close}
            onClick={() => removeToast(toast.id)}
            aria-label="Dismiss notification"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
};

export default Toast;