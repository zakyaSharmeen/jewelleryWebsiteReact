import { Link } from "react-router-dom";
import { Gem, Mail, Phone, MapPin } from "lucide-react";
import { FaInstagramSquare } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { FaWhatsappSquare } from "react-icons/fa";
const socialLinks = [
  { icon: FaInstagramSquare, text: "Instagram @insta", link: "#" },
  { icon: FaFacebookSquare, text: "Facebook @fb", link: "#" },
  { icon: FaWhatsappSquare, text: "WhatsApp +91 98765 43210", link: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-neutral-900 dark:bg-neutral-950 text-neutral-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center">
                <Gem className="w-4 h-4 text-white" />
              </div>
              <span className="font-serif text-xl font-semibold text-white">
                SHERU JEWELLERS
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-neutral-400 mb-6">
              Crafting timeless jewellery that tells your story. Each piece is a
              testament to artisanal excellence and enduring beauty.
            </p>
            <div className=" gap-3">
              {/* {[<FaInstagramSquare />,
<FaFacebookSquare />,
 <FaWhatsappSquare />
].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full border border-neutral-700 flex items-center justify-center text-neutral-400 hover:text-amber-400 hover:border-amber-400 transition-colors">
                  <Icon className="w-4 h-4" />
                </a>
              ))} */}
              {socialLinks.map(({ icon: Icon, text, link }, i) => (
                <a
                  key={i}
                  href={link}
                  className=" items-center gap-2 flex text-neutral-400 hover:text-amber-400 transition-colors">
                  <Icon className="w-4 h-4" />
                  <span className="text-sm">{text}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-widest">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Home", to: "/" },
                { label: "Shop", to: "/shop" },
                { label: "About Us", to: "/about" },
                { label: "Contact", to: "/contact" },
                { label: "Cart", to: "/cart" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-neutral-400 hover:text-amber-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-widest">
              Collections
            </h4>
            <ul className="space-y-3">
              {[
                "Gold Collection",
                "Silver Collection",
                "Bentex Collection",
              ].map((item) => (
                <li key={item}>
                  <Link
                    to="/shop"
                    className="text-sm text-neutral-400 hover:text-amber-400 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-widest">
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                <span className="text-sm text-neutral-400">
                  42 Jewellers Lane, Zaveri Bazaar, Mumbai 400002
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-sm text-neutral-400">
                  +91 98765 43210
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-sm text-neutral-400">
                  hello@lumiere.in
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-neutral-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-neutral-500">
            &copy; {new Date().getFullYear()} zakya@sharmeen. All rights
            reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service", "Shipping Policy"].map(
              (item) => (
                <a
                  key={item}
                  href="#"
                  className="text-xs text-neutral-500 hover:text-neutral-300 transition-colors">
                  {item}
                </a>
              ),
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
