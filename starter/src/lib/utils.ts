import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const relativeTime = (time: ReturnType<Date["getTime"]>) => {
  const elapsed = Date.now() - time;
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

  const units = {
    year: 24 * 60 * 60 * 1000 * 365,
    month: 24 * 60 * 60 * 1000 * 30,
    day: 24 * 60 * 60 * 1000,
    hour: 60 * 60 * 1000,
    minute: 60 * 1000,
    second: 1000,
  } as const;
  type Unit = keyof typeof units;

  for (const u in units) {
    if (Math.abs(elapsed) > units[u as Unit] || u === "second") {
      return rtf.format(-Math.sign(elapsed) * Math.round(elapsed / units[u as Unit]), u as Unit);
    }
  }
};

export const slugify = (str: string, forDisplayingInput?: boolean) => {
  if (!str) {
    return "";
  }

  const s = str
    .toLowerCase() // Convert to lowercase
    .trim() // Remove whitespace from both sides
    .normalize("NFD") // Normalize to decomposed form for handling accents
    .replace(/\p{Diacritic}/gu, "") // Remove any diacritics (accents) from characters
    .replace(/[^.\p{L}\p{N}\p{Zs}\p{Emoji}]+/gu, "-") // Replace any non-alphanumeric characters (including Unicode and except "." period) with a dash
    .replace(/[\s_#]+/g, "-") // Replace whitespace, # and underscores with a single dash
    .replace(/^-+/, "") // Remove dashes from start
    .replace(/\.{2,}/g, ".") // Replace consecutive periods with a single period
    .replace(/^\.+/, "") // Remove periods from the start
    .replace(
      /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
      ""
    ) // Removes emojis
    .replace(/\s+/g, " ")
    .replace(/-+/g, "-"); // Replace consecutive dashes with a single dash

  return forDisplayingInput ? s : s.replace(/-+$/, "").replace(/\.*$/, ""); // Remove dashes and period from end
};

export const capitalizeWordsFromSlug = (slug: string) => {
  return slug
    .split("-")
    .map((word) => {
      // Capitalize the first letter of each word
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
};
export default slugify;
