export type Theme = "dark" | "light";

export const DEFAULT_THEME: Theme = "dark";
export const THEME_STORAGE_KEY = "theme";

export function isTheme(value: unknown): value is Theme {
  return value === "dark" || value === "light";
}

/*
 * Runs in <head> before first paint so a stored "light" choice never flashes
 * dark. Kept as a string because it must execute before React hydrates.
 * Storage access can throw (blocked cookies, private mode), hence the try.
 */
export const themeInitScript = `(function(){var t="${DEFAULT_THEME}";try{var s=localStorage.getItem("${THEME_STORAGE_KEY}");if(s==="dark"||s==="light")t=s}catch(e){}document.documentElement.dataset.theme=t})()`;
