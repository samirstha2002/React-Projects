import { PT, ES, DE } from "country-flag-icons/react/3x2";

const flags = {
  Portugal: PT,
  Spain: ES,
  Germany: DE,
};

export function getFlag(country) {
  return flags[country];
}
