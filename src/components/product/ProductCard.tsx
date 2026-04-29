import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingBag, Eye } from "lucide-react";
import type { Product } from "../../types";
import Badge from "../ui/Badge";
import StarRating from "../ui/StarRating";
import { formatPrice } from "../../utils/format";
import { useCart } from "../../context/CartContext";
import { useToast } from "../../context/ToastContext";

interface Props {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: Props) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const { addItem } = useCart();
  const { addToast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!product.inStock) return;
    addItem(product);
    addToast(`${product.name} added to cart`, "success");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}>
      <Link to={`/product/${product.id}`} className="group block">
        <div className="bg-white dark:bg-neutral-800 rounded-2xl overflow-hidden border border-neutral-100 dark:border-neutral-700 hover:border-amber-200 dark:hover:border-amber-700 hover:shadow-lg hover:shadow-amber-500/10 transition-all duration-300">
          {/* Image */}
          <div className="relative aspect-square overflow-hidden bg-neutral-100 dark:bg-neutral-700">
            {!imgLoaded && (
              <div className="absolute inset-0 animate-pulse bg-neutral-200 dark:bg-neutral-700" />
            )}
            <img
              src={product.images[0]}
              alt={product.name}
              loading="lazy"
              onLoad={() => setImgLoaded(true)}
              className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
                imgLoaded ? "opacity-100" : "opacity-0"
              }`}
            />

            {/* Badge */}
            <div className="absolute top-3 left-3">
              <Badge badge={product.badge} />
            </div>

            {/* Out of Stock */}
            {!product.inStock && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <span className="bg-white text-neutral-900 text-xs font-semibold px-3 py-1.5 rounded-full uppercase tracking-wider">
                  Out of Stock
                </span>
              </div>
            )}

            {/* Quick Actions */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100">
              <div className="flex gap-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="flex items-center gap-1.5 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white text-xs font-semibold px-4 py-2 rounded-full shadow-lg hover:bg-amber-500 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                  <ShoppingBag className="w-3.5 h-3.5" />
                  Add to Cart
                </button>
                <button className="bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white p-2 rounded-full shadow-lg hover:bg-amber-500 hover:text-white transition-colors">
                  <Eye className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="p-4">
            <p className="text-xs text-amber-600 dark:text-amber-400 font-medium uppercase tracking-wider mb-1">
              {product.category}
            </p>
            <h3 className="text-sm font-semibold text-neutral-900 dark:text-white leading-snug mb-2 line-clamp-1">
              {product.name}
            </h3>
            <StarRating
              rating={product.rating}
              reviewCount={product.reviewCount}
            />
            <div className="mt-3 flex items-center justify-between">
              <div className="flex items-baseline gap-2">
                <span className="text-base font-bold text-neutral-900 dark:text-white">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-xs text-neutral-400 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>
              {product.originalPrice && (
                <span className="text-xs bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 font-semibold px-2 py-0.5 rounded-full">
                  {Math.round(
                    (1 - product.price / product.originalPrice) * 100,
                  )}
                  % off
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
