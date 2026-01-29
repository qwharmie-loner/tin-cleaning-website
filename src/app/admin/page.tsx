'use client';

import { useEffect, useState } from 'react';
import { Trash2, Eye, Check, Clock } from 'lucide-react';

interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
  service_type: string;
  message: string;
  created_at: string;
  status: string;
}

export default function AdminDashboard() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [filterStatus, setFilterStatus] = useState('all');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple password check - in production, use proper authentication
    if (password === 'tingroupadmin2024') {
      setIsAuthenticated(true);
      setPassword('');
      fetchContacts();
    } else {
      setError('Invalid password');
    }
  };

  const fetchContacts = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/admin/contacts');
      if (!response.ok) {
        throw new Error('Failed to fetch contacts');
      }
      const data = await response.json();
      setContacts(data.contacts || []);
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const updateStatus = async (id: number, status: string) => {
    try {
      const response = await fetch(`/api/admin/contacts/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        setContacts(contacts.map(c => c.id === id ? { ...c, status } : c));
        if (selectedContact?.id === id) {
          setSelectedContact({ ...selectedContact, status });
        }
      }
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const deleteContact = async (id: number) => {
    if (!confirm('Are you sure you want to delete this contact?')) return;

    try {
      const response = await fetch(`/api/admin/contacts/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setContacts(contacts.filter(c => c.id !== id));
        if (selectedContact?.id === id) {
          setSelectedContact(null);
        }
      }
    } catch (err) {
      console.error('Error deleting contact:', err);
    }
  };

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-gray-100 py-16 px-4 md:px-8">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-8 text-gray-800">Admin Login</h1>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                placeholder="Enter admin password"
              />
            </div>
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-yellow-400 to-blue-600 text-white py-2 rounded-lg font-bold hover:opacity-95 transition"
            >
              Login
            </button>
          </form>
        </div>
      </main>
    );
  }

  const filteredContacts = contacts.filter(c => 
    filterStatus === 'all' ? true : c.status === filterStatus
  );

  return (
    <main className="min-h-screen bg-gray-100 py-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Contact Submissions</h1>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg mb-8">
            {error}
          </div>
        )}

        <div className="mb-6 flex gap-4">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
          >
            <option value="all">All Submissions</option>
            <option value="new">New</option>
            <option value="in_progress">In Progress</option>
            <option value="contacted">Contacted</option>
            <option value="completed">Completed</option>
          </select>
          <button
            onClick={fetchContacts}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Refresh
          </button>
        </div>

        {isLoading ? (
          <div className="text-center text-gray-600">Loading...</div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contacts List */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-200">
                      <tr>
                        <th className="px-6 py-3 text-left font-semibold text-gray-800">Name</th>
                        <th className="px-6 py-3 text-left font-semibold text-gray-800">Email</th>
                        <th className="px-6 py-3 text-left font-semibold text-gray-800">Service</th>
                        <th className="px-6 py-3 text-left font-semibold text-gray-800">Status</th>
                        <th className="px-6 py-3 text-left font-semibold text-gray-800">Date</th>
                        <th className="px-6 py-3 text-center font-semibold text-gray-800">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredContacts.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="px-6 py-8 text-center text-gray-600">
                            No submissions found
                          </td>
                        </tr>
                      ) : (
                        filteredContacts.map((contact) => (
                          <tr
                            key={contact.id}
                            className="border-t border-gray-200 hover:bg-gray-50 cursor-pointer"
                            onClick={() => setSelectedContact(contact)}
                          >
                            <td className="px-6 py-4 font-semibold text-gray-800">{contact.name}</td>
                            <td className="px-6 py-4 text-gray-600 text-sm">{contact.email}</td>
                            <td className="px-6 py-4 text-gray-600 capitalize text-sm">{contact.service_type}</td>
                            <td className="px-6 py-4">
                              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                contact.status === 'new' ? 'bg-blue-100 text-blue-800' :
                                contact.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' :
                                contact.status === 'contacted' ? 'bg-purple-100 text-purple-800' :
                                'bg-green-100 text-green-800'
                              }`}>
                                {contact.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-gray-600 text-sm">
                              {new Date(contact.created_at).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 text-center">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedContact(contact);
                                }}
                                className="text-blue-600 hover:text-blue-800 mr-3"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteContact(contact.id);
                                }}
                                className="text-red-600 hover:text-red-800"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Contact Details */}
            {selectedContact && (
              <div className="bg-white rounded-lg shadow-lg p-6 h-fit sticky top-4">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Contact Details</h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-600 text-sm">Name</p>
                    <p className="font-semibold text-gray-800">{selectedContact.name}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Email</p>
                    <a href={`mailto:${selectedContact.email}`} className="text-blue-600 hover:underline">
                      {selectedContact.email}
                    </a>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Phone</p>
                    <a href={`tel:${selectedContact.phone}`} className="text-blue-600 hover:underline">
                      {selectedContact.phone}
                    </a>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Service Type</p>
                    <p className="font-semibold text-gray-800 capitalize">{selectedContact.service_type}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Date</p>
                    <p className="font-semibold text-gray-800">
                      {new Date(selectedContact.created_at).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Status</p>
                    <select
                      value={selectedContact.status}
                      onChange={(e) => updateStatus(selectedContact.id, e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 mt-1"
                    >
                      <option value="new">New</option>
                      <option value="in_progress">In Progress</option>
                      <option value="contacted">Contacted</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-gray-600 text-sm mb-2">Message</p>
                    <p className="text-gray-800 text-sm bg-gray-50 p-3 rounded-lg">
                      {selectedContact.message}
                    </p>
                  </div>
                  <div className="flex gap-2 pt-4">
                    <button
                      onClick={() => deleteContact(selectedContact.id)}
                      className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition flex items-center justify-center gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
