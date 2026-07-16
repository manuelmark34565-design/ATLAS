'use client';

import { createBrowserSupabaseClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export default function SignOutButton() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function handleSignOut() {
    setIsLoading(true);
    const supabase = createBrowserSupabaseClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
      toast.error(error.message);
      setIsLoading(false);
      return;
    }

    router.replace('/signin');
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleSignOut}
      disabled={isLoading}
      className="rounded-full bg-gray-900 text-white px-5 py-3 text-sm font-medium transition hover:bg-gray-800 disabled:opacity-70"
    >
      {isLoading ? 'Signing out...' : 'Sign Out'}
    </button>
  );
}
