import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Star, Shield, Truck, RefreshCw } from "lucide-react";
import { products } from "../data/products";
import ProductCard from "../components/product/ProductCard";
import Button from "../components/ui/Button";

const categories = [
  {
    name: "Gold",
    image:
      "https://images.pexels.com/photos/691046/pexels-photo-691046.jpeg?auto=compress&cs=tinysrgb&w=600",
    count: products.filter((p) => p.category === "Gold").length,
  },
  {
    name: "Silver",
    image:
      "https://images.pexels.com/photos/2735970/pexels-photo-2735970.jpeg?auto=compress&cs=tinysrgb&w=600",
    count: products.filter((p) => p.category === "Silver").length,
  },
  {
    name: "Bentex",
    image:
      "https://images.pexels.com/photos/1454171/pexels-photo-1454171.jpeg?auto=compress&cs=tinysrgb&w=600",
    count: products.filter((p) => p.category === "Bentex").length,
  },
];

const features = [
  {
    icon: Shield,
    title: "Certified Quality",
    desc: "Every piece verified by certified gemologists",
  },
  {
    icon: Truck,
    title: "Free Shipping",
    desc: "Complimentary shipping on orders above ₹5,000",
  },
  {
    icon: RefreshCw,
    title: "Easy Returns",
    desc: "30-day hassle-free return policy",
  },
  {
    icon: Star,
    title: "Lifetime Polish",
    desc: "Complimentary cleaning and polishing service",
  },
];

function FadeInSection({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}>
      {children}
    </motion.div>
  );
}

export default function HomePage() {
  const featured = products.filter((p) => p.badge === "trending").slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.pexels.com/photos/1458867/pexels-photo-1458867.jpeg?auto=compress&cs=tinysrgb&w=1600)",
          }}>
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/80 via-neutral-950/50 to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block text-amber-400 text-sm font-medium tracking-[0.2em] uppercase mb-6">
              The Art of Fine Jewellery
            </motion.span>
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
              Crafted for
              <br />
              <span className="text-amber-400">Eternity</span>
            </h1>
            <p className="text-lg text-neutral-300 leading-relaxed mb-10 max-w-lg">
              Discover our curated collection of handcrafted jewellery. Each
              piece tells a story of artisanal mastery passed down through
              generations.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/shop">
                <Button size="lg">
                  Explore Collection
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/about">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/50 text-white hover:bg-white/10">
                  Our Story
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 w-6 h-10 border-2 border-white/40 rounded-full flex items-start justify-center pt-2">
          <div className="w-1 h-2 bg-white/60 rounded-full" />
        </motion.div>
      </section>

      {/* Features Strip */}
      <section className="bg-amber-50 dark:bg-neutral-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                  <f.icon className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-neutral-900 dark:text-white">
                    {f.title}
                  </p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 hidden sm:block">
                    {f.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInSection>
          <div className="text-center mb-12">
            <p className="text-amber-600 dark:text-amber-400 text-sm font-medium uppercase tracking-widest mb-2">
              Our Collections
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white">
              Shop by Category
            </h2>
          </div>
        </FadeInSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat, i) => (
            <FadeInSection key={cat.name} delay={i * 0.1}>
              <Link
                to={`/shop?category=${cat.name}`}
                className="group relative block aspect-[4/5] rounded-2xl overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/70 via-neutral-900/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-white/70 text-sm mb-1">
                    {cat.count} pieces
                  </p>
                  <h3 className="font-serif text-2xl font-bold text-white mb-2">
                    {cat.name} Collection
                  </h3>
                  <span className="inline-flex items-center gap-1.5 text-amber-400 text-sm font-medium group-hover:gap-3 transition-all duration-200">
                    Explore <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            </FadeInSection>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-neutral-50 dark:bg-neutral-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
              <div>
                <p className="text-amber-600 dark:text-amber-400 text-sm font-medium uppercase tracking-widest mb-2">
                  Handpicked
                </p>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white">
                  Trending Now
                </h2>
              </div>
              <Link to="/shop">
                <Button variant="outline">
                  View All <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </FadeInSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInSection>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <p className="text-amber-600 dark:text-amber-400 text-sm font-medium uppercase tracking-widest mb-2">
                Just Arrived
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white">
                New Arrivals
              </h2>
            </div>
            <Link to="/shop">
              <Button variant="outline">
                Shop All <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </FadeInSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products
            .filter((p) => p.badge === "new")
            .map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-24 bg-neutral-900 dark:bg-neutral-950 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-20 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.pexels.com/photos/1458867/pexels-photo-1458867.jpeg?auto=compress&cs=tinysrgb&w=1200)",
          }}
        />
        <div className="relative max-w-3xl mx-auto text-center px-4">
          <FadeInSection>
            <p className="text-amber-400 text-sm font-medium uppercase tracking-widest mb-4">
              Exclusive Offer
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-6">
              Get 15% Off Your First Order
            </h2>
            <p className="text-neutral-300 text-lg mb-10">
              Join thousands of jewellery lovers. Sign up and receive a special
              discount on your first purchase.
            </p>
            <Link to="/shop">
              <Button size="lg">
                Shop Now <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </FadeInSection>
        </div>
      </section>
    </div>
  );
}
