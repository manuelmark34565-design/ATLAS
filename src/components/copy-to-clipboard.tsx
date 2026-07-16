'use client';

import { CheckMarkIcon, ClipboardIcon } from '@/icons/icons';
import copy from 'copy-text-to-clipboard';
import { useState } from 'react';

export function CopyToClipboard({ text }: { text: string }) {
  const [isCopied, setIsCopied] = useState(false);

  function handleClick() {
    copy(text);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
  }

  function handleShare(platform: 'facebook' | 'instagram' | 'x' | 'reddit') {
    const shareText = text || 'Check this out';
    const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://atlas.ai';
    const encodedText = encodeURIComponent(shareText);
    const encodedUrl = encodeURIComponent(currentUrl);

    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`,
      instagram: 'https://www.instagram.com/',
      x: `https://x.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
      reddit: `https://www.reddit.com/submit?title=${encodedText}&url=${encodedUrl}`,
    };

    window.open(shareUrls[platform], '_blank', 'noopener,noreferrer');
  }

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <button
        onClick={handleClick}
        className="group flex h-8 items-center gap-1 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-primary-200 hover:bg-primary-50 hover:text-primary-600 hover:shadow-[0_10px_25px_rgba(59,130,246,0.16)] dark:border-white/10 dark:bg-white/5 dark:text-gray-300 dark:hover:border-primary-400/50 dark:hover:bg-primary-500/10 dark:hover:text-white"
      >
        {isCopied ? <CheckMarkIcon /> : <ClipboardIcon />}
        <span>{isCopied ? 'Copied' : 'Copy'}</span>
      </button>

      <button
        type="button"
        onClick={() => handleShare('facebook')}
        className="group h-8 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-primary-200 hover:bg-primary-50 hover:text-primary-600 hover:shadow-[0_10px_25px_rgba(59,130,246,0.16)] dark:border-white/10 dark:bg-white/5 dark:text-gray-300 dark:hover:border-primary-400/50 dark:hover:bg-primary-500/10 dark:hover:text-white"
      >
        Facebook
      </button>

      <button
        type="button"
        onClick={() => handleShare('instagram')}
        className="group h-8 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-primary-200 hover:bg-primary-50 hover:text-primary-600 hover:shadow-[0_10px_25px_rgba(59,130,246,0.16)] dark:border-white/10 dark:bg-white/5 dark:text-gray-300 dark:hover:border-primary-400/50 dark:hover:bg-primary-500/10 dark:hover:text-white"
      >
        Instagram
      </button>

      <button
        type="button"
        onClick={() => handleShare('x')}
        className="group h-8 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-primary-200 hover:bg-primary-50 hover:text-primary-600 hover:shadow-[0_10px_25px_rgba(59,130,246,0.16)] dark:border-white/10 dark:bg-white/5 dark:text-gray-300 dark:hover:border-primary-400/50 dark:hover:bg-primary-500/10 dark:hover:text-white"
      >
        X
      </button>

      <button
        type="button"
        onClick={() => handleShare('reddit')}
        className="group h-8 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-primary-200 hover:bg-primary-50 hover:text-primary-600 hover:shadow-[0_10px_25px_rgba(59,130,246,0.16)] dark:border-white/10 dark:bg-white/5 dark:text-gray-300 dark:hover:border-primary-400/50 dark:hover:bg-primary-500/10 dark:hover:text-white"
      >
        Reddit
      </button>
    </div>
  );
}
