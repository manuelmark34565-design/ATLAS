"use client";

import { useEffect, useState } from 'react';
import { createBrowserSupabaseClient } from '@/lib/supabase/client';
import ForgotPasswordForm from './forgot-password';
import ResetPasswordForm from './reset-password';

export default function ResetPasswordFlow() {
  const [hasSession, setHasSession] = useState<boolean | null>(null);

  useEffect(() => {
    const check = async () => {
      const supabase = createBrowserSupabaseClient();
      const { data } = await supabase.auth.getSession();
      setHasSession(Boolean(data.session));
    };

    check();
  }, []);

  if (hasSession === null) return <p className="text-center">Checking reset session…</p>;

  return hasSession ? <ResetPasswordForm /> : <ForgotPasswordForm />;
}
