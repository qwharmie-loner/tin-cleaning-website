'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { BarChart3, Eye, RefreshCw, Trash2, Users } from 'lucide-react';

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

interface MetricItem {
  label: string;
  value: number;
}

interface TrendPoint {
  date: string;
  views: number;
  visitors: number;
  leads: number;
}

interface AnalyticsResponse {
  overview: {
    pageViews: number;
    uniqueVisitors: number;
    totalLeads: number;
    conversionRate: number;
    avgPagesPerSession: number;
    bounceRate: number;
    avgEngagementSeconds: number;
  };
  topPages: MetricItem[];
  trafficSources: MetricItem[];
  devices: MetricItem[];
  browsers: MetricItem[];
  keyEvents: MetricItem[];
  leadServices: MetricItem[];
  leadStatuses: MetricItem[];
  trend: TrendPoint[];
}

type DateFilter = 'all' | 'today' | '7days' | '30days' | 'older';

const ADMIN_SESSION_KEY = 'tin_group_admin_session_expires_at';
const ADMIN_SESSION_DURATION_MS = 30 * 60 * 1000;

const emptyAnalytics: AnalyticsResponse = {
  overview: {
    pageViews: 0,
    uniqueVisitors: 0,
    totalLeads: 0,
    conversionRate: 0,
    avgPagesPerSession: 0,
    bounceRate: 0,
    avgEngagementSeconds: 0,
  },
  topPages: [],
  trafficSources: [],
  devices: [],
  browsers: [],
  keyEvents: [],
  leadServices: [],
  leadStatuses: [],
  trend: [],
};

function formatMetric(value: number, fractionDigits = 0) {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(value);
}

function formatPercent(value: number) {
  return `${formatMetric(value, 1)}%`;
}

function getStatusColor(status: string) {
  switch (status) {
    case 'new':
      return 'bg-blue-100 text-blue-700';
    case 'in_progress':
      return 'bg-yellow-100 text-yellow-700';
    case 'contacted':
      return 'bg-purple-100 text-purple-700';
    case 'completed':
      return 'bg-green-100 text-green-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
}

function renderMetricList(items: MetricItem[], emptyMessage: string) {
  if (items.length === 0) {
    return <p className="text-sm text-gray-500">{emptyMessage}</p>;
  }

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div key={item.label} className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3">
          <span className="text-sm text-gray-700">{item.label}</span>
          <span className="font-semibold text-gray-900">{formatMetric(item.value)}</span>
        </div>
      ))}
    </div>
  );
}

