"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="zh-Hant">
      <body
        style={{ backgroundColor: "#020617", color: "#fff", margin: 0 }}
        className="flex min-h-screen flex-col items-center justify-center px-4 text-center"
      >
        <p style={{ color: "#FF4D4D", fontSize: "0.875rem", letterSpacing: "0.1em" }}>
          CRITICAL ERROR
        </p>
        <h1 style={{ color: "#769EDB", fontSize: "2.25rem", fontWeight: 700, marginTop: "1rem" }}>
          發生嚴重錯誤
        </h1>
        <p style={{ color: "#8892B0", maxWidth: "28rem", marginTop: "0.75rem" }}>
          應用程式遇到無法恢復的錯誤。請重新載入頁面。
        </p>
        <button
          onClick={reset}
          style={{
            marginTop: "2rem",
            padding: "0.75rem 1.5rem",
            border: "1px solid rgba(0,242,255,0.6)",
            borderRadius: "0.5rem",
            background: "transparent",
            color: "#00F2FF",
            cursor: "pointer",
            fontSize: "0.875rem",
          }}
        >
          重新載入
        </button>
      </body>
    </html>
  );
}
