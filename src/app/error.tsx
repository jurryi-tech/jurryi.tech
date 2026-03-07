"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7] p-8">
      <div className="max-w-md text-center">
        <h2 className="font-serif text-2xl text-[#1A1A1A] mb-4">Something went wrong</h2>
        <p className="font-mono text-sm text-[#5A5A5A] mb-6">{error.message}</p>
        <button
          onClick={reset}
          className="bg-[#1A1A1A] text-[#FDFBF7] px-6 py-3 rounded-md text-sm font-medium hover:bg-[#C5A44E] transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
