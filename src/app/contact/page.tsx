'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, CheckCircle, AlertCircle } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceType: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [statusType, setStatusType] = useState<'success' | 'error' | ''>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatusMessage('');
    setStatusType('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatusType('success');
        setStatusMessage('Message sent successfully! We will contact you soon.');
        setFormData({ name: '', email: '', phone: '', serviceType: '', message: '' });
      } else {
        setStatusType('error');
        setStatusMessage(data.message || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      setStatusType('error');
      setStatusMessage('An error occurred. Please try again later.');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-yellow-400 via-blue-600 to-blue-800 text-white py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-blue-100">Get in touch for a free quote or consultation</p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-bold mb-8 text-gray-800">Send us a Message</h2>
            <form onSubmit={submitForm} className="space-y-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 disabled:bg-gray-100"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 disabled:bg-gray-100"
                  placeholder="Your email"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 disabled:bg-gray-100"
                  placeholder="Your phone number"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Service Type</label>
                <select
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 disabled:bg-gray-100"
                >
                  <option value="">Select a service</option>
                  <option value="hotel">Hotel Cleaning</option>
                  <option value="office">Office Cleaning</option>
                  <option value="apartment">Apartment Cleaning</option>
                  <option value="industrial">Industrial Cleaning</option>
                  <option value="dishwashing">Dish Washing Services</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 disabled:bg-gray-100"
                  placeholder="Tell us about your cleaning needs"
                />
              </div>

              {/* Status Message */}
              {statusMessage && (
                <div className={`p-4 rounded-lg flex items-start gap-3 ${
                  statusType === 'success' 
                    ? 'bg-green-50 border border-green-200' 
                    : 'bg-red-50 border border-red-200'
                }`}>
                  {statusType === 'success' ? (
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                  )}
                  <p className={`${
                    statusType === 'success' ? 'text-green-800' : 'text-red-800'
                  }`}>
                    {statusMessage}
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-yellow-400 to-blue-600 text-white py-3 rounded-lg font-bold hover:opacity-95 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>

          {/* Contact Information Card */}
          <div>
            <h2 className="text-2xl font-bold mb-8 text-gray-800">Contact Information</h2>
            <div className="space-y-6">
              <div className="flex items-start">
                <Phone className="w-6 h-6 text-blue-600 mr-4 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">Phone</h3>
                  <p className="text-gray-600">+36 70 545 2856</p>
                  <p className="text-gray-600">Available for inquiries</p>
                </div>
              </div>
              <div className="flex items-start">
                <Mail className="w-6 h-6 text-blue-600 mr-4 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">Email</h3>
                  <p className="text-gray-600">tingroupservicekft@gmail.com</p>
                  <p className="text-gray-600">isaactn26@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="w-6 h-6 text-blue-600 mr-4 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">Address</h3>
                  <p className="text-gray-600">Budapest, Lágymányosi u. 12</p>
                  <p className="text-gray-600">1111, Flat 2, Hungary</p>
                </div>
              </div>
              <div className="flex items-start">
                <Clock className="w-6 h-6 text-blue-600 mr-4 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">Response Time</h3>
                  <p className="text-gray-600">We respond to all inquiries within 24 hours</p>
                </div>
              </div>
            </div>

            {/* Service Area */}
            <div className="bg-blue-50 p-6 rounded-lg mt-8">
              <h3 className="font-bold text-gray-800 mb-3">Service Area</h3>
              <p className="text-gray-600 text-sm">
                We proudly serve the greater metropolitan area and surrounding communities. If you're unsure whether we service your location, please don't hesitate to contact us.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section (Placeholder) */}
      <section className="bg-gray-100 py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-gray-800">Find Us</h2>
          <div className="bg-gray-300 rounded-lg h-96 flex items-center justify-center">
            <p className="text-gray-600">Map coming soon - Replace with your business location map</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-yellow-400 to-blue-600 text-white py-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Don't Wait for Clean</h2>
          <p className="text-lg mb-8 text-blue-100">Schedule your cleaning service today and experience the difference</p>
          <div className="flex gap-4 justify-center">
            <a href="tel:+36705452856">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-blue-50 transition">
                Call Now
              </button>
            </a>
            <Link href="/services">
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition">
                View Services
              </button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
