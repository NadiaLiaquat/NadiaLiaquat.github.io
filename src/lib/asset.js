/**
 * asset.js — resolve a file under public/ against Vite's configured base
 * path, so local asset references work whether the site is deployed at a
 * domain root ("/") or a subpath ("/repo-name/", as on a GitHub Pages
 * project page — see .github/workflows/deploy.yml). A hardcoded "/foo.png"
 * only works at root; asset('foo.png') works at either.
 *
 * Leaves absolute URLs (http/https) untouched, since those aren't local
 * public/ files and shouldn't be base-prefixed.
 */
export function asset(path) {
  const p = String(path || '')
  if (/^https?:\/\//i.test(p)) return p
  return import.meta.env.BASE_URL + p.replace(/^\/+/, '')
}

export default asset
