import { motion } from "framer-motion";
import { X } from "lucide-react";
import type { Category, SortOption } from "../../types";
import { formatPrice } from "../../utils/format";

interface Props {
  selectedCategories: Category[];
  onCategoryChange: (cat: Category) => void;
  priceRange: [number, number];
  onPriceChange: (range: [number, number]) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  onReset: () => void;
}

const categories: Category[] = ["Gold", "Silver", "Bentex"];

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "default", label: "Default" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
];

export default function FilterPanel({
  selectedCategories,
  onCategoryChange,
  priceRange,
  onPriceChange,
  sortBy,
  onSortChange,
  onReset,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-100 dark:border-neutral-700 p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-neutral-900 dark:text-white">
          Filters
        </h3>
        <button
          onClick={onReset}
          className="text-xs text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1">
          <X className="w-3 h-3" />
          Reset
        </button>
      </div>

      {/* Sort */}
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-3">
          Sort By
        </h4>
        <div className="space-y-2">
          {sortOptions.map((opt) => (
            <label
              key={opt.value}
              className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="radio"
                name="sort"
                value={opt.value}
                checked={sortBy === opt.value}
                onChange={() => onSortChange(opt.value)}
                className="accent-amber-500"
              />
              <span className="text-sm text-neutral-700 dark:text-neutral-300 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                {opt.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Category */}
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-3">
          Category
        </h4>
        <div className="space-y-2">
          {categories.map((cat) => (
            <label
              key={cat}
              className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat)}
                onChange={() => onCategoryChange(cat)}
                className="accent-amber-500 rounded"
              />
              <span className="text-sm text-neutral-700 dark:text-neutral-300 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                {cat}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-3">
          Price Range
        </h4>
        <div className="space-y-4">
          <div className="flex justify-between text-sm text-neutral-700 dark:text-neutral-300">
            <span>{formatPrice(priceRange[0])}</span>
            <span>{formatPrice(priceRange[1])}</span>
          </div>
          <input
            type="range"
            min={0}
            max={80000}
            step={500}
            value={priceRange[1]}
            onChange={(e) =>
              onPriceChange([priceRange[0], Number(e.target.value)])
            }
            className="w-full accent-amber-500"
          />
          <input
            type="range"
            min={0}
            max={80000}
            step={500}
            value={priceRange[0]}
            onChange={(e) => {
              const val = Number(e.target.value);
              if (val <= priceRange[1]) onPriceChange([val, priceRange[1]]);
            }}
            className="w-full accent-amber-500"
          />
        </div>
      </div>
    </motion.div>
  );
}
