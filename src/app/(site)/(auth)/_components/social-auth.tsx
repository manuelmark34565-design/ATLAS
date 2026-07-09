'use client';

import { GoogleIcon } from '@/icons/icons';

type SocialAuthButtonProps = {
  onClick: () => Promise<void> | void;
  disabled?: boolean;
  label?: string;
};

export function SignInWithGoogle({
  onClick,
  disabled,
  label = 'Sign in with Google',
}: SocialAuthButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="bg-gray-100 text-left w-full justify-center dark:hover:bg-white/10 dark:hover:text-white/90 dark:bg-white/5 transition dark:text-gray-400 font-normal text-sm hover:bg-gray-200 rounded-full text-gray-700 hover:text-gray-800 flex items-center gap-3 px-4 sm:px-8 py-2.5 min-h-12 disabled:cursor-not-allowed disabled:opacity-70"
    >
      <GoogleIcon className="shrink-0" />
      <span>{label}</span>
    </button>
  );
}
