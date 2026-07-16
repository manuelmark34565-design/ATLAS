'use client';

import { CopyToClipboard } from '@/components/copy-to-clipboard';

type PropsType = {
  response: string;
};

export default function AiResponse({ response }: PropsType) {
  return (
    <div className="max-w-3xl whitespace-pre-wrap">
      <div className="bg-slate-50/90 text-slate-800 dark:bg-slate-900/70 dark:text-slate-100 shadow-[0_10px_30px_rgba(15,23,42,0.08)] rounded-[24px] rounded-bl-lg py-4 px-5 max-w-3xl leading-7 border border-slate-200/80 dark:border-slate-700/70 backdrop-blur-sm">
        {response}
      </div>

      <div className="mt-3 text-gray-500 dark:text-gray-400">
        <CopyToClipboard text={response} />
      </div>
    </div>
  );
}
