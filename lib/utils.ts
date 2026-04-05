/**
 * Generate a URL-friendly slug from couple names.
 * Appends a numeric suffix when `existingSlugs` contains a collision.
 */
export function generateSlug(
  name1: string,
  name2: string,
  existingSlugs: string[] = []
): string {
  const base = `${name1}-${name2}`
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  if (!existingSlugs.includes(base)) return base;

  let counter = 2;
  while (existingSlugs.includes(`${base}-${counter}`)) counter++;
  return `${base}-${counter}`;
}