export default function AdminDashboard() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsResponse>(emptyAnalytics);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDate, setFilterDate] = useState<DateFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const logoutTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearLogoutTimer = useCallback(() => {
    if (logoutTimerRef.current) {
      clearTimeout(logoutTimerRef.current);
      logoutTimerRef.current = null;
    }
  }, []);

  const logout = useCallback(() => {
    clearLogoutTimer();
    window.localStorage.removeItem(ADMIN_SESSION_KEY);
    setIsAuthenticated(false);
    setIsLoading(true);
    setAnalytics(emptyAnalytics);
  }, [clearLogoutTimer]);

  const startLogoutTimer = useCallback((expiresAt: number) => {
    clearLogoutTimer();
    const remainingTime = expiresAt - Date.now();

    if (remainingTime <= 0) {
      logout();
      return;
    }

    logoutTimerRef.current = setTimeout(() => {
      logout();
    }, remainingTime);
  }, [clearLogoutTimer, logout]);

  const refreshAdminSession = useCallback(() => {
    const expiresAt = Date.now() + ADMIN_SESSION_DURATION_MS;
    window.localStorage.setItem(ADMIN_SESSION_KEY, String(expiresAt));
    startLogoutTimer(expiresAt);
  }, [startLogoutTimer]);

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      setIsRefreshing(true);
      const [contactsResponse, analyticsResponse] = await Promise.all([
        fetch('/api/admin/contacts'),
        fetch('/api/admin/analytics'),
      ]);

      if (!contactsResponse.ok) {
        throw new Error('Failed to fetch contacts');
      }

      if (!analyticsResponse.ok) {
        throw new Error('Failed to fetch analytics');
      }

      const contactsData = await contactsResponse.json();
      const analyticsData = await analyticsResponse.json();

      setContacts(contactsData.contacts || []);
      setAnalytics(analyticsData || emptyAnalytics);
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (password === 'tingroupadmin2024') {
      setIsAuthenticated(true);
      setPassword('');
      refreshAdminSession();
      return;
    }

    setError('Invalid password');
  };

  const updateStatus = async (id: number, status: string) => {
    try {
      const response = await fetch(`/api/admin/contacts/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error('Failed to update contact');
      }

      setContacts((currentContacts) =>
        currentContacts.map((contact) =>
          contact.id === id ? { ...contact, status } : contact
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update contact');
    }
  };

  const deleteContact = async (id: number) => {
    if (!confirm('Are you sure you want to delete this contact?')) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/contacts/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete contact');
      }

      setContacts((currentContacts) =>
        currentContacts.filter((contact) => contact.id !== id)
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete contact');
    }
  };

  const isWithinDateFilter = (createdAt: string) => {
    const created = new Date(createdAt);
    const now = new Date();

    switch (filterDate) {
      case 'today':
        return created.toDateString() === now.toDateString();
      case '7days': {
        const date = new Date();
        date.setDate(now.getDate() - 7);
        return created >= date;
      }
      case '30days': {
        const date = new Date();
        date.setDate(now.getDate() - 30);
        return created >= date;
      }
      case 'older': {
        const date = new Date();
        date.setDate(now.getDate() - 30);
        return created < date;
      }
      default:
        return true;
    }
  };

  const filteredContacts = contacts.filter((contact) => {
    const statusMatch = filterStatus === 'all' || contact.status === filterStatus;
    const dateMatch = isWithinDateFilter(contact.created_at);
    const query = searchQuery.toLowerCase();
    const service = contact.service_type || '';
    const message = contact.message || '';
    const searchMatch =
      contact.name.toLowerCase().includes(query) ||
      contact.email.toLowerCase().includes(query) ||
      service.toLowerCase().includes(query) ||
      message.toLowerCase().includes(query);

    return statusMatch && dateMatch && searchMatch;
  });

  useEffect(() => {
    const storedExpiry = window.localStorage.getItem(ADMIN_SESSION_KEY);
    if (!storedExpiry) {
      setIsLoading(false);
      return;
    }

    const expiresAt = Number(storedExpiry);
    if (!Number.isFinite(expiresAt) || expiresAt <= Date.now()) {
      window.localStorage.removeItem(ADMIN_SESSION_KEY);
      setIsLoading(false);
      return;
    }

    setIsAuthenticated(true);
    startLogoutTimer(expiresAt);
  }, [startLogoutTimer]);

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    void fetchDashboardData();
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated) {
      clearLogoutTimer();
      return;
    }

    const handleActivity = () => {
      refreshAdminSession();
    };

    const events: Array<keyof WindowEventMap> = [
      'click',
      'keydown',
      'mousemove',
      'scroll',
      'touchstart',
    ];

    events.forEach((eventName) => {
      window.addEventListener(eventName, handleActivity, { passive: true });
    });

    return () => {
      events.forEach((eventName) => {
        window.removeEventListener(eventName, handleActivity);
      });
    };
  }, [clearLogoutTimer, isAuthenticated, refreshAdminSession]);

  useEffect(() => {
    return () => {
      clearLogoutTimer();
    };
  }, [clearLogoutTimer]);

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-gray-100 px-4 py-16">
        <div className="mx-auto max-w-md rounded-2xl bg-white p-8 shadow-lg">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">Admin Login</h1>
          <p className="mb-6 text-sm text-gray-500">
            Analytics and lead management are available after sign-in.
          </p>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full rounded-lg border px-4 py-3"
            />
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button className="w-full rounded-lg bg-blue-600 py-3 text-white">
              Login
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-12">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex flex-col gap-4 rounded-3xl bg-white p-8 shadow-sm md:flex-row md:items-center md:justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
              Admin portal
            </p>
            <h1 className="text-4xl font-bold text-gray-900">
              Website analytics and leads
            </h1>
            <p className="mt-2 text-gray-500">
              Monitor traffic, engagement, conversions, and incoming contact requests in one place.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => void fetchDashboardData()}
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white"
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh
            </button>
            <button
              onClick={logout}
              className="rounded-lg bg-red-600 px-4 py-2 text-white"
            >
              Logout
            </button>
          </div>
        </div>

        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="rounded-2xl bg-white p-8 shadow-sm">
            <p className="text-gray-600">Loading dashboard...</p>
          </div>
        ) : (
          <>
            <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <div className="mb-3 inline-flex rounded-full bg-blue-100 p-3 text-blue-600">
                  <Eye className="h-5 w-5" />
                </div>
                <p className="text-sm text-gray-500">Page views (30 days)</p>
                <p className="mt-2 text-3xl font-bold text-gray-900">
                  {formatMetric(analytics.overview.pageViews)}
                </p>
                <p className="mt-2 text-sm text-gray-500">
                  Unique visitors: {formatMetric(analytics.overview.uniqueVisitors)}
                </p>
              </div>

              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <div className="mb-3 inline-flex rounded-full bg-emerald-100 p-3 text-emerald-600">
                  <Users className="h-5 w-5" />
                </div>
                <p className="text-sm text-gray-500">Lead submissions (30 days)</p>
                <p className="mt-2 text-3xl font-bold text-gray-900">
                  {formatMetric(analytics.overview.totalLeads)}
                </p>
                <p className="mt-2 text-sm text-gray-500">
                  Conversion rate: {formatPercent(analytics.overview.conversionRate)}
                </p>
              </div>

              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <div className="mb-3 inline-flex rounded-full bg-yellow-100 p-3 text-yellow-600">
                  <BarChart3 className="h-5 w-5" />
                </div>
                <p className="text-sm text-gray-500">Engagement quality</p>
                <p className="mt-2 text-3xl font-bold text-gray-900">
                  {formatMetric(analytics.overview.avgPagesPerSession, 1)}
                </p>
                <p className="mt-2 text-sm text-gray-500">Pages/session</p>
                <p className="mt-1 text-sm text-gray-500">
                  Bounce rate: {formatPercent(analytics.overview.bounceRate)}
                </p>
              </div>

              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <div className="mb-3 inline-flex rounded-full bg-purple-100 p-3 text-purple-600">
                  <RefreshCw className="h-5 w-5" />
                </div>
                <p className="text-sm text-gray-500">Average engagement</p>
                <p className="mt-2 text-3xl font-bold text-gray-900">
                  {formatMetric(analytics.overview.avgEngagementSeconds, 1)}s
                </p>
                <p className="mt-2 text-sm text-gray-500">Measured from page exit events</p>
              </div>
            </section>

            <section className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Traffic trend</h2>
                  <p className="text-sm text-gray-500">
                    Daily website activity for the last 30 days
                  </p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[560px]">
                    <thead className="border-b border-gray-200 text-left text-xs uppercase tracking-wide text-gray-500">
                      <tr>
                        <th className="pb-3 pr-4">Date</th>
                        <th className="pb-3 pr-4">Views</th>
                        <th className="pb-3 pr-4">Visitors</th>
                        <th className="pb-3">Leads</th>
                      </tr>
                    </thead>
                    <tbody>
                      {analytics.trend.map((point) => (
                        <tr key={point.date} className="border-b border-gray-100 text-sm text-gray-700">
                          <td className="py-3 pr-4">
                            {new Date(point.date).toLocaleDateString()}
                          </td>
                          <td className="py-3 pr-4">{formatMetric(point.views)}</td>
                          <td className="py-3 pr-4">{formatMetric(point.visitors)}</td>
                          <td className="py-3">{formatMetric(point.leads)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="space-y-6">
                <div className="rounded-2xl bg-white p-6 shadow-sm">
                  <h2 className="mb-4 text-xl font-bold text-gray-900">Top pages</h2>
                  {renderMetricList(analytics.topPages, 'No page views recorded yet.')}
                </div>
                <div className="rounded-2xl bg-white p-6 shadow-sm">
                  <h2 className="mb-4 text-xl font-bold text-gray-900">Traffic sources</h2>
                  {renderMetricList(analytics.trafficSources, 'No source data recorded yet.')}
                </div>
              </div>
            </section>

            <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-xl font-bold text-gray-900">Devices</h2>
                {renderMetricList(analytics.devices, 'No device data recorded yet.')}
              </div>
              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-xl font-bold text-gray-900">Browsers</h2>
                {renderMetricList(analytics.browsers, 'No browser data recorded yet.')}
              </div>
              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-xl font-bold text-gray-900">Key events</h2>
                {renderMetricList(analytics.keyEvents, 'No conversion or CTA events recorded yet.')}
              </div>
              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-xl font-bold text-gray-900">Lead services</h2>
                {renderMetricList(analytics.leadServices, 'No service inquiries recorded yet.')}
              </div>
            </section>

            <section className="rounded-2xl bg-white p-6 shadow-sm">
              <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Contact submissions</h2>
                  <p className="text-sm text-gray-500">
                    Review and manage leads without leaving the analytics portal.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <input
                    type="text"
                    placeholder="Search name, email, service, message..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-lg border px-4 py-2 md:w-80"
                  />
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="rounded-lg border px-4 py-2"
                  >
                    <option value="all">All status</option>
                    <option value="new">New</option>
                    <option value="in_progress">In progress</option>
                    <option value="contacted">Contacted</option>
                    <option value="completed">Completed</option>
                  </select>
                  <select
                    value={filterDate}
                    onChange={(e) => setFilterDate(e.target.value as DateFilter)}
                    className="rounded-lg border px-4 py-2"
                  >
                    <option value="all">All dates</option>
                    <option value="today">Today</option>
                    <option value="7days">Last 7 days</option>
                    <option value="30days">Last 30 days</option>
                    <option value="older">Older than 30 days</option>
                  </select>
                </div>
              </div>

              <div className="mb-6 grid gap-4 md:grid-cols-3">
                {analytics.leadStatuses.map((item) => (
                  <div key={item.label} className="rounded-xl bg-gray-50 px-4 py-4">
                    <p className="text-sm capitalize text-gray-500">
                      {item.label.replace('_', ' ')}
                    </p>
                    <p className="mt-2 text-2xl font-bold text-gray-900">
                      {formatMetric(item.value)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[900px]">
                  <thead className="border-b border-gray-200 bg-gray-50 text-left text-xs uppercase tracking-wide text-gray-500">
                    <tr>
                      <th className="px-4 py-3">Name</th>
                      <th className="px-4 py-3">Contact</th>
                      <th className="px-4 py-3">Service</th>
                      <th className="px-4 py-3">Message</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3">Date</th>
                      <th className="px-4 py-3 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredContacts.length === 0 && (
                      <tr>
                        <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                          No matching submissions
                        </td>
                      </tr>
                    )}

                    {filteredContacts.map((contact) => (
                      <tr key={contact.id} className="border-b border-gray-100 align-top text-sm text-gray-700">
                        <td className="px-4 py-4">
                          <p className="font-semibold text-gray-900">{contact.name}</p>
                        </td>
                        <td className="px-4 py-4">
                          <a href={`mailto:${contact.email}`} className="block text-blue-600 hover:underline">
                            {contact.email}
                          </a>
                          <a href={`tel:${contact.phone}`} className="block text-gray-500 hover:underline">
                            {contact.phone}
                          </a>
                        </td>
                        <td className="px-4 py-4 capitalize">{contact.service_type}</td>
                        <td className="max-w-xs px-4 py-4 text-gray-600">
                          <p>{contact.message}</p>
                        </td>
                        <td className="px-4 py-4">
                          <select
                            value={contact.status}
                            onChange={(e) => void updateStatus(contact.id, e.target.value)}
                            className={`rounded-full px-3 py-2 text-xs font-semibold ${getStatusColor(contact.status)}`}
                          >
                            <option value="new">New</option>
                            <option value="in_progress">In Progress</option>
                            <option value="contacted">Contacted</option>
                            <option value="completed">Completed</option>
                          </select>
                        </td>
                        <td className="px-4 py-4">{new Date(contact.created_at).toLocaleString()}</td>
                        <td className="px-4 py-4 text-center">
                          <button
                            onClick={() => void deleteContact(contact.id)}
                            className="rounded-lg bg-red-50 p-2 text-red-600 transition hover:bg-red-100"
                            aria-label={`Delete ${contact.name}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        )}
      </div>
    </main>
  );
}
