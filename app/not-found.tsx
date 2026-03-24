import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "找不到頁面 | PersonaCast",
  description: "您所尋找的頁面不存在或已被移動。",
};

export default function NotFound() {
  return (
    <main className="flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
      <p className="font-mono text-sm tracking-widest text-aurora-cyan uppercase">
        Error 404
      </p>
      <h1 className="font-heading mt-4 text-8xl font-extrabold tracking-tight text-strategic-blue">
        404
      </h1>
      <h2 className="font-heading mt-4 text-2xl font-bold text-white">
        找不到您要的頁面
      </h2>
      <p className="mt-3 max-w-md text-mist-blue-gray">
        此頁面可能已被移除、名稱已變更，或暫時無法使用。
      </p>
      <Link
        href="/"
        className="cta-ghost mt-8 inline-block rounded-lg border border-aurora-cyan/60 px-6 py-3 text-sm font-medium text-aurora-cyan transition-colors hover:bg-aurora-cyan/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-aurora-cyan"
      >
        返回首頁
      </Link>
    </main>
  );
}
