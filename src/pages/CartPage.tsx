import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../utils/format";
import Button from "../components/ui/Button";

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice, totalItems } =
    useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-32 flex flex-col items-center justify-center gap-6 text-center px-4">
        <div className="w-24 h-24 bg-amber-100 dark:bg-amber-900/20 rounded-full flex items-center justify-center">
          <ShoppingBag className="w-12 h-12 text-amber-500" />
        </div>
        <h2 className="font-serif text-2xl font-bold text-neutral-900 dark:text-white">
          Your cart is empty
        </h2>
        <p className="text-neutral-500 dark:text-neutral-400">
          Looks like you haven't added any jewellery yet.
        </p>
        <Link to="/shop">
          <Button size="lg">
            Explore Collection <ArrowRight className="w-5 h-5" />
          </Button>
        </Link>
      </div>
    );
  }

  const shipping = totalPrice >= 5000 ? 0 : 199;
  const gst = Math.round(totalPrice * 0.03);
  const orderTotal = totalPrice + shipping + gst;

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="font-serif text-3xl font-bold text-neutral-900 dark:text-white mb-8">
          Shopping Cart
          <span className="ml-3 text-xl text-neutral-500 font-normal">
            ({totalItems} items)
          </span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  key={item.product.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20, height: 0 }}
                  className="flex gap-4 bg-white dark:bg-neutral-800 rounded-2xl p-4 border border-neutral-100 dark:border-neutral-700">
                  <Link
                    to={`/product/${item.product.id}`}
                    className="flex-shrink-0">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl object-cover"
                    />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-amber-600 dark:text-amber-400 font-medium uppercase tracking-wider mb-1">
                      {item.product.category}
                    </p>
                    <Link to={`/product/${item.product.id}`}>
                      <h3 className="font-semibold text-neutral-900 dark:text-white hover:text-amber-600 transition-colors line-clamp-1">
                        {item.product.name}
                      </h3>
                    </Link>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
                      {item.product.material}
                    </p>

                    <div className="flex items-center justify-between mt-3 flex-wrap gap-3">
                      {/* Quantity */}
                      <div className="flex items-center gap-2 border border-neutral-200 dark:border-neutral-600 rounded-full px-1">
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity - 1)
                          }
                          className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors text-neutral-600 dark:text-neutral-300">
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-sm font-semibold text-neutral-900 dark:text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1)
                          }
                          className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors text-neutral-600 dark:text-neutral-300">
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="font-bold text-neutral-900 dark:text-white">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="p-1.5 text-neutral-400 hover:text-red-500 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-100 dark:border-neutral-700 p-6 sticky top-24">
              <h2 className="font-semibold text-neutral-900 dark:text-white text-lg mb-6">
                Order Summary
              </h2>

              <div className="space-y-3 text-sm mb-6">
                <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
                  <span>Subtotal</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
                  <span>Shipping</span>
                  <span
                    className={
                      shipping === 0 ? "text-emerald-600 font-medium" : ""
                    }>
                    {shipping === 0 ? "Free" : formatPrice(shipping)}
                  </span>
                </div>
                <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
                  <span>GST (3%)</span>
                  <span>{formatPrice(gst)}</span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-amber-600 dark:text-amber-400">
                    Add {formatPrice(5000 - totalPrice)} more for free shipping
                  </p>
                )}
                <div className="border-t border-neutral-100 dark:border-neutral-700 pt-3 flex justify-between font-bold text-neutral-900 dark:text-white text-base">
                  <span>Total</span>
                  <span>{formatPrice(orderTotal)}</span>
                </div>
              </div>

              <Link to="/checkout">
                <Button size="lg" className="w-full">
                  Proceed to Checkout <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>

              <Link to="/shop">
                <Button variant="ghost" className="w-full mt-3">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
