import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Footer Content */}
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">TIN GROUP SERVICE</h3>
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
            <a href="#" className="text-gray-400 hover:text-white transition" aria-label="Facebook">
              <Facebook size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition" aria-label="Twitter">
              <Twitter size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition" aria-label="Instagram">
              <Instagram size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition" aria-label="LinkedIn">
              <Linkedin size={20} />
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
