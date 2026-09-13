import React, { useState } from 'react'
import { ArrowRight, Check, Loader2, AlertTriangle, Mail } from 'lucide-react'
import { profile } from '../data/profile.js'
import { validateContact, submitContact } from '../lib/submitContact.js'
import SectionHeading from './ui/SectionHeading.jsx'
import CornerFrame from './ui/CornerFrame.jsx'
import Reveal from './ui/Reveal.jsx'
import { cn } from '../lib/cn.js'

const FIELDS = [
  { name: 'name', label: 'name', type: 'text', autoComplete: 'name' },
  { name: 'email', label: 'email', type: 'email', autoComplete: 'email' },
  { name: 'subject', label: 'subject', type: 'text', autoComplete: 'off' },
]

const EMPTY = { name: '', email: '', subject: '', message: '' }

export function Contact() {
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [feedback, setFeedback] = useState('')

  const update = (name) => (e) => {
    setValues((v) => ({ ...v, [name]: e.target.value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const found = validateContact(values)
    setErrors(found)
    if (Object.keys(found).length > 0) {
      setStatus('error')
      setFeedback('Fix the highlighted fields and try again.')
      return
    }

    setStatus('loading')
    setFeedback('')
    try {
      const res = await submitContact(values)
      setStatus('success')
      setFeedback(res.message)
      setValues(EMPTY)
    } catch (err) {
      setStatus('error')
      setFeedback(err.message || 'Something went wrong. Please email directly.')
    }
  }

  return (
    <section id="link" className="relative scroll-mt-24 py-24">
      <div className="container-nx">
        <SectionHeading
          kicker="// ESTABLISH_LINK"
          title="Open Channel"
          description="Have a project, opportunity, or security problem worth discussing? Let's establish a secure connection."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          {/* side info */}
          <Reveal className="flex flex-col gap-4">
            <CornerFrame label="TRACE_ID" accent="pink" className="rounded-xl">
              <div className="glass-strong rounded-xl p-6">
                <p className="mono text-[11px] tracking-[0.16em] text-cyan">DIRECT_CHANNEL</p>
                <a
                  href={`mailto:${profile.email}`}
                  className="mono mt-2 inline-flex items-center gap-2 break-all text-sm text-ink transition-colors hover:text-cyan"
                >
                  <Mail size={14} /> {profile.email}
                </a>
                <hr className="my-5 border-white/10" />
                <ul className="mono space-y-2 text-[11px] tracking-[0.1em] text-muted">
                  <li>› RESPONSE_TIME: ~2 business days</li>
                  <li>› ENCRYPTION: PGP on request</li>
                  <li>› SCOPE: intel · analysis · research</li>
                </ul>
              </div>
            </CornerFrame>
          </Reveal>

          {/* form */}
          <Reveal>
            <CornerFrame label="SYS_01" accent="cyan" className="rounded-xl">
              <form
                onSubmit={onSubmit}
                noValidate
                className="glass-strong rounded-xl p-6 sm:p-7"
                aria-describedby="form-status"
              >
                <p className="mono mb-5 text-sm text-green">
                  connect<span className="text-muted">()</span>{' '}
                  <span className="text-muted">{'{'}</span>
                </p>

                <div className="space-y-4">
                  {FIELDS.map((field) => (
                    <Field
                      key={field.name}
                      {...field}
                      value={values[field.name]}
                      onChange={update(field.name)}
                      error={errors[field.name]}
                    />
                  ))}

                  <div>
                    <label htmlFor="c-message" className="mono mb-1.5 block text-[11px] tracking-[0.14em] text-muted">
                      message:
                    </label>
                    <textarea
                      id="c-message"
                      name="message"
                      rows={5}
                      value={values.message}
                      onChange={update('message')}
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={errors.message ? 'err-message' : undefined}
                      className={cn(
                        'mono w-full resize-y rounded-md border bg-[#06070d] px-3 py-2.5 text-sm text-ink placeholder:text-muted/50 focus:outline-none focus:ring-1',
                        errors.message
                          ? 'border-pink/60 focus:border-pink focus:ring-pink/40'
                          : 'border-white/12 focus:border-cyan/60 focus:ring-cyan/40',
                      )}
                      placeholder="describe the engagement..."
                    />
                    {errors.message && (
                      <p id="err-message" className="mono mt-1 text-[11px] text-pink">
                        {errors.message}
                      </p>
                    )}
                  </div>
                </div>

                <p className="mono my-5 text-sm text-muted">{'}'}</p>

                <div className="flex flex-col-reverse items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p
                    id="form-status"
                    role="status"
                    aria-live="polite"
                    className={cn(
                      'mono flex items-center gap-2 text-[11px] tracking-[0.1em]',
                      status === 'success' && 'text-green',
                      status === 'error' && 'text-pink',
                      (status === 'idle' || status === 'loading') && 'text-muted',
                    )}
                  >
                    {status === 'success' && <Check size={13} />}
                    {status === 'error' && <AlertTriangle size={13} />}
                    {status === 'loading' && <Loader2 size={13} className="animate-spin" />}
                    {feedback ||
                      (status === 'loading' ? 'TRANSMITTING...' : 'AWAITING_INPUT')}
                  </p>

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="mono group inline-flex items-center gap-2 rounded-md border border-cyan/60 bg-cyan/15 px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-cyan transition-all hover:bg-cyan/25 hover:shadow-neon-cyan disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {status === 'loading' ? 'SENDING' : 'SEND'}
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </form>
            </CornerFrame>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Field({ name, label, type, autoComplete, value, onChange, error }) {
  const id = `c-${name}`
  return (
    <div>
      <label htmlFor={id} className="mono mb-1.5 block text-[11px] tracking-[0.14em] text-muted">
        {label}:
      </label>
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        value={value}
        onChange={onChange}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `err-${name}` : undefined}
        className={cn(
          'mono w-full rounded-md border bg-[#06070d] px-3 py-2.5 text-sm text-ink placeholder:text-muted/50 focus:outline-none focus:ring-1',
          error
            ? 'border-pink/60 focus:border-pink focus:ring-pink/40'
            : 'border-white/12 focus:border-cyan/60 focus:ring-cyan/40',
        )}
        placeholder={`____________________`}
      />
      {error && (
        <p id={`err-${name}`} className="mono mt-1 text-[11px] text-pink">
          {error}
        </p>
      )}
    </div>
  )
}

export default Contact
