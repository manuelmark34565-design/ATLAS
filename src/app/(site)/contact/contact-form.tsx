"use client";

import { useState } from 'react';
import { Input } from '@/components/ui/inputs';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/inputs/textarea';

type ContactFormData = {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
};

export default function ContactForm() {
  const [form, setForm] = useState<ContactFormData>({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  function validate() {
    const e: Partial<ContactFormData> = {};
    if (!form.firstName.trim()) e.firstName = 'First name is required';
    if (!form.lastName.trim()) e.lastName = 'Last name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email';
    if (!form.message.trim()) e.message = 'Message is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSuccessMessage(null);
    setErrorMessage(null);
    if (!validate()) return;
    setIsLoading(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setSuccessMessage('Message sent. Thank you!');
        setForm({ firstName: '', lastName: '', email: '', message: '' });
      } else {
        const data = await res.json();
        setErrorMessage(data?.error || 'Failed to send message');
      }
    } catch (err) {
      setErrorMessage('Failed to send message');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            value={form.firstName}
            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
            type="text"
            placeholder="First name"
            aria-invalid={!!errors.firstName}
          />
          {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
        </div>

        <div>
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            value={form.lastName}
            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
            type="text"
            placeholder="Last name"
            aria-invalid={!!errors.lastName}
          />
          {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
        </div>

        <div className="col-span-full">
          <Label htmlFor="email">Email address</Label>
          <Input
            id="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            type="email"
            placeholder="you@example.com"
            aria-invalid={!!errors.email}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div className="col-span-full">
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            rows={6}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder="Type your message"
            aria-invalid={!!errors.message}
          />
          {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
        </div>

        <div className="col-span-full">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-primary-500 hover:bg-primary-600 transition h-12 py-3 px-6 w-full font-medium text-white text-sm rounded-full disabled:opacity-70"
          >
            {isLoading ? 'Sending...' : 'Send Message'}
          </button>
        </div>

        {successMessage && <p className="text-green-600 mt-2">{successMessage}</p>}
        {errorMessage && <p className="text-red-600 mt-2">{errorMessage}</p>}
      </div>
    </form>
  );
}
