/**
 * date.js — format an ISO date string (YYYY-MM-DD) as an uppercase, locale-ish
 * label used across the blog: "14 AUG 2026". Falls back to the raw string.
 */
const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']

export function formatDate(iso) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(iso || ''))
  if (!m) return String(iso || '')
  const [, y, mm, dd] = m
  return `${Number(dd)} ${MONTHS[Number(mm) - 1]} ${y}`
}

export default formatDate
