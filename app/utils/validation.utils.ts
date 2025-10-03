/**
 * Validates if a string is a valid phone number
 * @param num The phone number string to validate
 * @returns True if the phone number is valid, false otherwise
 */
export function isValidPhoneNumber(num: string): boolean {
  // Remove all non-digit characters
  const cleaned = num.replace(/\D/g, '');
  // Check if the cleaned number has exactly 10 digits
  return cleaned.length === 10;
} 