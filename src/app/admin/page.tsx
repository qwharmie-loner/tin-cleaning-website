'use client';

import { useState } from 'react';
import { Trash2, Eye } from 'lucide-react';

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

type DateFilter = 'all' | 'today' | '7days' | '30days' | 'older';

export default function AdminDashboard() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDate, setFilterDate] = useState<DateFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');

  /* ---------------- AUTH ---------------- */
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'tingroupadmin2024') {
      setIsAuthenticated(true);
      setPassword('');
      fetchContacts();
    } else {
      setError('Invalid password');
    }
  };

  /* ---------------- DATA ---------------- */
  const fetchContacts = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/admin/contacts');
      if (!response.ok) throw new Error('Failed to fetch contacts');
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
        setContacts(contacts.map(c => (c.id === id ? { ...c, status } : c)));
        if (selectedContact?.id === id) {
          setSelectedContact({ ...selectedContact, status });
        }
      }
    } catch (err) {
      console.error(err);
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
        if (selectedContact?.id === id) setSelectedContact(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  /* ---------------- FILTER HELPERS ---------------- */
  const isWithinDateFilter = (createdAt: string) => {
    const created = new Date(createdAt);
    const now = new Date();

    switch (filterDate) {
      case 'today':
        return created.toDateString() === now.toDateString();
      case '7days': {
        const d = new Date();
        d.setDate(now.getDate() - 7);
        return created >= d;
      }
      case '30days': {
        const d = new Date();
        d.setDate(now.getDate() - 30);
        return created >= d;
      }
      case 'older': {
        const d = new Date();
        d.setDate(now.getDate() - 30);
        return created < d;
      }
      default:
        return true;
    }
  };

  /* ---------------- COMBINED FILTER ---------------- */
  const filteredContacts = contacts.filter(contact => {
    const statusMatch =
      filterStatus === 'all' || contact.status === filterStatus;

    const dateMatch = isWithinDateFilter(contact.created_at);

    const query = searchQuery.toLowerCase();
    const searchMatch =
      contact.name.toLowerCase().includes(query) ||
      contact.email.toLowerCase().includes(query) ||
      contact.service_type.toLowerCase().includes(query);

    return statusMatch && dateMatch && searchMatch;
  });

  /* ---------------- LOGIN PAGE ---------------- */
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-gray-100 py-16 px-4">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow p-8">
          <h1 className="text-3xl font-bold mb-6">Admin Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full px-4 py-2 border rounded-lg"
            />
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg">
              Login
            </button>
          </form>
        </div>
      </main>
    );
  }

  /* ---------------- DASHBOARD ---------------- */
  return (
    <main className="min-h-screen bg-gray-100 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Contact Submissions</h1>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="bg-red-600 text-white px-4 py-2 rounded-lg"
          >
            Logout
          </button>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-wrap gap-4">
          <input
            type="text"
            placeholder="Search name, email or service..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 border rounded-lg w-full md:w-72"
          />

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border rounded-lg"
          >
            <option value="all">All Status</option>
            <option value="new">New</option>
            <option value="in_progress">In Progress</option>
            <option value="contacted">Contacted</option>
            <option value="completed">Completed</option>
          </select>

          <select
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value as DateFilter)}
            className="px-4 py-2 border rounded-lg"
          >
            <option value="all">All Dates</option>
            <option value="today">Today</option>
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="older">Older than 30 Days</option>
          </select>

          <button
            onClick={fetchContacts}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Refresh
          </button>
        </div>

        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left">Name</th>
                  <th className="px-4 py-3 text-left">Email</th>
                  <th className="px-4 py-3 text-left">Service</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left">Date</th>
                  <th className="px-4 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredContacts.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-6 text-center text-gray-500">
                      No matching submissions
                    </td>
                  </tr>
                )}

                {filteredContacts.map(contact => (
                  <tr
                    key={contact.id}
                    onClick={() => setSelectedContact(contact)}
                    className="border-t hover:bg-gray-50 cursor-pointer"
                  >
                    <td className="px-4 py-3 font-semibold">{contact.name}</td>
                    <td className="px-4 py-3 text-sm">{contact.email}</td>
                    <td className="px-4 py-3 capitalize text-sm">
                      {contact.service_type}
                    </td>
                    <td className="px-4 py-3 text-sm">{contact.status}</td>
                    <td className="px-4 py-3 text-sm">
                      {new Date(contact.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Eye className="inline w-4 h-4 text-blue-600 mr-3" />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteContact(contact.id);
                        }}
                        className="text-red-600"
                      >
                        <Trash2 className="w-4 h-4 inline" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
