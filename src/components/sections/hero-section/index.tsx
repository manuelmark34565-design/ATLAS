import Link from 'next/link';
import { Subheading } from './subheading';
import { IntroVideo } from './intro-video';

const heroImage =
  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=80';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(78,110,255,0.1),_transparent_45%),linear-gradient(135deg,_rgba(255,255,255,0.96),_rgba(244,247,255,0.98))] px-5 pb-20 pt-16 sm:pb-28 lg:px-8 lg:pb-32 lg:pt-24 dark:bg-[radial-gradient(circle_at_top_left,_rgba(78,110,255,0.13),_transparent_45%),linear-gradient(135deg,_#101827,_#171F2E)]">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-[-10%] top-[-15%] h-[26rem] w-[26rem] rounded-full bg-primary-500/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[10%] h-[24rem] w-[24rem] rounded-full bg-sky-400/10 blur-[120px]" />
        <div className="absolute right-[-8%] top-[10%] h-[20rem] w-[20rem] rounded-full bg-indigo-400/8 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-[1.02fr_0.98fr]">
          <div className="mx-auto max-w-2xl text-center lg:mx-0 lg:text-left">
            <Subheading text="Your AI Employee for customer support, lead capture, and business growth." />

            <h1 className="mx-auto mb-5 max-w-[760px] text-[2.1rem] font-bold leading-[1.05] text-gray-800 sm:text-[2.8rem] sm:leading-[1.05] lg:mx-0 lg:text-[3.6rem] dark:text-white/95">
              Build your AI employee in minutes.
            </h1>

            <p className="mx-auto max-w-[640px] text-[0.95rem] leading-7 text-gray-600 sm:text-[1.02rem] sm:leading-8 lg:mx-0 dark:text-gray-400">
              From onboarding to support and lead capture, launch a polished assistant with your business knowledge and your brand voice in just a few clicks.
            </p>

            <div className="relative z-30 mt-8 flex flex-col items-center gap-3 sm:flex-row lg:items-start lg:justify-start">
              <Link
                href="/signup"
                className="inline-flex h-12 items-center justify-center rounded-full bg-primary-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-600"
              >
                Get Started Free
              </Link>

              <IntroVideo />
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
              {['24/7 support', 'No-code setup', 'Website ready', 'Your brand voice'].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-gray-200 bg-white/80 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/10 dark:text-gray-200"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[34rem]">
            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-primary-500/20 to-sky-500/20 blur-3xl" />
            <div className="relative overflow-hidden rounded-[36px] border border-white/70 bg-white/80 p-3 shadow-[0_20px_80px_rgba(15,23,42,0.14)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/70">
              <img
                src={heroImage}
                alt="A modern AI employee dashboard experience"
                className="h-[320px] w-full rounded-[28px] object-cover sm:h-[420px] lg:h-[460px]"
              />

              <div className="absolute inset-x-4 top-4 flex items-center justify-between">
                <span className="rounded-full border border-white/40 bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-gray-700 backdrop-blur dark:border-white/10 dark:bg-slate-900/70 dark:text-gray-200">
                  Launch in 5 mins
                </span>
                <span className="rounded-full bg-emerald-500/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-white">
                  Live now
                </span>
              </div>

              <div className="absolute inset-x-4 bottom-4 rounded-[24px] border border-gray-200/80 bg-white/90 p-4 shadow-lg backdrop-blur dark:border-white/10 dark:bg-slate-950/80">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">Ready to deploy</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">A beautiful assistant with your content, your tone, and your website.</p>
                  </div>
                  <div className="rounded-full bg-primary-500/10 px-3 py-1 text-sm font-semibold text-primary-600 dark:text-primary-400">
                    AI
                  </div>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  {[
                    { label: 'Answers', value: '24/7' },
                    { label: 'Lead capture', value: 'Instant' },
                    { label: 'Deploy', value: '1 click' },
                  ].map((stat) => (
                    <div key={stat.label} className="rounded-2xl border border-gray-100 bg-gray-50/80 p-3 text-center dark:border-white/10 dark:bg-white/5">
                      <p className="text-xs uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">{stat.label}</p>
                      <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">{stat.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-glow-bg pointer-events-none absolute bottom-0 z-10 h-167.5 w-full" />
    </section>
  );
}
