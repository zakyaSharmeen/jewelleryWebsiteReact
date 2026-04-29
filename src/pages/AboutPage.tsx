import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Award, Users, Gem, Heart } from "lucide-react";

const stats = [
  { icon: Gem, value: "500+", label: "Unique Pieces" },
  { icon: Users, value: "25,000+", label: "Happy Customers" },
  { icon: Award, value: "30+", label: "Years of Craft" },
  { icon: Heart, value: "100%", label: "Handcrafted" },
];

const team = [
  {
    name: "Meera Kapoor",
    role: "Master Artisan & Founder",
    image:
      "https://images.pexels.com/photos/3762800/pexels-photo-3762800.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    name: "Arjun Mehta",
    role: "Head of Design",
    image:
      "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    name: "Sonal Bhatia",
    role: "Gemologist",
    image:
      "https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
];

function FadeIn({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}>
      {children}
    </motion.div>
  );
}

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-32 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.pexels.com/photos/1458671/pexels-photo-1458671.jpeg?auto=compress&cs=tinysrgb&w=1400)",
          }}>
          <div className="absolute inset-0 bg-neutral-900/65" />
        </div>
        <div className="relative max-w-3xl mx-auto text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}>
            <p className="text-amber-400 text-sm font-medium uppercase tracking-widest mb-4">
              Our Story
            </p>
            <h1 className="font-serif text-5xl sm:text-6xl font-bold text-white mb-6">
              Crafted with Soul
            </h1>
            <p className="text-neutral-300 text-lg leading-relaxed">
              For over three decades, Lumière has been at the intersection of
              tradition and innovation, creating jewellery that transcends time.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <FadeIn>
            <div>
              <p className="text-amber-600 dark:text-amber-400 text-sm font-medium uppercase tracking-widest mb-3">
                Our Heritage
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white mb-6">
                Three Generations of Artisanal Excellence
              </h2>
              <div className="space-y-4 text-neutral-600 dark:text-neutral-400 leading-relaxed">
                <p>
                  Founded in 1993 in the heart of Mumbai's Zaveri Bazaar,
                  Lumière began as a small workshop with a grand vision — to
                  create jewellery that becomes a part of your story. Our
                  founder, Meera Kapoor, learned the art of jewellery-making
                  from her grandmother, who created bridal sets for maharanis.
                </p>
                <p>
                  Today, we blend age-old techniques with contemporary design
                  sensibilities. Every piece that leaves our atelier has been
                  touched by the hands of skilled craftsmen who have devoted
                  decades to their art. We source only ethically-obtained
                  materials, ensuring your jewellery has a conscience.
                </p>
                <p>
                  From the delicate filigree of our silver collections to the
                  vibrant kundan work in our gold pieces, each creation tells a
                  story of dedication, skill, and an unwavering commitment to
                  beauty.
                </p>
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/10975783/pexels-photo-10975783.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Artisan at work"
                className="rounded-2xl w-full object-cover aspect-[4/5]"
              />
              <div className="absolute -bottom-6 -left-6 bg-amber-500 text-white rounded-2xl p-6 shadow-xl">
                <p className="text-4xl font-bold font-serif">30+</p>
                <p className="text-sm font-medium mt-1">Years of Excellence</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-neutral-900 dark:bg-neutral-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <FadeIn key={s.label} delay={i * 0.1}>
                <div className="text-center">
                  <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <s.icon className="w-6 h-6 text-amber-400" />
                  </div>
                  <p className="font-serif text-3xl font-bold text-white mb-1">
                    {s.value}
                  </p>
                  <p className="text-neutral-400 text-sm">{s.label}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-14">
            <p className="text-amber-600 dark:text-amber-400 text-sm font-medium uppercase tracking-widest mb-3">
              The People
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white">
              Meet Our Craftspeople
            </h2>
          </div>
        </FadeIn>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {team.map((member, i) => (
            <FadeIn key={member.name} delay={i * 0.1}>
              <div className="text-center group">
                <div className="relative w-48 h-48 mx-auto mb-5 rounded-full overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 rounded-full ring-4 ring-amber-400/0 group-hover:ring-amber-400/50 transition-all duration-300" />
                </div>
                <h3 className="font-semibold text-lg text-neutral-900 dark:text-white">
                  {member.name}
                </h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  {member.role}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-amber-50 dark:bg-neutral-800/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl font-bold text-neutral-900 dark:text-white">
                Our Promise to You
              </h2>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                title: "Ethical Sourcing",
                desc: "All materials are responsibly and ethically sourced from certified suppliers worldwide.",
              },
              {
                title: "Artisanal Quality",
                desc: "Every piece is handcrafted by skilled artisans using time-honoured techniques.",
              },
              {
                title: "Lifetime Service",
                desc: "We stand behind our jewellery with complimentary cleaning, polishing, and repairs.",
              },
            ].map((v, i) => (
              <FadeIn key={v.title} delay={i * 0.1}>
                <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 border border-neutral-100 dark:border-neutral-700 text-center">
                  <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="w-3 h-3 bg-amber-500 rounded-full" />
                  </div>
                  <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">
                    {v.title}
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
