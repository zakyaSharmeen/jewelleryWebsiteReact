export function SkeletonBox({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse bg-neutral-200 dark:bg-neutral-700 rounded-lg ${className}`}
    />
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="bg-white dark:bg-neutral-800 rounded-2xl overflow-hidden border border-neutral-100 dark:border-neutral-700">
      <SkeletonBox className="aspect-square rounded-none" />
      <div className="p-4 space-y-3">
        <SkeletonBox className="h-3 w-16 rounded-full" />
        <SkeletonBox className="h-5 w-3/4" />
        <SkeletonBox className="h-4 w-1/2" />
        <SkeletonBox className="h-9 w-full rounded-full" />
      </div>
    </div>
  );
}
