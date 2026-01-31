import Link from 'next/link';
import { Facebook, Instagram } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Footer Content */}
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* About Section */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              <img src="/images/logo.png" alt="TIN GROUP logo" className="w-24 h-24 rounded shadow-lg border-4 border-yellow-400 bg-white p-1" />
              <h3 className="text-xl font-bold">TIN GROUP SERVICE KFT</h3>
            </div>
            <p className="text-gray-400 text-sm">
              Clean Spaces, Happy Clients! Professional cleaning services for hotels, offices, apartments, industrial facilities, and commercial dishwashing. Eco-friendly solutions for a cleaner tomorrow.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link href="/" className="hover:text-white transition">Home</Link></li>
              <li><Link href="/services" className="hover:text-white transition">Services</Link></li>
              <li><Link href="/portfolio" className="hover:text-white transition">Portfolio</Link></li>
              <li><Link href="/about" className="hover:text-white transition">About Us</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-bold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link href="/services" className="hover:text-white transition">Residential Cleaning</Link></li>
              <li><Link href="/services" className="hover:text-white transition">Commercial Cleaning</Link></li>
              <li><Link href="/services" className="hover:text-white transition">Specialty Services</Link></li>
              <li><Link href="/contact" className="hover:text-white transition">Get a Quote</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>Phone: <a href="tel:+36705452856" className="hover:text-white transition">+36 70 545 2856</a></li>
              <li>Email: <a href="mailto:tingroupservicekft@gmail.com" className="hover:text-white transition">tingroupservicekft@gmail.com</a></li>
              <li>Email 2: <a href="mailto:isaactn26@gmail.com" className="hover:text-white transition">isaactn26@gmail.com</a></li>
              <li>Hours: Mon-Fri 8am-6pm</li>
              <li>Sat 9am-4pm</li>
            </ul>
          </div>
        </div>

        {/* Social Links */}
        <div className="border-t border-gray-700 pt-8 mb-8">
          <div className="flex justify-center gap-6 mb-8">
            <a href="https://www.facebook.com/profile.php?id=61586944482307" className="text-gray-400 hover:text-white transition" aria-label="Facebook">
              <Facebook size={20} />
            </a>

            <a href="https://www.tiktok.com/@tingroupservicekft" className="text-gray-400 hover:text-white transition" aria-label="TikTok">
              {/* Inline TikTok SVG */}
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48" fill="currentColor" aria-hidden>
                <path d="M33.5 14.3v10.2a9.2 9.2 0 1 1-9.2-9.2v3.6a5.6 5.6 0 1 0 5.6 5.6V14.3h3.6z" />
              </svg>
            </a>

            <a href="https://www.instagram.com/tingroupservicekft" className="text-gray-400 hover:text-white transition" aria-label="Instagram">
              <Instagram size={20} />
            </a>
          </div>

          {/* Copyright */}
          <div className="text-center text-gray-400 text-sm">
            <p>&copy; {currentYear} TIN GROUP SERVICE. All rights reserved.</p>
            <div className="mt-4 space-x-4">
              <a href="#" className="hover:text-white transition">Privacy Policy</a>
              <span>|</span>
              <a href="#" className="hover:text-white transition">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
