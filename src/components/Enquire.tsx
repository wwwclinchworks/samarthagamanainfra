import { AnimatePresence, motion } from "framer-motion"
import { useState, type FormEvent } from "react"
import { X } from "lucide-react"
import { locations } from "../data/content"

export function EnquireForm({ compact = false }: { compact?: boolean }) {
  const [sent, setSent] = useState(false)

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSent(true)
  }

  if (sent) {
    return (
      <div className="rounded-2xl bg-sky/50 p-6 text-ink">
        <p className="font-display text-2xl">Thank you</p>
        <p className="mt-2 text-sm text-muted">
          Your enquiry is noted on this device. When the official desk is connected,
          messages will reach the sales lounge. For now, we have your intent.
        </p>
        <button
          type="button"
          className="mt-4 text-sm text-sage-deep underline"
          onClick={() => setSent(false)}
        >
          Send another
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className={`grid gap-3 ${compact ? "" : "sm:grid-cols-2"}`}>
      <Field name="name" label="Name" required />
      <Field name="email" label="Email" type="email" required />
      <Field name="phone" label="Phone no" type="tel" required />
      <label className="grid gap-1 text-left text-xs tracking-wide text-muted">
        Location
        <select
          name="location"
          className="rounded-xl border border-sand bg-white/80 px-3 py-2.5 text-sm text-ink outline-none focus:border-gold"
          defaultValue=""
        >
          <option value="" disabled>
            Choose a city
          </option>
          {locations.map((city) => (
            <option key={city}>{city}</option>
          ))}
        </select>
      </label>
      <label className={`grid gap-1 text-left text-xs tracking-wide text-muted ${compact ? "" : "sm:col-span-2"}`}>
        Message
        <textarea
          name="message"
          rows={compact ? 3 : 4}
          className="resize-none rounded-xl border border-sand bg-white/80 px-3 py-2.5 text-sm text-ink outline-none focus:border-gold"
        />
      </label>
      <button
        type="submit"
        className={`rounded-full bg-sage-deep py-3 text-sm text-cream hover:bg-ink ${compact ? "" : "sm:col-span-2"}`}
      >
        Submit
      </button>
    </form>
  )
}

function Field({
  name,
  label,
  type = "text",
  required,
}: {
  name: string
  label: string
  type?: string
  required?: boolean
}) {
  return (
    <label className="grid gap-1 text-left text-xs tracking-wide text-muted">
      {label}
      <input
        name={name}
        type={type}
        required={required}
        className="rounded-xl border border-sand bg-white/80 px-3 py-2.5 text-sm text-ink outline-none focus:border-gold"
      />
    </label>
  )
}

export function EnquireDrawer({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.button
            type="button"
            aria-label="Close enquire"
            className="fixed inset-0 z-50 bg-ink/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 26, stiffness: 260 }}
            className="fixed top-0 right-0 z-50 flex h-full w-full max-w-md flex-col bg-cream p-6 shadow-2xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs tracking-[0.24em] text-gold uppercase">
                  Quick enquire now
                </p>
                <h2 className="font-display text-3xl">Write to us</h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="grid h-10 w-10 place-items-center rounded-full border border-sand"
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </div>
            <div className="mt-6 overflow-y-auto">
              <EnquireForm compact />
            </div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  )
}
