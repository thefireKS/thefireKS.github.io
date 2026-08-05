/*
 * Site-wide credits, rendered by src/components/site-footer.astro on every
 * page.
 *
 * Three flat rows, not per-project: the same people work across games, art and
 * comics, so splitting them per release only repeats names. Add someone by
 * dropping them into the right list. A row with an empty list is skipped, so an
 * unused one costs nothing.
 */
export interface CreditRole {
  role: string;
  names: string[];
}

export const siteCredits: CreditRole[] = [
  { role: "developers", names: ["thefireks", "partaevil", "N1K04KA", "IAvocadoI"] },
  { role: "artists", names: ["kiri.b", "lobotomi", "Diana Dvoeglazova"] },
  { role: "special thanks", names: ["1de", "Guulik"] },
];

export interface SiteContact {
  label: string;
  href: string;
  icon: string;
}

export const siteContacts: SiteContact[] = [
  {
    label: "Telegram",
    href: "https://t.me/thefireKS",
    icon: "dinkie-icons:telegram-alt",
  },
  {
    label: "Email",
    href: "mailto:halfwaypixel@gmail.com",
    icon: "pixelarticons:mail",
  },
  {
    label: "itch.io",
    href: "https://fireks.itch.io/",
    icon: "pixelarticons:gamepad",
  },
  {
    label: "GitHub",
    href: "https://github.com/thefireKS",
    icon: "pixelarticons:github",
  },
];
