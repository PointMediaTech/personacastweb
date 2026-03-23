export default function ProductLoading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center" style={{ backgroundColor: '#03050C' }}>
      {/* Pulsing brand placeholder */}
      <div className="animate-pulse flex flex-col items-center gap-6">
        {/* Badge skeleton */}
        <div className="h-8 w-48 rounded-full bg-white/5" />

        {/* Title skeleton */}
        <div className="h-16 sm:h-24 w-72 sm:w-[500px] rounded-xl bg-white/5" />
        <div className="h-12 sm:h-20 w-56 sm:w-[400px] rounded-xl bg-white/5" />

        {/* Description skeleton */}
        <div className="mt-4 space-y-3 flex flex-col items-center">
          <div className="h-5 w-80 rounded bg-white/5" />
          <div className="h-5 w-64 rounded bg-white/5" />
        </div>

        {/* CTA skeleton */}
        <div className="mt-8 flex gap-6">
          <div className="h-14 w-48 rounded-2xl bg-white/5" />
          <div className="h-14 w-48 rounded-2xl bg-white/5" />
        </div>
      </div>
    </div>
  );
}
