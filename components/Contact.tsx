'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import SectionHeader from './SectionHeader'
import { type Variants } from 'framer-motion'
interface ContactProps {
  contactUI: {
    email: string
    github: string
    linkedin: string
    sectionTitle: string
    headingLine1: string
    headingLine2: string
    description: string
    nameLabel: string
    namePlaceholder: string
    emailLabel: string
    emailPlaceholder: string
    messageLabel: string
    messagePlaceholder: string
    sendButton: string
    sentButton: string
  }
}

type FormFields = { name: string; email: string; message: string }
type FormErrors = Partial<FormFields>

const SOCIAL_LINKS = (contactUI: ContactProps['contactUI']) => [
  {
    href: `mailto:${contactUI.email}`,
    icon: 'ti-mail',
    label: contactUI.email,
  },
  {
    href: contactUI.github,
    icon: 'ti-brand-github',
    label: contactUI.github.replace('https://', ''),
  },
  {
    href: contactUI.linkedin,
    icon: 'ti-brand-linkedin',
    label: contactUI.linkedin.replace('https://www.linkedin.com/in/', 'linkedin.com/in/'),
  },
]

function validate(form: FormFields): FormErrors {
  const errors: FormErrors = {}
  if (!form.name.trim()) errors.name = 'Name is required'
  if (!form.email.trim()) errors.email = 'Email is required'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Invalid email address'
  if (!form.message.trim()) errors.message = 'Message is required'
  else if (form.message.trim().length < 10) errors.message = 'Message must be at least 10 characters'
  return errors
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
}

