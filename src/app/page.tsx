import Link from 'next/link';
import { CheckCircle, Star, Users } from 'lucide-react';

import AnimatedServiceText from '@/components/AnimatedServiceText';
import AnimatedCarousel from '@/components/AnimatedCarousel';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-yellow-400 via-blue-600 to-blue-800 text-white py-20 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">TIN GROUP SERVICE KFT</h1>
          <p className="text-xl md:text-2xl mb-4 text-blue-100">
            <AnimatedServiceText 
              englishText="Clean Spaces, Happy Clients !" 
              hungarianText="Tiszta Terek, Boldog Ügyfelek !"
              duration={3}
            />
          </p>
          <p className="text-lg md:text-xl mb-8 text-blue-100">Professional cleaning services</p>
          <Link href="/contact">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-blue-50 transition">
              Get Your Free Quote Today
            </button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 md:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">Why Choose Us?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <CheckCircle className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-2 text-gray-800">Eco-Friendly</h3>
              <p className="text-gray-600">We use environmentally safe and sustainable cleaning products</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <Star className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-2 text-gray-800">Trusted & Reliable</h3>
              <p className="text-gray-600">Over 10+ years of experience with thousands of satisfied customers</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <Users className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-2 text-gray-800">Professional Team</h3>
              <p className="text-gray-600">Fully trained and background-checked cleaning professionals</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">Our Services</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="border-l-4 border-blue-600 pl-6">
                <h3 className="text-2xl font-bold mb-2 text-gray-800">Hotel Cleaning</h3>
                <p className="text-gray-600 mb-4">Housekeeping & public areas - professional hospitality cleaning services</p>
              <Link href="/services" className="text-blue-600 font-semibold hover:underline">Learn More →</Link>
            </div>
            <div className="border-l-4 border-blue-600 pl-6">
                <h3 className="text-2xl font-bold mb-2 text-gray-800">Office Cleaning</h3>
                <p className="text-gray-600 mb-4">Professional office space cleaning tailored to your business needs</p>
              <Link href="/services" className="text-blue-600 font-semibold hover:underline">Learn More →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Animated Gallery (starts rotating when scrolled into view) */}
      <section className="py-8 px-4 md:px-8 bg-gray-50">
        <AnimatedCarousel
          images={[
            'https://source.unsplash.com/1200x800/?building,cleaning&sig=1',
            'https://source.unsplash.com/1200x800/?building,interior&sig=2',
            'https://source.unsplash.com/1200x800/?office,cleaning&sig=3',
            'https://source.unsplash.com/1200x800/?hotel,lobby&sig=4',
            'https://source.unsplash.com/1200x800/?apartment,clean&sig=5',
            'https://source.unsplash.com/1200x800/?industrial,warehouse&sig=6',
            'https://source.unsplash.com/1200x800/?modern,building&sig=7',
          ]}
        />
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready for a Cleaner Space?</h2>
          <p className="text-lg mb-8 text-blue-100">Contact us today for a free quote and consultation</p>
          <Link href="/contact">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-blue-50 transition">
              Schedule a Cleaning
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
}
