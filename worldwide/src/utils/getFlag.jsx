import * as Flags from "country-flag-icons/react/3x2";

export function getFlag(countryCode) {
  if (!countryCode) return null;

  const code = countryCode.toUpperCase();
  return Flags[code] || null;
}
