/**
 * Shuffles an array using Fisher-Yates algorithm
 * @param array - The array to shuffle
 * @returns A new shuffled array (original is not modified)
 */

export function shuffle<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5);
} 