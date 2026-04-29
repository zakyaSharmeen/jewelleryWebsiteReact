import { Star } from "lucide-react";

interface Props {
  rating: number;
  reviewCount?: number;
  size?: "sm" | "md";
}

export default function StarRating({
  rating,
  reviewCount,
  size = "sm",
}: Props) {
  const starSize = size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4";

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex">
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            className={`${starSize} ${
              i < Math.floor(rating)
                ? "fill-amber-400 text-amber-400"
                : i < rating
                  ? "fill-amber-200 text-amber-400"
                  : "fill-neutral-200 text-neutral-200 dark:fill-neutral-600 dark:text-neutral-600"
            }`}
          />
        ))}
      </div>
      {reviewCount !== undefined && (
        <span className="text-xs text-neutral-500 dark:text-neutral-400">
          ({reviewCount})
        </span>
      )}
    </div>
  );
}
