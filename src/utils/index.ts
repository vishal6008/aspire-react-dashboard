/**
 * Generates a random 16-digit card number in groups of 4.
 */
export function generateCardNumber(): string {
  const segments = Array.from({ length: 4 }, () =>
    Math.floor(1000 + Math.random() * 9000).toString()
  );
  return segments.join(' ');
}

/**
 * Generates a random future expiry date in MM/YY format.
 * Always 3–5 years from now.
 */
export function generateExpiry(): string {
  const now = new Date();
  const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
  const year = String(
    (now.getFullYear() + 3 + Math.floor(Math.random() * 3)) % 100
  ).padStart(2, '0');
  return `${month}/${year}`;
}

/**
 * Masks all but the last 4 digits of a card number.
 * Input:  "4111 1111 1111 1234"
 * Output: "•••• •••• •••• 1234"
 */
export function maskCardNumber(number: string): string {
  const parts = number.split(' ');
  const last4 = parts[parts.length - 1];
  return `•••• •••• •••• ${last4}`;
}

/**
 * Generates a short unique id.
 */
export function generateId(prefix = 'id'): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}

/**
 * Formats a number as a currency string.
 * e.g. 150 → "S$ 150.00"
 */
export function formatCurrency(amount: number, currency = 'S$'): string {
  return `${currency} ${amount.toFixed(2)}`;
}