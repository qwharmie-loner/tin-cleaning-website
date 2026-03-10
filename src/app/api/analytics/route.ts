import { NextResponse } from 'next/server';

import { supabase } from '@/lib/supabase';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      sessionId,
      eventName,
      pagePath,
      pageTitle,
      referrer,
      utmSource,
      utmMedium,
      utmCampaign,
      deviceType,
      browser,
      os,
      viewportWidth,
      viewportHeight,
      engagementTimeMs,
      meta,
    } = body;

    if (!sessionId || !eventName || !pagePath) {
      return NextResponse.json(
        { error: 'sessionId, eventName and pagePath are required' },
        { status: 400 }
      );
    }

    const { error } = await supabase.from('analytics_events').insert([
      {
        session_id: sessionId,
        event_name: eventName,
        page_path: pagePath,
        page_title: pageTitle || null,
        referrer: referrer || null,
        utm_source: utmSource || null,
        utm_medium: utmMedium || null,
        utm_campaign: utmCampaign || null,
        device_type: deviceType || null,
        browser: browser || null,
        os: os || null,
        viewport_width: viewportWidth || null,
        viewport_height: viewportHeight || null,
        engagement_time_ms: engagementTimeMs || null,
        meta: meta || {},
      },
    ]);

    if (error) {
      console.error('Analytics insert error:', error);
      return NextResponse.json(
        { error: 'Failed to store analytics event' },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Analytics API error:', error);
    return NextResponse.json(
      { error: 'Failed to process analytics event' },
      { status: 500 }
    );
  }
}
