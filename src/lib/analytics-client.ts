'use client';

export interface AnalyticsEventPayload {
  eventName: string;
  pagePath: string;
  pageTitle?: string;
  referrer?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  deviceType?: string;
  browser?: string;
  os?: string;
  viewportWidth?: number;
  viewportHeight?: number;
  engagementTimeMs?: number;
  meta?: Record<string, unknown>;
}

const SESSION_STORAGE_KEY = 'tin_group_analytics_session';

function readStoredSessionId() {
  if (typeof window === 'undefined') {
    return '';
  }

  const existing = window.sessionStorage.getItem(SESSION_STORAGE_KEY);
  if (existing) {
    return existing;
  }

  const next = crypto.randomUUID();
  window.sessionStorage.setItem(SESSION_STORAGE_KEY, next);
  return next;
}

function getDeviceType(viewportWidth: number) {
  if (viewportWidth < 768) {
    return 'mobile';
  }

  if (viewportWidth < 1024) {
    return 'tablet';
  }

  return 'desktop';
}

function parseUserAgent() {
  const ua = navigator.userAgent;

  const browser =
    /Edg/i.test(ua) ? 'Edge' :
    /Chrome/i.test(ua) ? 'Chrome' :
    /Safari/i.test(ua) ? 'Safari' :
    /Firefox/i.test(ua) ? 'Firefox' :
    /SamsungBrowser/i.test(ua) ? 'Samsung Internet' :
    /Opera|OPR/i.test(ua) ? 'Opera' :
    'Other';

  const os =
    /Windows/i.test(ua) ? 'Windows' :
    /Android/i.test(ua) ? 'Android' :
    /iPhone|iPad|iPod/i.test(ua) ? 'iOS' :
    /Mac OS X/i.test(ua) ? 'macOS' :
    /Linux/i.test(ua) ? 'Linux' :
    'Other';

  return { browser, os };
}

function getUtmParams() {
  const params = new URLSearchParams(window.location.search);

  return {
    utmSource: params.get('utm_source') || undefined,
    utmMedium: params.get('utm_medium') || undefined,
    utmCampaign: params.get('utm_campaign') || undefined,
  };
}

export async function trackAnalyticsEvent(payload: AnalyticsEventPayload) {
  if (typeof window === 'undefined') {
    return;
  }

  const { browser, os } = parseUserAgent();
  const utmParams = getUtmParams();
  const body = {
    sessionId: readStoredSessionId(),
    eventName: payload.eventName,
    pagePath: payload.pagePath,
    pageTitle: payload.pageTitle || document.title,
    referrer: payload.referrer,
    utmSource: payload.utmSource || utmParams.utmSource,
    utmMedium: payload.utmMedium || utmParams.utmMedium,
    utmCampaign: payload.utmCampaign || utmParams.utmCampaign,
    deviceType: payload.deviceType || getDeviceType(window.innerWidth),
    browser: payload.browser || browser,
    os: payload.os || os,
    viewportWidth: payload.viewportWidth || window.innerWidth,
    viewportHeight: payload.viewportHeight || window.innerHeight,
    engagementTimeMs: payload.engagementTimeMs,
    meta: payload.meta || {},
  };

  try {
    await fetch('/api/analytics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      keepalive: true,
    });
  } catch {
    // Analytics should never block the UI.
  }
}
