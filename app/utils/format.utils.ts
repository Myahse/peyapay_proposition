/**
 * Formats a phone number string to add spaces between groups of digits
 * @param input The phone number string to format
 * @returns The formatted phone number string
 */
export function formatPhoneNumber(input: string): string {
  // Remove all non-digit characters
  const cleaned = input.replace(/\D/g, '');
  
  // Format the number with spaces
  const match = cleaned.match(/^(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/);
  if (match) {
    return `${match[1]} ${match[2]} ${match[3]} ${match[4]} ${match[5]}`;
  }
  return cleaned;
} 