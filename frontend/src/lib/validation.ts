// Letters (any language) plus spaces/apostrophes/hyphens — for personal names and city names.
export const NAME_REGEX = /^[\p{L}][\p{L}\s'-]{1,59}$/u;

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Azerbaijani mobile numbers: optional +994/0 prefix, then a 2-digit operator code and 7 digits.
// Spaces/dashes/parentheses are stripped before testing.
export const AZ_PHONE_REGEX = /^(\+994|0)(10|50|51|55|60|70|77|99)\d{7}$/;

// Azerbaijani postal code: optional "AZ" prefix followed by 4 digits (e.g. "AZ1000" or "1000").
export const AZ_ZIP_REGEX = /^(AZ\s?)?\d{4}$/i;

export const ADDRESS_REGEX = /^.{5,120}$/;

// Accepts a full URL or a backend-relative path (e.g. "/static/uploads/xyz.jpg" from the upload endpoint).
export const IMAGE_URL_REGEX = /^(https?:\/\/\S+\.\S+|\/\S+)$/i;

export const PRICE_REGEX = /^\d+(\.\d{1,2})?$/;

export const NON_NEGATIVE_INT_REGEX = /^\d+$/;

// 13-19 digits, optionally grouped in blocks of 4 separated by spaces.
export const CARD_NUMBER_REGEX = /^\d{4}(\s?\d{4}){2}\s?\d{1,4}$/;

export const CARD_EXPIRY_REGEX = /^(0[1-9]|1[0-2])\/\d{2}$/;

export const CVV_REGEX = /^\d{3,4}$/;

export function normalizePhone(value: string): string {
  return value.replace(/[\s\-()]/g, '');
}

export function isValidName(value: string): boolean {
  return NAME_REGEX.test(value.trim());
}

export function isValidEmail(value: string): boolean {
  return EMAIL_REGEX.test(value.trim());
}

export function isValidPhone(value: string): boolean {
  return AZ_PHONE_REGEX.test(normalizePhone(value));
}

export function isValidZip(value: string): boolean {
  const trimmed = value.trim();
  return trimmed === '' || AZ_ZIP_REGEX.test(trimmed);
}

export function isValidAddress(value: string): boolean {
  return ADDRESS_REGEX.test(value.trim());
}

export function isValidImageUrl(value: string): boolean {
  return IMAGE_URL_REGEX.test(value.trim());
}

export function isValidPrice(value: string): boolean {
  return PRICE_REGEX.test(value.trim()) && Number(value) > 0;
}

export function isValidNonNegativeInt(value: string): boolean {
  return NON_NEGATIVE_INT_REGEX.test(value.trim());
}

export function isValidCardNumber(value: string): boolean {
  return CARD_NUMBER_REGEX.test(value.trim());
}

export function isValidCardExpiry(value: string): boolean {
  if (!CARD_EXPIRY_REGEX.test(value.trim())) return false;
  const [month, year] = value.trim().split('/').map(Number);
  const expiry = new Date(2000 + year, month, 1); // first day of the month *after* expiry
  return expiry.getTime() > Date.now();
}

export function isValidCvv(value: string): boolean {
  return CVV_REGEX.test(value.trim());
}
