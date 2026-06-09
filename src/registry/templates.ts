import type { NaukaMode } from "@/lib/mode";

/* =========================
   NAUKA MVP CORE SYSTEM
========================= */

export type Template = {
  id: string;
  name: string;
  modes: NaukaMode[];
  description: string;
};

export const templates: Template[] = [
  {
    id: "basic-calm",
    name: "Basic Calm",
    modes: ["universal", "syari"],
    description: "Simple, clean, elegan",
  },
  {
    id: "syari-calm",
    name: "Syar'i Calm",
    modes: ["syari"],
    description: "Adab & nuansa lembut",
  },
];

/** Filter templates by mode.
 *  Universal → only templates that support universal
 *  Syar'i → templates that support syari (includes basic-calm which is dual-mode)
 */
export function getTemplatesByMode(mode: NaukaMode | null): Template[] {
  if (!mode) return templates;
  return templates.filter((t) => t.modes.includes(mode));
}
