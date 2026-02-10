'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <header className="bg-white shadow-md">
      <nav className="max-w-6xl mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-4 group">
          <span className="relative inline-block">
            <span className="absolute inset-0 rounded-full bg-gradient-to-tr from-yellow-400 via-blue-400 to-blue-700 p-[3px] group-hover:scale-105 group-hover:shadow-xl transition-transform duration-300"></span>
            <span className="relative block rounded-full bg-white">
              <Image src="/images/logo.png" alt="TIN GROUP logo" width={88} height={88} className="rounded-full shadow-lg border-2 border-white" />
            </span>
          </span>
          <span className="font-extrabold text-3xl text-blue-700 drop-shadow-sm tracking-tight group-hover:text-yellow-400 transition-colors duration-300">TIN GROUP</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-8 items-center">
          <Link href="/" className="text-gray-700 hover:text-blue-600 transition">
            Home
          </Link>
          <Link href="/services" className="text-gray-700 hover:text-blue-600 transition">
            Services
          </Link>
          <Link href="/portfolio" className="text-gray-700 hover:text-blue-600 transition">
            Portfolio
          </Link>
          <Link href="/about" className="text-gray-700 hover:text-blue-600 transition">
            About
          </Link>
          <Link href="/contact">
            <button className="bg-gradient-to-r from-yellow-400 to-blue-600 text-white px-6 py-2 rounded-lg hover:opacity-95 transition">
              Contact
            </button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-gray-50 px-4 py-4 space-y-4">
          <Link href="/" onClick={closeMenu} className="block text-gray-700 hover:text-blue-600 transition">
            Home
          </Link>
          <Link href="/services" onClick={closeMenu} className="block text-gray-700 hover:text-blue-600 transition">
            Services
          </Link>
          <Link href="/portfolio" onClick={closeMenu} className="block text-gray-700 hover:text-blue-600 transition">
            Portfolio
          </Link>
          <Link href="/about" onClick={closeMenu} className="block text-gray-700 hover:text-blue-600 transition">
            About
          </Link>
          <Link href="/contact" onClick={closeMenu}>
            <button className="w-full bg-gradient-to-r from-yellow-400 to-blue-600 text-white px-6 py-2 rounded-lg hover:opacity-95 transition">
              Contact
            </button>
          </Link>
        </div>
      )}
    </header>
  );
}
