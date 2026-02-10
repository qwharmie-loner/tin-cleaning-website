import Link from 'next/link';
import {
  Hotel,
  Building2,
  Home,
  Zap,
  UtensilsCrossed,
  Briefcase,
  GraduationCap,
  TrendingUp,
  Users,
  Wallet
} from 'lucide-react';
import AnimatedServiceText from '@/components/AnimatedServiceText';

const services = [
  {
    id: 1,
    title: 'Hotel Cleaning',
    icon: Hotel,
    description: 'Housekeeping & public areas - professional hospitality cleaning services',
    features: ['Housekeeping', 'Public areas', 'Daily maintenance', 'Guest room cleaning']
  },
  {
    id: 2,
    title: 'Office Cleaning',
    icon: Building2,
    description: 'Professional office space cleaning tailored to your business needs',
    features: ['Office cleaning', 'Desk sanitation', 'Eco-friendly products', 'Flexible scheduling']
  },
  {
    id: 3,
    title: 'Apartment Cleaning',
    icon: Home,
    description: 'Comprehensive apartment cleaning for residential spaces',
    features: ['Deep cleaning', 'Regular maintenance', 'Move-in cleaning', 'Post-renovation cleanup']
  },
  {
    id: 4,
    title: 'Industrial Cleaning',
    icon: Zap,
    description: 'Heavy-duty industrial and facility cleaning services',
    features: ['Factory cleaning', 'Warehouse cleaning', 'Equipment sanitization', 'Safety compliance']
  },
  {
    id: 5,
    title: 'Dish Washing Services',
    icon: UtensilsCrossed,
    description: 'Professional commercial dishwashing and warewashing services',
    features: ['Commercial dishes', 'Sanitization', 'Fast turnaround', 'Quality assured']
  }
];

const additionalServices = [
  {
    id: 1,
    title: 'Business Consultation',
    icon: Briefcase,
    description:
      'Practical guidance on operations, compliance, and market entry in Hungary with a results-focused approach.',
    features: ['Operations support', 'Compliance guidance', 'Market entry insights', 'Growth planning']
  },
  {
    id: 2,
    title: 'Education Assistance',
    icon: GraduationCap,
    description:
      'Support for individuals navigating education opportunities in Hungary, from documentation to integration.',
    features: ['Process guidance', 'Documentation support', 'Application help', 'Integration assistance']
  },
  {
    id: 3,
    title: 'Business Development',
    icon: TrendingUp,
    description:
      'Strategic services that strengthen operations, improve efficiency, and identify growth opportunities.',
    features: ['Strategic planning', 'Operational structuring', 'Efficiency improvements', 'Partnership support']
  },
  {
    id: 4,
    title: 'Work Opportunities (Hospitality)',
    icon: Users,
    description:
      'Workforce management and recruitment support connecting qualified individuals with hospitality roles.',
    features: ['Recruitment support', 'Workforce management', 'Hospitality roles', 'Quality standards']
  },
  {
    id: 5,
    title: 'Financial Consulting',
    icon: Wallet,
    description:
      'Basic financial guidance focused on budgeting, cost planning, and sound operational decisions.',
    features: ['Budget planning', 'Cost control', 'Resource management', 'Financial guidance']
  }
];

export default function Services() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-yellow-400 via-blue-600 to-blue-800 text-white py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-xl text-blue-100">
            <AnimatedServiceText 
              englishText="Comprehensive cleaning solutions for every need" 
              hungarianText="Átfogó takarítási megoldások minden szükséglethez"
              duration={3}
            />
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const IconComponent = service.icon;
              return (
                <div key={service.id} className="bg-gray-50 p-8 rounded-lg border border-gray-200 hover:shadow-lg transition">
                  <div className="flex items-center mb-4">
                    <IconComponent className="w-12 h-12 text-blue-600 mr-4" />
                    <h3 className="text-2xl font-bold text-gray-800">{service.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="text-gray-700 flex items-center">
                        <span className="text-blue-600 mr-2">✓</span> {feature}
                      </li>
                    ))}
                  </ul>
                  <Link href="/contact">
                    <button className="text-blue-600 font-semibold hover:text-blue-800 transition">
                      Learn More →
                    </button>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="bg-gray-50 py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">OUR ADDITIONAL SERVICES</h2>
            <p className="text-gray-600 mt-3 max-w-3xl mx-auto">
              Expanded support services to help individuals and organizations succeed in Hungary.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {additionalServices.map((service) => {
              const IconComponent = service.icon;
              return (
                <div
                  key={service.id}
                  className="bg-white p-8 rounded-lg border border-gray-200 hover:shadow-lg transition"
                >
                  <div className="flex items-center mb-4">
                    <IconComponent className="w-12 h-12 text-blue-600 mr-4" />
                    <h3 className="text-2xl font-bold text-gray-800">{service.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="text-gray-700 flex items-center">
                        <span className="text-blue-600 mr-2">✓</span> {feature}
                      </li>
                    ))}
                  </ul>
                  <Link href="/contact">
                    <button className="text-blue-600 font-semibold hover:text-blue-800 transition">
                      Learn More →
                    </button>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="bg-gray-50 py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Simple, Transparent Pricing</h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-8">
            All quotes are free and customized based on your specific needs. No hidden fees, no surprises.
          </p>
          <div className="text-center">
            <Link href="/contact">
              <button className="bg-gradient-to-r from-yellow-400 to-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:opacity-95 transition">
                Get a Free Quote
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-yellow-400 to-blue-600 text-white py-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <AnimatedServiceText 
              englishText="Ready to Experience the Difference?" 
              hungarianText="Készen áll a különbség megtapasztalására?"
              duration={3}
            />
          </h2>
          <p className="text-lg mb-8 text-blue-100">Contact us today for a free consultation and quote</p>
          <Link href="/contact">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-blue-50 transition">
              Contact Us Now
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
}
