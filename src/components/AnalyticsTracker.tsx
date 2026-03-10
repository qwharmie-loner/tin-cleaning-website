'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

import { trackAnalyticsEvent } from '@/lib/analytics-client';

function buildPagePath(pathname: string, search: string) {
  const query = search.startsWith('?') ? search.slice(1) : search;
  return query ? `${pathname}?${query}` : pathname;
}

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const pageEnterTimeRef = useRef<number>(0);
  const currentPageRef = useRef<string>('');

  useEffect(() => {
    const pagePath = buildPagePath(pathname, window.location.search);
    const previousPage = currentPageRef.current;

    if (previousPage) {
      void trackAnalyticsEvent({
        eventName: 'page_exit',
        pagePath: previousPage,
        engagementTimeMs: Date.now() - pageEnterTimeRef.current,
        referrer: window.location.origin + previousPage,
      });
    }

    pageEnterTimeRef.current = Date.now();
    currentPageRef.current = pagePath;

    void trackAnalyticsEvent({
      eventName: 'page_view',
      pagePath,
      referrer: document.referrer || undefined,
      meta: previousPage ? { previousPage } : {},
    });
  }, [pathname]);

  useEffect(() => {
    const handlePageHide = () => {
      if (!currentPageRef.current) {
        return;
      }

      void trackAnalyticsEvent({
        eventName: 'page_exit',
        pagePath: currentPageRef.current,
        engagementTimeMs: Date.now() - pageEnterTimeRef.current,
      });
    };

    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const trackedElement = target?.closest<HTMLElement>('[data-analytics-event]');

      if (!trackedElement) {
        return;
      }

      const meta: Record<string, string> = {};

      Object.entries(trackedElement.dataset).forEach(([key, value]) => {
        if (!value || key === 'analyticsEvent') {
          return;
        }

        meta[key] = value;
      });

      void trackAnalyticsEvent({
        eventName: trackedElement.dataset.analyticsEvent || 'click',
        pagePath: currentPageRef.current || pathname,
        meta,
      });
    };

    document.addEventListener('click', handleClick);
    window.addEventListener('pagehide', handlePageHide);

    return () => {
      document.removeEventListener('click', handleClick);
      window.removeEventListener('pagehide', handlePageHide);
    };
  }, [pathname]);

  return null;
}
