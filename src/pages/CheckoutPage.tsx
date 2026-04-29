import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, Lock } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import { formatPrice } from "../utils/format";
import Button from "../components/ui/Button";
import type { CheckoutForm } from "../types";
import emailjs from "@emailjs/browser";

const EMAILJS_SERVICE_ID = "service_lumiere";
const EMAILJS_TEMPLATE_ID = "template_order";
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";

const emptyForm: CheckoutForm = {
  name: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  pincode: "",
};

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const [form, setForm] = useState<CheckoutForm>(emptyForm);
  const [errors, setErrors] = useState<Partial<CheckoutForm>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const shipping = totalPrice >= 5000 ? 0 : 199;
  const gst = Math.round(totalPrice * 0.03);
  const orderTotal = totalPrice + shipping + gst;

  const validate = (): boolean => {
    const e: Partial<CheckoutForm> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = "Valid email is required";
    }
    if (!form.phone.trim() || !/^\d{10}$/.test(form.phone.replace(/\s/g, ""))) {
      e.phone = "Valid 10-digit phone is required";
    }
    if (!form.address.trim()) e.address = "Address is required";
    if (!form.city.trim()) e.city = "City is required";
    if (!form.pincode.trim() || !/^\d{6}$/.test(form.pincode)) {
      e.pincode = "Valid 6-digit pincode is required";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof CheckoutForm]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (items.length === 0) {
      addToast("Your cart is empty", "error");
      return;
    }

    setLoading(true);

    const orderDetails = items
      .map(
        (i) =>
          `${i.product.name} x${i.quantity} = ${formatPrice(i.product.price * i.quantity)}`,
      )
      .join("\n");

    const templateParams = {
      to_name: form.name,
      to_email: form.email,
      phone: form.phone,
      address: `${form.address}, ${form.city} - ${form.pincode}`,
      order_details: orderDetails,
      order_total: formatPrice(orderTotal),
    };

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY,
      );
    } catch {
      // EmailJS not configured — proceed anyway for demo
    }

    setLoading(false);
    setSuccess(true);
    clearCart();
  };

  if (success) {
    return (
      <div className="min-h-screen pt-32 flex flex-col items-center justify-center gap-6 text-center px-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="w-24 h-24 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center">
          <CheckCircle className="w-14 h-14 text-emerald-500" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}>
          <h2 className="font-serif text-3xl font-bold text-neutral-900 dark:text-white mb-3">
            Order Placed!
          </h2>
          <p className="text-neutral-500 dark:text-neutral-400 max-w-md mb-8">
            Thank you, {form.name}! Your order has been confirmed. A
            confirmation will be sent to <strong>{form.email}</strong>.
          </p>
          <Button onClick={() => navigate("/")}>Back to Home</Button>
        </motion.div>
      </div>
    );
  }

  if (items.length === 0) {
    navigate("/cart");
    return null;
  }

  const inputClass = (field: keyof CheckoutForm) =>
    `w-full px-4 py-3 bg-neutral-50 dark:bg-neutral-800 border rounded-xl text-sm text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-colors ${
      errors[field]
        ? "border-red-400"
        : "border-neutral-200 dark:border-neutral-700 focus:border-amber-400"
    }`;

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="font-serif text-3xl font-bold text-neutral-900 dark:text-white mb-8">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-5">
            <div className="bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-100 dark:border-neutral-700 p-6">
              <h2 className="font-semibold text-neutral-900 dark:text-white mb-5">
                Shipping Information
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-600 dark:text-neutral-400 mb-1.5">
                    Full Name *
                  </label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Priya Sharma"
                    className={inputClass("name")}
                  />
                  {errors.name && (
                    <p className="text-xs text-red-500 mt-1">{errors.name}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-neutral-600 dark:text-neutral-400 mb-1.5">
                      Email Address *
                    </label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="priya@email.com"
                      className={inputClass("email")}
                    />
                    {errors.email && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-neutral-600 dark:text-neutral-400 mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="9876543210"
                      className={inputClass("phone")}
                    />
                    {errors.phone && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-600 dark:text-neutral-400 mb-1.5">
                    Street Address *
                  </label>
                  <input
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="123, MG Road, Apartment 4B"
                    className={inputClass("address")}
                  />
                  {errors.address && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.address}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-neutral-600 dark:text-neutral-400 mb-1.5">
                      City *
                    </label>
                    <input
                      name="city"
                      value={form.city}
                      onChange={handleChange}
                      placeholder="Mumbai"
                      className={inputClass("city")}
                    />
                    {errors.city && (
                      <p className="text-xs text-red-500 mt-1">{errors.city}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-neutral-600 dark:text-neutral-400 mb-1.5">
                      Pincode *
                    </label>
                    <input
                      name="pincode"
                      value={form.pincode}
                      onChange={handleChange}
                      placeholder="400001"
                      className={inputClass("pincode")}
                    />
                    {errors.pincode && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.pincode}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              loading={loading}
              className="w-full">
              <Lock className="w-4 h-4" />
              Place Order — {formatPrice(orderTotal)}
            </Button>
            <p className="text-center text-xs text-neutral-400">
              By placing your order you agree to our Terms of Service and
              Privacy Policy.
            </p>
          </form>

          {/* Summary */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-100 dark:border-neutral-700 p-6 sticky top-24">
              <h2 className="font-semibold text-neutral-900 dark:text-white mb-5">
                Order Summary
              </h2>

              <div className="space-y-3 mb-6">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-3">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-14 h-14 rounded-lg object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-neutral-900 dark:text-white line-clamp-1">
                        {item.product.name}
                      </p>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">
                        Qty: {item.quantity}
                      </p>
                      <p className="text-sm font-semibold text-neutral-900 dark:text-white">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-neutral-100 dark:border-neutral-700 pt-4 space-y-2 text-sm">
                <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
                  <span>Subtotal</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? "text-emerald-600" : ""}>
                    {shipping === 0 ? "Free" : formatPrice(shipping)}
                  </span>
                </div>
                <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
                  <span>GST (3%)</span>
                  <span>{formatPrice(gst)}</span>
                </div>
                <div className="flex justify-between font-bold text-neutral-900 dark:text-white text-base pt-2 border-t border-neutral-100 dark:border-neutral-700">
                  <span>Total</span>
                  <span>{formatPrice(orderTotal)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
