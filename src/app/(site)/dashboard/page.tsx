import { redirect } from 'next/navigation';
import SignOutButton from '@/components/auth/sign-out-button';
import { createServerSupabaseClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const supabase = createServerSupabaseClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect('/signin');
  }

  return (
    <section className="py-24">
      <div className="wrapper">
        <div className="max-w-3xl mx-auto bg-white dark:bg-dark-primary border border-gray-100 dark:border-gray-800 rounded-3xl p-10 shadow-sm">
          <div className="flex flex-col gap-8">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-primary-500 font-semibold">
                Dashboard
              </p>
              <h1 className="mt-3 text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white">
                Welcome back, {user.email}
              </h1>
              <p className="mt-4 text-gray-600 dark:text-gray-400 leading-7">
                Your account is authenticated. This placeholder dashboard is ready
                for the next sprint: business onboarding, AI knowledge, and lead
                capture.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Signed in as {user.email}
                </p>
              </div>
              <SignOutButton />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
