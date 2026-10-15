'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';

interface RequestCallModalProps {
  open: boolean;
  onClose: () => void;
}

interface CallbackFormData {
  fullName: string;
  email: string;
  phone: string;
  reason: string;
  callbackDate: string;
  callbackTime: string;
  website: string;
}

const initialFormData: CallbackFormData = {
  fullName: '',
  email: '',
  phone: '',
  reason: '',
  callbackDate: '',
  callbackTime: '',
  website: '',
};

function getLocalDate(): string {
  const now = new Date();
  return new Date(now.getTime() - now.getTimezoneOffset() * 60_000).toISOString().slice(0, 10);
}

export default function RequestCallModal({ open, onClose }: RequestCallModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const [today, setToday] = useState('');
  const [formData, setFormData] = useState(initialFormData);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setToday(getLocalDate()));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (!open) {
      if (dialog.open) dialog.close();
      return;
    }

    if (!dialog.open) dialog.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const focusFrame = window.requestAnimationFrame(() => nameInputRef.current?.focus());

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.body.style.overflow = previousOverflow;
      if (dialog.open) dialog.close();
    };
  }, [open]);

  const updateField = (field: keyof CallbackFormData, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }));
    if (status === 'error') {
      setStatus('idle');
      setFeedback('');
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === 'sending') return;

    if (formData.callbackDate < getLocalDate()) {
      setStatus('error');
      setFeedback('Choose today or a future date for your callback request.');
      return;
    }

    setStatus('sending');
    setFeedback('Sending your callback request...');

    try {
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
      const response = await fetch('/api/callback-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, timeZone }),
      });
      const result = await response.json().catch(() => null) as { error?: string } | null;

      if (!response.ok) {
        throw new Error(result?.error || 'Your request could not be sent. Please try again.');
      }

      setStatus('success');
      setFeedback('');
    } catch (error) {
      setStatus('error');
      setFeedback(error instanceof Error ? error.message : 'Your request could not be sent. Please try again.');
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className="callback-dialog"
      aria-labelledby="callback-dialog-title"
      aria-describedby="callback-dialog-description"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="callback-dialog-header">
        <div>
          <p className="callback-dialog-eyebrow">A BETTER TIME TO TALK</p>
          <h2 id="callback-dialog-title">Request a call</h2>
          <p id="callback-dialog-description" className="callback-dialog-description">
            Share a few details and I’ll review your preferred callback time.
          </p>
        </div>
        <button
          type="button"
          className="callback-dialog-close"
          aria-label="Close callback request"
          onClick={onClose}
        >
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="m6 6 12 12M18 6 6 18" />
          </svg>
        </button>
      </div>

      {status === 'success' ? (
        <div className="callback-success" role="status" aria-live="polite">
          <span className="callback-success-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="m6 12.5 4 4L18.5 8" />
            </svg>
          </span>
          <div className="callback-success-content">
            <p className="callback-success-eyebrow">REQUEST RECEIVED</p>
            <h3>Thanks, {formData.fullName.trim()}.</h3>
            <p>
              I’ll review your callback request and get back to you at {formData.email.trim()}.
              This is a request only, not a booked call.
            </p>
            <div className="callback-request-summary">
              <span>YOUR PREFERRED TIME</span>
              <strong>{formData.callbackDate} at {formData.callbackTime}</strong>
              <small>{Intl.DateTimeFormat().resolvedOptions().timeZone || 'Local time'}</small>
            </div>
            <button type="button" className="callback-success-action" onClick={onClose}>
              Done
            </button>
          </div>
        </div>
      ) : (
        <form className="callback-form" onSubmit={handleSubmit}>
          <div className="callback-form-grid">
            <div className="callback-field">
              <label htmlFor="callback-full-name">Full name</label>
              <input
                ref={nameInputRef}
                id="callback-full-name"
                name="fullName"
                autoComplete="name"
                type="text"
                required
                minLength={2}
                maxLength={100}
                value={formData.fullName}
                onChange={(event) => updateField('fullName', event.target.value)}
                disabled={status === 'sending'}
              />
            </div>
            <div className="callback-field">
              <label htmlFor="callback-email">Email address</label>
              <input
                id="callback-email"
                name="email"
                autoComplete="email"
                type="email"
                required
                maxLength={254}
                value={formData.email}
                onChange={(event) => updateField('email', event.target.value)}
                disabled={status === 'sending'}
              />
            </div>
            <div className="callback-field">
              <label htmlFor="callback-phone">Phone number</label>
              <input
                id="callback-phone"
                name="phone"
                autoComplete="tel"
                inputMode="tel"
                type="tel"
                required
                minLength={7}
                maxLength={25}
                placeholder="Include country code if needed"
                value={formData.phone}
                onChange={(event) => updateField('phone', event.target.value)}
                disabled={status === 'sending'}
              />
            </div>
            <div className="callback-field">
              <label htmlFor="callback-reason">Reason for calling</label>
              <input
                id="callback-reason"
                name="reason"
                type="text"
                required
                minLength={3}
                maxLength={200}
                placeholder="Project, opportunity, or another topic"
                value={formData.reason}
                onChange={(event) => updateField('reason', event.target.value)}
                disabled={status === 'sending'}
              />
            </div>
            <div className="callback-field">
              <label htmlFor="callback-date">Preferred callback date</label>
              <input
                id="callback-date"
                name="callbackDate"
                type="date"
                required
                min={today}
                value={formData.callbackDate}
                onChange={(event) => updateField('callbackDate', event.target.value)}
                disabled={status === 'sending'}
              />
            </div>
            <div className="callback-field">
              <label htmlFor="callback-time">Preferred callback time</label>
              <input
                id="callback-time"
                name="callbackTime"
                type="time"
                required
                value={formData.callbackTime}
                onChange={(event) => updateField('callbackTime', event.target.value)}
                disabled={status === 'sending'}
              />
            </div>
          </div>

          <div className="callback-honeypot" aria-hidden="true">
            <label htmlFor="callback-website">Leave this field empty</label>
            <input
              id="callback-website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={formData.website}
              onChange={(event) => updateField('website', event.target.value)}
            />
          </div>

          <p className="callback-form-note">Your phone number is only included in the private callback request email.</p>
          {feedback && (
            <p
              className={`callback-feedback${status === 'error' ? ' is-error' : ''}`}
              role={status === 'error' ? 'alert' : 'status'}
              aria-live="polite"
            >
              {feedback}
            </p>
          )}
          <div className="callback-form-actions">
            <button type="button" className="callback-cancel-button" onClick={onClose}>
              Cancel
            </button>
            <button
              type="submit"
              className="callback-submit-button"
              disabled={status === 'sending'}
              aria-busy={status === 'sending'}
            >
              {status === 'sending' ? <span className="callback-spinner" aria-hidden="true" /> : null}
              {status === 'sending' ? 'Sending request...' : 'Send call request'}
            </button>
          </div>
        </form>
      )}
    </dialog>
  );
}