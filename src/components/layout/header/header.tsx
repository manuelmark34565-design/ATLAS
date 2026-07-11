'use client';
import { CloseIcon, MenuIcon } from '@/icons/icons';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import DesktopNav from './desktop-nav';
import MainMobileNav from './main-mobile-nav';
import ThemeToggle from './theme-toggle';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header className="bg-white dark:bg-dark-primary border-b dark:border-gray-800 border-gray-100 sticky top-0 z-50 py-2 lg:py-4">
      <div className="px-4 sm:px-6 lg:px-7">
        <div className="grid grid-cols-2 items-center lg:grid-cols-[1fr_auto_1fr]">
          <div className="flex items-center">
            <Link href="/" className="flex items-end gap-2">
              <svg
                viewBox="0 0 270 70"
                xmlns="http://www.w3.org/2000/svg"
                width={260}
                height={70}
                className="h-auto w-[260px]"
              >
                <rect x="8" y="12" width="44" height="44" rx="14" fill="var(--logo-mark-bg, #0F172A)" />
                <path d="M28 20C28 17.7909 29.7909 16 32 16H34C36.2091 16 38 17.7909 38 20V22C38 24.2091 36.2091 26 34 26H32C29.7909 26 28 24.2091 28 22V20Z" fill="var(--logo-accent-1, #5B6CFF)" />
                <path d="M28 32C28 29.7909 29.7909 28 32 28H34C36.2091 28 38 29.7909 38 32V34C38 36.2091 36.2091 38 34 38H32C29.7909 38 28 36.2091 28 34V32Z" fill="var(--logo-accent-2, #7DD3FC)" />
                <path d="M28 44C28 41.7909 29.7909 40 32 40H34C36.2091 40 38 41.7909 38 44V46C38 48.2091 36.2091 50 34 50H32C29.7909 50 28 48.2091 28 46V44Z" fill="var(--logo-accent-3, #60A5FA)" />
                <path d="M44 22L58 22" stroke="var(--logo-accent-1, #5B6CFF)" strokeWidth="3" strokeLinecap="round" />
                <path d="M44 34L58 34" stroke="var(--logo-accent-2, #7DD3FC)" strokeWidth="3" strokeLinecap="round" />
                <path d="M44 46L58 46" stroke="var(--logo-accent-3, #60A5FA)" strokeWidth="3" strokeLinecap="round" />
                <circle cx="61" cy="22" r="5" fill="var(--logo-accent-1, #5B6CFF)" />
                <circle cx="61" cy="34" r="5" fill="var(--logo-accent-2, #7DD3FC)" />
                <circle cx="61" cy="46" r="5" fill="var(--logo-accent-3, #60A5FA)" />
                <text x="76" y="32" fill="var(--logo-text, #0F172A)" fontFamily="Inter, Arial, sans-serif" fontSize="24" fontWeight="700" letterSpacing="0.3">ATLAS</text>
                <text x="76" y="50" fill="var(--logo-subtext, #475569)" fontFamily="Inter, Arial, sans-serif" fontSize="11" fontWeight="600" letterSpacing="1.9">AI EMPLOYEE</text>
                <path d="M76 36C90 36 103 36 117 36" stroke="var(--logo-accent-2, #7DD3FC)" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
              </svg>

            </Link>
          </div>

          <DesktopNav />

          <div className="flex items-center gap-4 justify-self-end">
            <ThemeToggle />

            <button
              onClick={(e) => {
                e.stopPropagation();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              type="button"
              className="order-last shrink-0 inline-flex items-center justify-center p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 lg:hidden"
            >
              {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>

            <Link
              href="/signin"
              className="text-sm hidden lg:block font-medium text-gray-700 dark:text-gray-400 hover:text-primary-500"
            >
              Sign In
            </Link>

            <Link
              href="/signup"
              className="lg:inline-flex items-center px-5 py-3 gradient-btn hidden text-sm text-white rounded-full button-bg h-11"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </div>

      <MainMobileNav isOpen={mobileMenuOpen} />
    </header>
  );
}
