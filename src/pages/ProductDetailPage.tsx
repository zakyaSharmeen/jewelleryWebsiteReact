import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Check,
  Package,
  Shield,
  RefreshCw,
} from "lucide-react";
import { products } from "../data/products";
import ProductCard from "../components/product/ProductCard";
import StarRating from "../components/ui/StarRating";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import { formatPrice } from "../utils/format";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === id);
  const { addItem } = useCart();
  const { addToast } = useToast();
  const [activeImg, setActiveImg] = useState(0);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen pt-32 flex flex-col items-center justify-center gap-4">
        <p className="text-xl font-semibold text-neutral-900 dark:text-white">
          Product not found
        </p>
        <Button onClick={() => navigate("/shop")}>
          <ArrowLeft className="w-4 h-4" /> Back to Shop
        </Button>
      </div>
    );
  }

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    if (!product.inStock) return;
    addItem(product);
    addToast(`${product.name} added to cart`, "success");
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400 mb-8">
          <Link to="/" className="hover:text-amber-600 transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-amber-600 transition-colors">
            Shop
          </Link>
          <span>/</span>
          <span className="text-neutral-900 dark:text-white">
            {product.name}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Images */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-800">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImg}
                  src={product.images[activeImg]}
                  alt={product.name}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>

              {product.images.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setActiveImg(
                        (p) =>
                          (p - 1 + product.images.length) %
                          product.images.length,
                      )
                    }
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 dark:bg-neutral-800/80 rounded-full flex items-center justify-center shadow hover:bg-white dark:hover:bg-neutral-700 transition-colors">
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() =>
                      setActiveImg((p) => (p + 1) % product.images.length)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 dark:bg-neutral-800/80 rounded-full flex items-center justify-center shadow hover:bg-white dark:hover:bg-neutral-700 transition-colors">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </>
              )}

              <div className="absolute top-4 left-4">
                <Badge badge={product.badge} />
              </div>
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      activeImg === i
                        ? "border-amber-500"
                        : "border-transparent hover:border-amber-300"
                    }`}>
                    <img
                      src={img}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6">
            <div>
              <p className="text-amber-600 dark:text-amber-400 text-sm font-medium uppercase tracking-widest mb-2">
                {product.category} Collection
              </p>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white mb-3">
                {product.name}
              </h1>
              <StarRating
                rating={product.rating}
                reviewCount={product.reviewCount}
                size="md"
              />
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-neutral-900 dark:text-white">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-neutral-400 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                  <span className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-sm font-semibold px-2.5 py-0.5 rounded-full">
                    {discount}% off
                  </span>
                </>
              )}
            </div>

            {/* Specs */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Material", value: product.material },
                { label: "Weight", value: product.weight },
                { label: "Category", value: product.category },
                {
                  label: "Availability",
                  value: product.inStock ? "In Stock" : "Out of Stock",
                },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="bg-neutral-50 dark:bg-neutral-800 rounded-xl p-3">
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-0.5">
                    {label}
                  </p>
                  <p
                    className={`text-sm font-semibold ${label === "Availability" && !product.inStock ? "text-red-500" : "text-neutral-900 dark:text-white"}`}>
                    {value}
                  </p>
                </div>
              ))}
            </div>

            {/* Description */}
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed text-sm">
              {product.description}
            </p>

            {/* Add to Cart */}
            <div className="flex gap-3">
              <Button
                size="lg"
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="flex-1">
                {added ? (
                  <>
                    <Check className="w-5 h-5" />
                    Added!
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5" />
                    {product.inStock ? "Add to Cart" : "Out of Stock"}
                  </>
                )}
              </Button>
              <Link to="/cart" className="flex-1">
                <Button variant="outline" size="lg" className="w-full">
                  View Cart
                </Button>
              </Link>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              {[
                { icon: Shield, text: "Certified Genuine" },
                { icon: Package, text: "Gift Packaged" },
                { icon: RefreshCw, text: "30-day Returns" },
              ].map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="flex flex-col items-center gap-1.5 text-center p-3 bg-amber-50 dark:bg-amber-900/10 rounded-xl">
                  <Icon className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 font-medium">
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div>
            <h2 className="font-serif text-2xl font-bold text-neutral-900 dark:text-white mb-8">
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
