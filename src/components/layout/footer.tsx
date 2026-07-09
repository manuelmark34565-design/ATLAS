import Link from 'next/link';
import { getCurrentYear } from '@/lib/utils';

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-200">
      <div className="wrapper py-12">
        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          <div>
            <h2 className="text-2xl font-semibold text-white">ATLAS AI Employee</h2>
            <p className="mt-4 max-w-lg text-sm text-gray-400">
              Create an AI employee for customer support, lead capture, and business growth.
              Train with your own business data and let it work 24/7.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
                Product
              </h3>
              <nav className="mt-4 space-y-3 text-sm">
                <Link href="/" className="block hover:text-white">Home</Link>
                <Link href="/text-generator" className="block hover:text-white">Chat</Link>
                <Link href="/pricing" className="block hover:text-white">Pricing</Link>
              </nav>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
                Company
              </h3>
              <nav className="mt-4 space-y-3 text-sm">
                <Link href="/signin" className="block hover:text-white">Sign In</Link>
                <Link href="/signup" className="block hover:text-white">Sign Up</Link>
                <Link href="/privacy" className="block hover:text-white">Privacy</Link>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-6 text-center text-sm text-gray-500">
        &copy; {getCurrentYear()} ATLAS AI Employee. All rights reserved.
      </div>
    </footer>
  );
}
