import { NextResponse } from 'next/server';

import { supabase } from '@/lib/supabase';

type AnalyticsEvent = {
  session_id: string;
  event_name: string;
  page_path: string;
  referrer: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  device_type: string | null;
  browser: string | null;
  engagement_time_ms: number | null;
  meta: Record<string, unknown> | null;
  created_at: string;
};

type ContactRow = {
  created_at: string;
  service_type: string | null;
  status: string | null;
};

function createDateBuckets(days: number) {
  const buckets: Record<string, { date: string; views: number; visitors: Set<string>; leads: number }> = {};

  for (let index = days - 1; index >= 0; index -= 1) {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() - index);
    const key = date.toISOString().slice(0, 10);
    buckets[key] = { date: key, views: 0, visitors: new Set(), leads: 0 };
  }

  return buckets;
}

function incrementCount(map: Record<string, number>, key: string) {
  map[key] = (map[key] || 0) + 1;
}

function pickTopItems(map: Record<string, number>, limit = 5) {
  return Object.entries(map)
    .sort((left, right) => right[1] - left[1])
    .slice(0, limit)
    .map(([label, value]) => ({ label, value }));
}

function getSourceLabel(event: AnalyticsEvent) {
  if (event.utm_source) {
    return event.utm_medium ? `${event.utm_source} / ${event.utm_medium}` : event.utm_source;
  }

  if (!event.referrer) {
    return 'Direct';
  }

  try {
    return new URL(event.referrer).hostname.replace(/^www\./, '');
  } catch {
    return event.referrer;
  }
}

export async function GET() {
  try {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 30);
    startDate.setHours(0, 0, 0, 0);

    const [{ data: events, error: eventsError }, { data: contacts, error: contactsError }] =
      await Promise.all([
        supabase
          .from('analytics_events')
          .select('session_id,event_name,page_path,referrer,utm_source,utm_medium,utm_campaign,device_type,browser,engagement_time_ms,meta,created_at')
          .gte('created_at', startDate.toISOString())
          .order('created_at', { ascending: false }),
        supabase
          .from('contacts')
          .select('created_at,service_type,status')
          .gte('created_at', startDate.toISOString())
          .order('created_at', { ascending: false }),
      ]);

    if (eventsError || contactsError) {
      return NextResponse.json(
        { error: eventsError?.message || contactsError?.message || 'Failed to fetch analytics' },
        { status: 500 }
      );
    }

    const typedEvents = (events || []) as AnalyticsEvent[];
    const typedContacts = (contacts || []) as ContactRow[];
    const pageViews = typedEvents.filter((event) => event.event_name === 'page_view');
    const pageExits = typedEvents.filter((event) => event.event_name === 'page_exit');
    const keyEvents = typedEvents.filter(
      (event) => !['page_view', 'page_exit'].includes(event.event_name)
    );
    const sessionPageViews: Record<string, number> = {};
    const topPagesMap: Record<string, number> = {};
    const sourcesMap: Record<string, number> = {};
    const devicesMap: Record<string, number> = {};
    const browsersMap: Record<string, number> = {};
    const eventsMap: Record<string, number> = {};
    const serviceLeadsMap: Record<string, number> = {};
    const leadStatusMap: Record<string, number> = {};
    const trendBuckets = createDateBuckets(30);

    pageViews.forEach((event) => {
      sessionPageViews[event.session_id] = (sessionPageViews[event.session_id] || 0) + 1;
      incrementCount(topPagesMap, event.page_path);
      incrementCount(sourcesMap, getSourceLabel(event));
      incrementCount(devicesMap, event.device_type || 'unknown');
      incrementCount(browsersMap, event.browser || 'unknown');

      const bucketKey = event.created_at.slice(0, 10);
      const bucket = trendBuckets[bucketKey];
      if (bucket) {
        bucket.views += 1;
        bucket.visitors.add(event.session_id);
      }
    });

    keyEvents.forEach((event) => {
      incrementCount(eventsMap, event.event_name);
    });

    typedContacts.forEach((contact) => {
      incrementCount(serviceLeadsMap, contact.service_type || 'unspecified');
      incrementCount(leadStatusMap, contact.status || 'unknown');
      const bucket = trendBuckets[contact.created_at.slice(0, 10)];
      if (bucket) {
        bucket.leads += 1;
      }
    });

    const uniqueVisitors = new Set(pageViews.map((event) => event.session_id)).size;
    const bouncedSessions = Object.values(sessionPageViews).filter((count) => count <= 1).length;
    const conversionRate = pageViews.length ? (typedContacts.length / pageViews.length) * 100 : 0;
    const avgPagesPerSession = uniqueVisitors ? pageViews.length / uniqueVisitors : 0;
    const avgEngagementSeconds = pageExits.length
      ? pageExits.reduce((total, event) => total + (event.engagement_time_ms || 0), 0) / pageExits.length / 1000
      : 0;

    return NextResponse.json({
      overview: {
        pageViews: pageViews.length,
        uniqueVisitors,
        totalLeads: typedContacts.length,
        conversionRate,
        avgPagesPerSession,
        bounceRate: uniqueVisitors ? (bouncedSessions / uniqueVisitors) * 100 : 0,
        avgEngagementSeconds,
      },
      topPages: pickTopItems(topPagesMap, 6),
      trafficSources: pickTopItems(sourcesMap, 6),
      devices: pickTopItems(devicesMap, 4),
      browsers: pickTopItems(browsersMap, 4),
      keyEvents: pickTopItems(eventsMap, 6),
      leadServices: pickTopItems(serviceLeadsMap, 6),
      leadStatuses: pickTopItems(leadStatusMap, 6),
      trend: Object.values(trendBuckets).map((bucket) => ({
        date: bucket.date,
        views: bucket.views,
        visitors: bucket.visitors.size,
        leads: bucket.leads,
      })),
    });
  } catch (error) {
    console.error('Admin analytics error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics dashboard data' },
      { status: 500 }
    );
  }
}
