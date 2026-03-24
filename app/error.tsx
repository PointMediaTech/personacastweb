"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
      <p className="font-mono text-sm tracking-widest text-alert-red uppercase">
        Something went wrong
      </p>
      <h1 className="font-heading mt-4 text-4xl font-bold text-white">
        發生錯誤
      </h1>
      <p className="mt-3 max-w-md text-mist-blue-gray">
        很抱歉，處理您的請求時發生了非預期的錯誤。請重新嘗試，若問題持續請聯繫我們。
      </p>
      <button
        onClick={reset}
        className="mt-8 inline-block rounded-lg border border-aurora-cyan/60 px-6 py-3 text-sm font-medium text-aurora-cyan transition-colors hover:bg-aurora-cyan/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-aurora-cyan"
      >
        重新嘗試
      </button>
    </main>
  );
}
