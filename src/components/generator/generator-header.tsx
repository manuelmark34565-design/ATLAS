import { CloseIcon, MenuIcon } from '@/icons/icons';
import Image from 'next/image';
import Link from 'next/link';
import DesktopNav from '../layout/header/desktop-nav';
import ThemeToggle from '../layout/header/theme-toggle';

export default function GeneratorHeader({
  toggleSidebar,
  toggleRightSidebar,
  sidebarOpen,
}: {
  toggleSidebar: () => void;
  toggleRightSidebar: () => void;
  sidebarOpen: boolean;
}) {
  return (
    <header className="bg-white dark:bg-dark-primary border-b dark:border-gray-800 border-gray-100 sticky top-0 z-50 py-2 lg:py-4">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 items-center lg:grid-cols-[1fr_auto_1fr]">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center gap-3">
              {/* <!-- Mobile menu button --> */}
              <button
                aria-label="Toggle left sidebar"
                onClick={toggleSidebar}
                className="rounded-md text-gray-400 lg:hidden"
              >
                {sidebarOpen ? (
                  <CloseIcon className="size-6" />
                ) : (
                  <MenuIcon className="size-6" />
                )}
              </button>

              <div className="flex items-center">
                <Link href="/" className="flex items-end gap-2">
                  <svg
                    viewBox="0 0 270 70"
                    xmlns="http://www.w3.org/2000/svg"
                    width={180}
                    height={40}
                    className="h-auto w-[180px]"
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
            </div>
          </div>

          <DesktopNav />

          <div className="flex items-center gap-3 justify-self-end">
            <ThemeToggle />

            <button
              onClick={toggleRightSidebar}
              type="button"
              className="inline-flex xl:hidden items-center dark:hover:bg-white/5 dark:hover:text-white/90 hover:bg-gray-100 hover:text-gray-800 text-gray-500 dark:text-gray-400 justify-center border border-gray-200 dark:border-gray-700 rounded-full size-11"
            >
              <span className="sr-only">Open right sidebar</span>
              <svg
                className="size-7"
                width="32"
                height="32"
                viewBox="0 0 25 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                transform="rotate(0 0 0)"
              >
                <path
                  d="M6.3125 13.7558C5.346 13.7559 4.5625 12.9723 4.5625 12.0059V11.9959C4.5625 11.0294 5.346 10.2458 6.3125 10.2458C7.279 10.2458 8.0625 11.0294 8.0625 11.9958V12.0058C8.0625 12.9723 7.279 13.7558 6.3125 13.7558Z"
                  fill="currentColor"
                />
                <path
                  d="M18.3125 13.7558C17.346 13.7558 16.5625 12.9723 16.5625 12.0058V11.9958C16.5625 11.0294 17.346 10.2458 18.3125 10.2458C19.279 10.2458 20.0625 11.0294 20.0625 11.9958V12.0058C20.0625 12.9723 19.279 13.7558 18.3125 13.7558Z"
                  fill="currentColor"
                />
                <path
                  d="M10.5625 12.0058C10.5625 12.9723 11.346 13.7558 12.3125 13.7558C13.279 13.7558 14.0625 12.9723 14.0625 12.0058V11.9958C14.0625 11.0294 13.279 10.2458 12.3125 10.2458C11.346 10.2458 10.5625 11.0294 10.5625 11.9958V12.0058Z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
