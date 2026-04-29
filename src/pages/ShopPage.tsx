import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, X } from "lucide-react";
import { products } from "../data/products";
import type { Category, SortOption } from "../types";
import ProductCard from "../components/product/ProductCard";
import FilterPanel from "../components/product/FilterPannel";
import { ProductCardSkeleton } from "../components/ui/Skeleton";
import Button from "../components/ui/Button";

export default function ShopPage() {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [filterOpen, setFilterOpen] = useState(false);

  const initialCategory = searchParams.get("category") as Category | null;
  const initialSearch = searchParams.get("search") || "";

  const [selectedCategories, setSelectedCategories] = useState<Category[]>(
    initialCategory ? [initialCategory] : [],
  );
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 80000]);
  const [sortBy, setSortBy] = useState<SortOption>("default");
  const [searchQuery, setSearchQuery] = useState(initialSearch);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const cat = searchParams.get("category") as Category | null;
    if (cat) setSelectedCategories([cat]);
    const s = searchParams.get("search") || "";
    if (s) setSearchQuery(s);
  }, [searchParams]);

  const handleCategoryChange = (cat: Category) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat],
    );
  };

  const handleReset = () => {
    setSelectedCategories([]);
    setPriceRange([0, 80000]);
    setSortBy("default");
    setSearchQuery("");
  };

  const filtered = useMemo(() => {
    let result = [...products];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q),
      );
    }

    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category));
    }

    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1],
    );

    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
    }

    return result;
  }, [selectedCategories, priceRange, sortBy, searchQuery]);

  return (
    <div className="min-h-screen pt-20">
      {/* Page Header */}
      <div className="bg-neutral-50 dark:bg-neutral-800/50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white mb-2">
            Our Collection
          </h1>
          <p className="text-neutral-500 dark:text-neutral-400">
            {filtered.length} pieces available
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Mobile Filter Toggle + Search */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search jewellery..."
              className="w-full pl-4 pr-10 py-2.5 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-full text-sm text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <Button
            variant="outline"
            onClick={() => setFilterOpen(!filterOpen)}
            className="lg:hidden">
            <SlidersHorizontal className="w-4 h-4" />
            Filters
          </Button>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filter - Desktop */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <FilterPanel
                selectedCategories={selectedCategories}
                onCategoryChange={handleCategoryChange}
                priceRange={priceRange}
                onPriceChange={setPriceRange}
                sortBy={sortBy}
                onSortChange={setSortBy}
                onReset={handleReset}
              />
            </div>
          </div>

          {/* Mobile Filter Drawer */}
          <AnimatePresence>
            {filterOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                  onClick={() => setFilterOpen(false)}
                />
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100%" }}
                  transition={{ type: "spring", damping: 30 }}
                  className="fixed left-0 top-0 bottom-0 w-72 z-50 lg:hidden overflow-y-auto">
                  <div className="p-4">
                    <div className="flex justify-end mb-4">
                      <button
                        onClick={() => setFilterOpen(false)}
                        className="p-2 rounded-full bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300">
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    <FilterPanel
                      selectedCategories={selectedCategories}
                      onCategoryChange={handleCategoryChange}
                      priceRange={priceRange}
                      onPriceChange={setPriceRange}
                      sortBy={sortBy}
                      onSortChange={setSortBy}
                      onReset={handleReset}
                    />
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Products Grid */}
          <div className="flex-1 min-w-0">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-24">
                <p className="text-4xl mb-4">&#128142;</p>
                <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2">
                  No products found
                </h3>
                <p className="text-neutral-500 dark:text-neutral-400 mb-6">
                  Try adjusting your filters or search query.
                </p>
                <Button onClick={handleReset}>Reset Filters</Button>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filtered.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
