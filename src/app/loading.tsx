export default function Loading() {
  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      {/* Header Skeleton */}
      <header className="bg-white border-b border-stone-100">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-9 sm:h-9 bg-stone-200 rounded-lg animate-pulse"></div>
            <div className="h-5 w-40 bg-stone-200 rounded animate-pulse"></div>
          </div>
        </div>
      </header>

      {/* Main Content Skeleton */}
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-stone-200 border-t-stone-800 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-stone-500 text-sm">Loading...</p>
        </div>
      </main>
    </div>
  );
}
