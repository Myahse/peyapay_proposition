import { shuffle } from './array.utils';

/**
 * Generates a randomized keypad layout for PIN/OTP input
 * @returns A 2D array representing the keypad layout
 */
export function generateKeypad(): string[][] {
  const numbers = shuffle(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']);
  return [
    numbers.slice(0, 4),
    numbers.slice(4, 8),
    ['', ...numbers.slice(8, 10), 'del'],
  ];
} 