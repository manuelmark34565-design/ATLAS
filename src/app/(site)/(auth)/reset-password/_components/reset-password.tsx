'use client';

import { PasswordInput } from '@/components/ui/inputs';
import { authValidation } from '@/lib/zod/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { createBrowserSupabaseClient } from '@/lib/supabase/client';

type Inputs = z.infer<typeof authValidation.resetPassword>;

export default function ResetPasswordForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [hasSession, setHasSession] = useState<boolean | null>(null);

  const form = useForm<Inputs>({
    resolver: zodResolver(authValidation.resetPassword),
    defaultValues: {
      newPassword: '',
      confirmNewPassword: '',
    },
  });

  useEffect(() => {
    const checkSession = async () => {
      const supabase = createBrowserSupabaseClient();
      const { data } = await supabase.auth.getSession();
      setHasSession(Boolean(data.session));
    };

    checkSession();
  }, []);

  async function onSubmit(data: Inputs) {
    setIsLoading(true);

    try {
      const supabase = createBrowserSupabaseClient();
      const { error } = await supabase.auth.updateUser({
        password: data.newPassword,
      });

      if (error) {
        toast.error(error.message);
        setIsLoading(false);
        return;
      }

      toast.success('Password updated. Please sign in with your new password.');
      router.push('/signin');
    } catch (err) {
      console.error(err);
      toast.error('Unable to update password. Try again.');
    } finally {
      setIsLoading(false);
    }
  }

  if (hasSession === null) {
    return <p className="text-center">Checking reset session…</p>;
  }

  if (!hasSession) {
    return (
      <div className="text-center">
        <p className="text-gray-700 dark:text-gray-400">
          No active password reset session found. Request a new reset link.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="text-center mb-8">
        <h3 className="text-gray-800 font-bold text-3xl mb-2 dark:text-white/90">
          Change Password
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          Make sure to create a strong password to secure your account.
        </p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-5">
          <Controller
            control={form.control}
            name="newPassword"
            render={({ field, fieldState }) => (
              <PasswordInput
                label="New Password"
                placeholder="Enter your new password"
                required
                error={fieldState.error?.message}
                disabled={isLoading}
                {...field}
              />
            )}
          />

          <Controller
            control={form.control}
            name="confirmNewPassword"
            render={({ field, fieldState }) => (
              <PasswordInput
                label="Confirm New Password"
                placeholder="Confirm your new password"
                required
                error={fieldState.error?.message}
                disabled={isLoading}
                {...field}
              />
            )}
          />

          <button
            className="bg-primary-500 hover:bg-primary-600 transition py-3 px-6 w-full font-medium text-white text-sm rounded-full"
            disabled={isLoading}
          >
            {isLoading ? 'Submitting...' : 'Reset Password'}
          </button>
        </div>
      </form>
    </>
  );
}
