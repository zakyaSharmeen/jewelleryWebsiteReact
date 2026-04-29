import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import Button from "../components/ui/Button";
import { useToast } from "../context/ToastContext";

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const empty: FormState = { name: "", email: "", subject: "", message: "" };

export default function ContactPage() {
  const [form, setForm] = useState<FormState>(empty);
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      addToast("Please fill in all required fields", "error");
      return;
    }
    setLoading(true);
    await new Promise((res) => setTimeout(res, 1200));
    setLoading(false);
    setForm(empty);
    addToast("Message sent! We'll get back to you within 24 hours.", "success");
  };

  const inputClass =
    "w-full px-4 py-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-sm text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-colors";

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="py-16 bg-neutral-50 dark:bg-neutral-800/50">
        <div className="max-w-3xl mx-auto text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}>
            <p className="text-amber-600 dark:text-amber-400 text-sm font-medium uppercase tracking-widest mb-3">
              Get in Touch
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-neutral-900 dark:text-white mb-4">
              We'd Love to Hear From You
            </h1>
            <p className="text-neutral-500 dark:text-neutral-400 text-lg">
              Have a question, special request, or want to create a bespoke
              piece? Our team is here to help.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="font-serif text-2xl font-bold text-neutral-900 dark:text-white mb-6">
                Contact Information
              </h2>
              <div className="space-y-5">
                {[
                  {
                    icon: MapPin,
                    title: "Visit Us",
                    details: [
                      "42 Jewellers Lane",
                      "Zaveri Bazaar, Mumbai 400002",
                    ],
                  },
                  {
                    icon: Phone,
                    title: "Call Us",
                    details: ["+91 98765 43210", "+91 22 4567 8900"],
                  },
                  {
                    icon: Mail,
                    title: "Email Us",
                    details: ["hello@lumiere.in", "support@lumiere.in"],
                  },
                  {
                    icon: Clock,
                    title: "Business Hours",
                    details: ["Mon – Sat: 10am – 7pm", "Sunday: 11am – 5pm"],
                  },
                ].map(({ icon: Icon, title, details }) => (
                  <div key={title} className="flex gap-4">
                    <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div>
                      <p className="font-semibold text-neutral-900 dark:text-white text-sm mb-0.5">
                        {title}
                      </p>
                      {details.map((d) => (
                        <p
                          key={d}
                          className="text-sm text-neutral-500 dark:text-neutral-400">
                          {d}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center">
              <img
                src="https://images.pexels.com/photos/1458867/pexels-photo-1458867.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Store"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-3">
            <div className="bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-100 dark:border-neutral-700 p-8">
              <h2 className="font-serif text-2xl font-bold text-neutral-900 dark:text-white mb-6">
                Send a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-medium text-neutral-600 dark:text-neutral-400 mb-1.5">
                      Your Name *
                    </label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Priya Sharma"
                      className={inputClass}
                    />
                  </div>
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
                      className={inputClass}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-600 dark:text-neutral-400 mb-1.5">
                    Subject
                  </label>
                  <input
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="Bespoke jewellery enquiry"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-600 dark:text-neutral-400 mb-1.5">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={6}
                    placeholder="Tell us about your requirements or questions..."
                    className={`${inputClass} resize-none`}
                  />
                </div>
                <Button
                  type="submit"
                  loading={loading}
                  size="lg"
                  className="w-full">
                  <Send className="w-4 h-4" />
                  Send Message
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
