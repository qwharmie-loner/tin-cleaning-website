export const revalidate = 0;

import Link from 'next/link';
import { CheckCircle, Star, Users } from 'lucide-react';

import AnimatedServiceText from '@/components/AnimatedServiceText';
import AnimatedCarousel from '@/components/AnimatedCarousel';
import AutoPlayVideo from '@/components/AutoPlayVideo';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <section className="bg-gradient-to-r from-yellow-400 via-blue-600 to-blue-800 px-4 py-20 text-white md:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-6 text-5xl font-bold md:text-6xl">TIN GROUP SERVICES KFT.</h1>
          <p className="mb-4 text-xl text-blue-100 md:text-2xl">
            <AnimatedServiceText
              englishText="Clean Spaces, Happy Clients !"
              hungarianText="Tiszta Terek, Boldog Ãœgyfelek !"
              duration={3}
            />
          </p>
          <p className="mb-8 text-lg text-blue-100 md:text-xl">Professional services & more.</p>
          <Link
            href="/contact"
            data-analytics-event="cta_click"
            data-analytics-label="request-services-today"
            data-analytics-location="home-hero"
          >
            <button className="rounded-lg bg-white px-8 py-3 font-bold text-blue-600 transition hover:bg-blue-50">
              Request Our Services Today
            </button>
          </Link>
        </div>
      </section>

      <section className="bg-gray-50 px-4 py-16 md:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-800 md:text-4xl">Why Choose Us?</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-lg bg-white p-8 shadow-md">
              <CheckCircle className="mb-4 h-12 w-12 text-blue-600" />
              <h3 className="mb-2 text-xl font-bold text-gray-800">Eco-Friendly</h3>
              <p className="text-gray-600">We use environmentally safe and sustainable cleaning products</p>
            </div>
            <div className="rounded-lg bg-white p-8 shadow-md">
              <Star className="mb-4 h-12 w-12 text-blue-600" />
              <h3 className="mb-2 text-xl font-bold text-gray-800">Trusted & Reliable</h3>
              <p className="text-gray-600">Over 3+ years of experience with thousands of satisfied customers</p>
            </div>
            <div className="rounded-lg bg-white p-8 shadow-md">
              <Users className="mb-4 h-12 w-12 text-blue-600" />
              <h3 className="mb-2 text-xl font-bold text-gray-800">Professional Team</h3>
              <p className="text-gray-600">Fully trained and background-checked cleaning professionals</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-16 md:px-8">
        <div className="mx-auto max-w-sm md:max-w-md">
          <div className="overflow-hidden rounded-2xl border border-gray-100 shadow-lg">
            <div className="relative aspect-[9/16] w-full bg-gray-100">
              <AutoPlayVideo
                className="h-full w-full object-cover"
                src="/intro.mp4"
                poster="/videos/hero-poster.jpg"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 md:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-800 md:text-4xl">Our Services</h2>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="border-l-4 border-blue-600 pl-6">
              <h3 className="mb-2 text-2xl font-bold text-gray-800">Hotel Cleaning</h3>
              <p className="mb-4 text-gray-600">
                Housekeeping & public areas - professional hospitality cleaning services
              </p>
              <Link
                href="/services"
                className="font-semibold text-blue-600 hover:underline"
                data-analytics-event="service_interest"
                data-analytics-label="hotel-cleaning"
                data-analytics-location="home-services"
              >
                Learn More â†’
              </Link>
            </div>
            <div className="border-l-4 border-blue-600 pl-6">
              <h3 className="mb-2 text-2xl font-bold text-gray-800">Office Cleaning</h3>
              <p className="mb-4 text-gray-600">
                Professional office space cleaning tailored to your business needs
              </p>
              <Link
                href="/services"
                className="font-semibold text-blue-600 hover:underline"
                data-analytics-event="service_interest"
                data-analytics-label="office-cleaning"
                data-analytics-location="home-services"
              >
                Learn More â†’
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 px-4 py-8 md:px-8">
        <AnimatedCarousel
          images={[
            'https://images.unsplash.com/photo-1527789050516-e6d3d96f04d9?w=1200&h=600&fit=crop',
            'https://images.unsplash.com/photo-1563453392-fb7ded529bdc?w=1200&h=600&fit=crop',
            'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1200&h=600&fit=crop',
            'https://images.unsplash.com/photo-1503387762519-52582b950d65?w=1200&h=600&fit=crop',
            'https://images.unsplash.com/photo-1551632786-12dff90df45f?w=1200&h=600&fit=crop',
            'https://images.unsplash.com/photo-1584622181563-430f63602d4b?w=1200&h=600&fit=crop',
            'https://images.unsplash.com/photo-1569228160330-67dc70d3c847?w=1200&h=600&fit=crop',
          ]}
        />
      </section>

      <section className="bg-blue-600 px-4 py-16 text-white md:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-6 text-3xl font-bold md:text-4xl">Ready for a Cleaner Space?</h2>
          <p className="mb-8 text-lg text-blue-100">Contact us today for a free quote and consultation</p>
          <Link
            href="/contact"
            data-analytics-event="cta_click"
            data-analytics-label="schedule-cleaning"
            data-analytics-location="home-bottom-cta"
          >
            <button className="rounded-lg bg-white px-8 py-3 font-bold text-blue-600 transition hover:bg-blue-50">
              Schedule a Cleaning
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
}
