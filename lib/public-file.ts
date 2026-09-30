import { existsSync } from "node:fs";
import path from "node:path";

/** True when a `/public`-relative asset path (e.g. "/images/a.jpg") exists on disk. */
export function publicFileExists(src: string | undefined): boolean {
  if (!src || !src.startsWith("/")) return false;
  return existsSync(path.join(process.cwd(), "public", src));
}
