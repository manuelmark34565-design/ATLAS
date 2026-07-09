import Image from 'next/image';
import Link from 'next/link';
import { Subheading } from './subheading';
import { IntroVideo } from './intro-video';

export default function HeroSection() {
  return (
    <section className="pt-16 relative overflow-hidden dark:bg-[#171F2E]">
      <div className="max-w-[120rem] mx-auto relative">
        <div className="wrapper">
          <div className="max-w-[800px] mx-auto">
            <div className="text-center pb-16">
              <Subheading text="Your AI employee for customer support, lead capture, and business growth." />

              <h1 className="text-gray-700 mx-auto font-bold mb-4 text-4xl sm:text-[50px] dark:text-white/90 sm:leading-[64px] max-w-[700px]">
                Hire an AI employee that works 24/7.
              </h1>
              <p className="max-w-[537px] text-center mx-auto dark:text-gray-400 text-gray-500 text-base">
                Train an AI on your business in minutes, deploy it on your website,
                and let it answer questions, capture leads, and assist customers
                around the clock.
              </p>

              <div className="mt-9 flex sm:flex-row flex-col gap-3 relative z-30 items-center justify-center">
                <Link
                  href="/signup"
                  className="bg-primary-500 transition h-12 inline-flex items-center justify-center hover:bg-primary-600 px-6 py-3 rounded-full text-white text-sm"
                >
                  Get Started Free
                </Link>

                <IntroVideo />
              </div>
            </div>
          </div>
          <div className="max-w-[1000px] mx-auto relative">
            <div className="p-3 sm:p-[18px] relative z-30 rounded-[32px] border border-white/30 dark:border-white/10 bg-white/20">
              <Image
                src="/images/hero/hero-img.jpg"
                alt="ATLAS AI employee dashboard preview"
                className="w-full rounded-2xl block dark:hidden"
                width={966}
                height={552}
              />
              <Image
                src="/images/hero/hero-img-dark.png"
                alt="ATLAS AI employee dashboard preview"
                className="w-full rounded-2xl hidden dark:block"
                width={966}
                height={552}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="hero-glow-bg pointer-events-none w-full h-167.5 absolute z-10 bottom-0"></div>
    </section>
  );
}
