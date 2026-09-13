/**
 * submitContact.js — API-ready contact form handler.
 * ---------------------------------------------------------------------------
 * By default this performs NO network request. It validates the payload and
 * resolves after a short delay so the UI can demonstrate loading/success
 * states without pretending a backend exists.
 *
 * To wire up a real provider, set VITE_CONTACT_ENDPOINT in a .env file and
 * (optionally) adjust the request body below. Works with Formspree, a Resend
 * or EmailJS proxy, or your own API route — anything that accepts a JSON POST.
 *
 *   .env
 *   VITE_CONTACT_ENDPOINT=https://formspree.io/f/xxxxxx
 */

export function validateContact({ name, email, subject, message }) {
  const errors = {}
  if (!name || name.trim().length < 2) errors.name = 'Enter your name (2+ characters).'
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.email = 'Enter a valid email address.'
  if (!subject || subject.trim().length < 3) errors.subject = 'Add a short subject.'
  if (!message || message.trim().length < 10)
    errors.message = 'Message should be at least 10 characters.'
  return errors
}

export async function submitContact(payload) {
  const endpoint = import.meta.env?.VITE_CONTACT_ENDPOINT

  if (!endpoint) {
    // Demo mode — no backend configured.
    await new Promise((r) => setTimeout(r, 1100))
    return {
      ok: true,
      demo: true,
      message:
        'Message validated locally. Configure VITE_CONTACT_ENDPOINT to actually deliver it.',
    }
  }

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    throw new Error(`Request failed (${res.status}). Please try again or email directly.`)
  }

  return { ok: true, demo: false, message: 'Message sent — thanks. I will get back to you.' }
}

export default submitContact
