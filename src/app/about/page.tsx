import Link from 'next/link';
import { Award, Users, CheckCircle, Heart } from 'lucide-react';

export default function About() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-yellow-400 via-blue-600 to-blue-800 text-white py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About TIN GROUP SERVICES KFT.</h1>
          <p className="text-xl text-blue-100">Trusted cleaning professionals since 2023</p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Our Story</h2>
            <p className="text-gray-600 mb-4">
              Tin Group Services Kft is a registered hospitality and professional cleaning company operating in Hungary under the authorization of the Hungarian Labour Authority.</p>

              <p className="text-gray-600 mb-4">Although the company was officially registered in September 2025, our operational experience in the cleaning and housekeeping industry dates back to 2023.
               Over the years, we have built a strong foundation based on professionalism, reliability, and attention to detail.</p>

              <p className="text-gray-600 mb-4">We currently work with a dedicated team of over 30 trained cleaning and housekeeping professionals, each with a minimum of three years of hands on experience.
                 Our team is carefully selected, well supervised, and committed to delivering consistent, high quality service across all assignments.</p>

              <p className="text-gray-600 mb-4"> Tin Group Services Kft provides cleaning and housekeeping services for residential homes, offices, hospitality facilities, and commercial spaces. We understand that cleanliness is not only about appearance, but also about comfort, health, productivity, and peace of mind.

              Our approach is client focused. </p>
              <p className="text-gray-600 mb-4">We assess each space individually, apply professional cleaning standards, and tailor our services to meet the specific needs of our clients. Whether serving private individuals or companies, we maintain the same level of excellence, discretion, and professionalism.
              At Tin Group Services Kft, we believe that clean spaces create better experiences. This belief is reflected in our motto:
              Tiszta Terek, Boldog Ügyfelek.
              Clean Spaces, Happy Clients.
            </p>
          </div>
          <div className="bg-blue-100 rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">By The Numbers</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <span className="text-4xl font-bold text-blue-600 mr-4">3+</span>
                <span className="text-gray-600">Years of Experience</span>
              </div>
              <div className="flex items-center">
                <span className="text-4xl font-bold text-blue-600 mr-4">50+</span>
                <span className="text-gray-600">Satisfied Customers</span>
              </div>
              <div className="flex items-center">
                <span className="text-4xl font-bold text-blue-600 mr-4">100+</span>
                <span className="text-gray-600">Cleanings Completed</span>
              </div>
              <div className="flex items-center">
                <span className="text-4xl font-bold text-blue-600 mr-4">98%</span>
                <span className="text-gray-600">Customer Satisfaction</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-gray-50 py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Our Core Values</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <Award className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2 text-gray-800">Excellence</h3>
              <p className="text-gray-600">We strive for perfection in every cleaning job we undertake</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2 text-gray-800">Reliability</h3>
              <p className="text-gray-600">You can count on us to show up on time, every time</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <CheckCircle className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2 text-gray-800">Integrity</h3>
              <p className="text-gray-600">Honest pricing and transparent communication always</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <Heart className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2 text-gray-800">Care</h3>
              <p className="text-gray-600">We treat your space like it's our own home</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Meet Our Team</h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-8">
            Our team consists of experienced, trained, and background-checked professionals dedicated to providing top-quality cleaning services.
          </p>
          <div className="text-center">
            <Link href="/contact">
              <button className="bg-gradient-to-r from-yellow-400 to-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:opacity-95 transition">
                Schedule a Service
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-yellow-400 to-blue-600 text-white py-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Experience Clean?</h2>
          <p className="text-lg mb-8 text-blue-100">Let us show you what professional cleaning is all about</p>
          <Link href="/contact">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-blue-50 transition">
              Get Started Today
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
}