export default function Contact({ contactUI }: ContactProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const [form, setForm] = useState<FormFields>({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<Partial<Record<keyof FormFields, boolean>>>({})
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)

  const handleBlur = (field: keyof FormFields) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
    const fieldErrors = validate(form)
    setErrors((prev) => ({ ...prev, [field]: fieldErrors[field] }))
  }

  const handleChange = (field: keyof FormFields, value: string) => {
    const updated = { ...form, [field]: value }
    setForm(updated)
    // Clear error as user types if field was already touched
    if (touched[field]) {
      const fieldErrors = validate(updated)
      setErrors((prev) => ({ ...prev, [field]: fieldErrors[field] }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const allTouched = { name: true, email: true, message: true }
    setTouched(allTouched)
    const fieldErrors = validate(form)
    setErrors(fieldErrors)
    if (Object.keys(fieldErrors).length > 0) return

    setSending(true)
    // Simulate async send — replace with your actual API call
    await new Promise((r) => setTimeout(r, 1200))
    setSending(false)
    setSent(true)
    setTimeout(() => setSent(false), 4000)
    setForm({ name: '', email: '', message: '' })
    setTouched({})
    setErrors({})
  }

  const inputCls = (field: keyof FormFields) =>
    `w-full bg-neutral-50 dark:bg-[#111113] border rounded px-3.5 py-2.5 text-neutral-900 dark:text-[#f0ede8] text-sm outline-none transition-all duration-200 placeholder:text-neutral-400 dark:placeholder:text-[#5a5754] ${
      touched[field] && errors[field]
        ? 'border-red-400 dark:border-red-500 focus:border-red-400 dark:focus:border-red-500'
        : 'border-neutral-200 dark:border-white/[0.12] focus:border-cyan-500 dark:focus:border-[#22d3ee]'
    }`

  const labelCls = 'block font-mono text-[11px] tracking-[0.08em] uppercase text-neutral-400 dark:text-[#5a5754] mb-2'

  return (
    <section className="py-20 border-b border-black/[0.05] dark:border-white/[0.07]" id="contact" ref={ref}>
      <SectionHeader num="05" title={contactUI.sectionTitle} />

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        {/* Left Column */}
        <motion.div variants={itemVariants}>
          <h3 className="font-syne text-[42px] font-extrabold leading-[1.05] tracking-[-1px] text-neutral-900 dark:text-[#f0ede8] mb-5">
            {contactUI.headingLine1}
            <br />
            <span className="text-cyan-500 dark:text-[#22d3ee]">{contactUI.headingLine2}</span>
          </h3>
          <p className="text-[14px] text-neutral-600 dark:text-[#9b9790] leading-[1.8] mb-8">
            {contactUI.description}
          </p>

          <div className="flex flex-col gap-3">
            {SOCIAL_LINKS(contactUI).map(({ href, icon, label }, i) => (
              <motion.a
                key={href}
                href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel="noreferrer"
                className="group flex items-center gap-3 px-4 py-3.5 bg-neutral-50 dark:bg-[#111113] border border-black/[0.05] dark:border-white/[0.07] rounded-lg font-mono text-[13px] text-neutral-600 dark:text-[#9b9790] transition-all duration-200 hover:border-cyan-500/40 dark:hover:border-[#22d3ee]/30 hover:text-neutral-900 dark:hover:text-[#f0ede8] hover:bg-cyan-50/50 dark:hover:bg-[#22d3ee]/[0.04]"
                initial={{ opacity: 0, x: -12 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ x: 4 }}
              >
                <span className="flex items-center justify-center w-7 h-7 rounded-md bg-neutral-100 dark:bg-white/[0.06] text-neutral-400 dark:text-[#5a5754] group-hover:bg-cyan-100 dark:group-hover:bg-[#22d3ee]/10 group-hover:text-cyan-500 dark:group-hover:text-[#22d3ee] transition-all duration-200">
                  <i className={`ti ${icon} text-[15px]`} />
                </span>
                {label}
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Right Column: Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5"
          variants={itemVariants}
          noValidate
        >
          {/* Name & Email side by side on larger screens */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {(
              [
                { key: 'name', label: contactUI.nameLabel, type: 'text', placeholder: contactUI.namePlaceholder },
                { key: 'email', label: contactUI.emailLabel, type: 'email', placeholder: contactUI.emailPlaceholder },
              ] as const
            ).map(({ key, label, type, placeholder }) => (
              <div key={key}>
                <label className={labelCls}>{label}</label>
                <input
                  className={inputCls(key)}
                  type={type}
                  placeholder={placeholder}
                  value={form[key]}
                  onChange={(e) => handleChange(key, e.target.value)}
                  onBlur={() => handleBlur(key)}
                />
                <AnimatePresence>
                  {touched[key] && errors[key] && (
                    <motion.p
                      className="mt-1.5 font-mono text-[11px] text-red-400 dark:text-red-400"
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.2 }}
                    >
                      {errors[key]}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Message */}
          <div>
            <label className={labelCls}>{contactUI.messageLabel}</label>
            <textarea
              className={`${inputCls('message')} resize-y min-h-[120px]`}
              placeholder={contactUI.messagePlaceholder}
              value={form.message}
              onChange={(e) => handleChange('message', e.target.value)}
              onBlur={() => handleBlur('message')}
            />
            <AnimatePresence>
              {touched.message && errors.message && (
                <motion.p
                  className="mt-1.5 font-mono text-[11px] text-red-400 dark:text-red-400"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.2 }}
                >
                  {errors.message}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={sending || sent}
            className={`relative flex items-center justify-center gap-2 w-full px-7 py-3 font-mono text-[13px] font-medium rounded transition-all duration-300 shadow-sm disabled:cursor-not-allowed ${
              sent
                ? 'bg-emerald-400 dark:bg-[#34d399] text-[#0a0a0b]'
                : 'bg-cyan-500 dark:bg-[#22d3ee] text-white dark:text-[#0a0a0b] hover:bg-cyan-600 dark:hover:bg-[#06b6d4]'
            }`}
            whileHover={!sending && !sent ? { y: -2 } : {}}
            whileTap={!sending && !sent ? { y: 0, scale: 0.98 } : {}}
          >
            <AnimatePresence mode="wait">
              {sending ? (
                <motion.span
                  key="sending"
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Spinner */}
                  <svg className="animate-spin w-3.5 h-3.5" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                  </svg>
                  Sending…
                </motion.span>
              ) : sent ? (
                <motion.span
                  key="sent"
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                >
                  <i className="ti ti-check" /> {contactUI.sentButton}
                </motion.span>
              ) : (
                <motion.span
                  key="idle"
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                >
                  <i className="ti ti-send" /> {contactUI.sendButton}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </motion.form>
      </motion.div>
    </section>
  )
}