import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-brand-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Brand Column */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <Image
                src="/logo.jpeg"
                alt="PPCI Logo"
                width={52}
                height={52}
                className="rounded-full object-contain"
              />
              <h2 className="text-lg font-bold leading-tight">Pari Pest Control India</h2>
            </div>
        <p className="text-sm text-brand-200 mb-3">
              PPCI Pvt. Ltd. — Making Indian homes and businesses Pest-Free!
            </p>
            <p className="text-xs text-brand-300 leading-relaxed">
              Best Pest Control in Bhopal. Professional, certified, and eco-friendly pest management services for residential and commercial clients.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-brand-200 transition-colors">Home</Link></li>
              <li><Link href="/services" className="hover:text-brand-200 transition-colors">Services</Link></li>
              <li><Link href="/about" className="hover:text-brand-200 transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-brand-200 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <span>📞</span>
                <div>
                  <a href="tel:18003094947" className="hover:text-brand-200 transition-colors font-medium">
                    1800-309-4947
                  </a>
                  <p className="text-brand-300 text-xs">Toll Free</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span>✉️</span>
                <div>
                  <a href="mailto:sales@ppci.in" className="hover:text-brand-200 transition-colors">sales@ppci.in</a>
                  <br />
                  <a href="mailto:ppcisolutions1@gmail.com" className="hover:text-brand-200 transition-colors text-xs">ppcisolutions1@gmail.com</a>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span>📍</span>
                <span className="text-brand-200 text-xs leading-relaxed">
                  Shop No. 01, First Floor 7-B, NH-12,<br />
                  Near Union Bank of India,<br />
                  Indra Nagar, Mandideep,<br />
                  Bhopal (M.P.) 462046
                </span>
              </li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-brand-200 transition-colors">📘 Facebook</a></li>
              <li><a href="#" className="hover:text-brand-200 transition-colors">📸 Instagram</a></li>
              <li><a href="#" className="hover:text-brand-200 transition-colors">🐦 Twitter / X</a></li>
              <li><a href="#" className="hover:text-brand-200 transition-colors">💼 LinkedIn</a></li>
            </ul>
            <div className="mt-6">
              <a
                href="tel:18003094947"
                className="inline-block bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold px-5 py-2 rounded-full transition-colors"
              >
                📞 Get a Free Quote
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-brand-700">
        <p className="text-center text-sm py-4 text-brand-200">
          © {new Date().getFullYear()} Pari Pest Control India Pvt. Ltd. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

