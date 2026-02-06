import Link from 'next/link';
import { Star } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'Modern Office Space Transformation',
    category: 'Commercial',
    description: 'Complete office cleaning and organization for a 5,000 sq ft corporate space',
    image: '🏢'
  },
  {
    id: 2,
    title: 'Residential Deep Clean',
    category: 'Residential',
    description: 'Comprehensive deep cleaning of a 3-bedroom home',
    image: '🏠'
  },
  {
    id: 3,
    title: 'Post-Renovation Cleanup',
    category: 'Specialty',
    description: 'Professional cleanup after complete home renovation',
    image: '🔨'
  },
  {
    id: 4,
    title: 'Retail Store Refresh',
    category: 'Commercial',
    description: 'Regular maintenance cleaning for busy retail environment',
    image: '🛍️'
  },
  {
    id: 5,
    title: 'Move-Out Cleaning',
    category: 'Residential',
    description: 'Move-out cleaning for property return in pristine condition',
    image: '📦'
  },
  {
    id: 6,
    title: 'Restaurant Deep Clean',
    category: 'Commercial',
    description: 'Specialized deep cleaning for food service establishment',
    image: '🍽️'
  }
];

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Homeowner',
    text: 'TIN GROUP SERVICES transformed my home! The team was professional, efficient, and thorough. I highly recommend their services.',
    rating: 5
  },
  {
    name: 'Michael Chen',
    role: 'Office Manager',
    text: 'We switched to TIN GROUP SERVICES for our office cleaning and couldn\'t be happier. Our workplace has never looked better.',
    rating: 5
  },
  {
    name: 'Emily Rodriguez',
    role: 'Restaurant Owner',
    text: 'Professional, reliable, and trustworthy. They keep our restaurant spotless and our customers always comment on cleanliness.',
    rating: 5
  }
];

export default function Portfolio() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-yellow-400 via-blue-600 to-blue-800 text-white py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Work</h1>
          <p className="text-xl text-blue-100">See the difference our professional cleaning services make</p>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Recent Projects</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div key={project.id} className="bg-gray-50 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition">
                <div className="bg-gradient-to-br from-blue-100 to-blue-200 h-40 flex items-center justify-center text-6xl">
                  {project.image}
                </div>
                <div className="p-6">
                  <span className="text-blue-600 text-sm font-semibold">{project.category}</span>
                  <h3 className="text-xl font-bold text-gray-800 mt-2 mb-3">{project.title}</h3>
                  <p className="text-gray-600">{project.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-50 py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Client Testimonials</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="bg-white p-8 rounded-lg shadow-md">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.text}"</p>
                <div className="border-t pt-4">
                  <p className="font-bold text-gray-800">{testimonial.name}</p>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Stats */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Our Portfolio Stats</h2>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">100+</div>
              <p className="text-gray-600">Projects (Cleaning) Completed</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">50+</div>
              <p className="text-gray-600">Happy Clients</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">98%</div>
              <p className="text-gray-600">Satisfaction Rate</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">3+</div>
              <p className="text-gray-600">Years in Business</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-yellow-400 to-blue-600 text-white py-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Impressed by Our Work?</h2>
          <p className="text-lg mb-8 text-blue-100">Let us show you what we can do for your home or business</p>
          <Link href="/contact">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-blue-50 transition">
              Request a Free Cleaning Estimate
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
}
