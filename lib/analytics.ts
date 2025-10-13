// Analytics utility for tracking events
// Supports PostHog, Segment, GA4, and custom providers

type EventProperties = Record<string, string | number | boolean | null>;

interface AnalyticsEvent {
  name: string;
  properties?: EventProperties;
  timestamp?: number;
}

class Analytics {
  private enabled: boolean;
  private debug: boolean;

  constructor() {
    this.enabled = typeof window !== 'undefined';
    this.debug = process.env.NODE_ENV === 'development';
  }

  /**
   * Track a custom event
   */
  track(eventName: string, properties?: EventProperties) {
    if (!this.enabled) return;

    const event: AnalyticsEvent = {
      name: eventName,
      properties: properties || {},
      timestamp: Date.now(),
    };

    // Debug logging
    if (this.debug) {
      console.log('[Analytics]', eventName, properties);
    }

    // PostHog
    if (typeof window !== 'undefined' && (window as any).posthog) {
      (window as any).posthog.capture(eventName, properties);
    }

    // Segment
    if (typeof window !== 'undefined' && (window as any).analytics) {
      (window as any).analytics.track(eventName, properties);
    }

    // Google Analytics 4
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', eventName, properties);
    }

    // Custom data layer for GTM
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: eventName,
        ...properties,
      });
    }

    // Store in sessionStorage for debugging
    if (this.debug) {
      this.storeEvent(event);
    }
  }

  /**
   * Track CTA clicks
   */
  trackCTA(ctaLabel: string, location: string, destination?: string) {
    this.track('cta_clicked', {
      cta_label: ctaLabel,
      location: location,
      destination: destination || '',
      timestamp: Date.now(),
    });
  }

  /**
   * Track page views
   */
  trackPageView(path: string, title?: string) {
    this.track('page_viewed', {
      path,
      title: title || document.title,
      referrer: document.referrer,
    });
  }

  /**
   * Track scroll depth
   */
  trackScrollDepth(depth: number) {
    this.track('scroll_depth', {
      depth,
      path: window.location.pathname,
    });
  }

  /**
   * Track form interactions
   */
  trackFormStart(formName: string) {
    this.track('form_started', {
      form_name: formName,
    });
  }

  trackFormSubmit(formName: string, success: boolean) {
    this.track('form_submitted', {
      form_name: formName,
      success,
    });
  }

  /**
   * Track video interactions
   */
  trackVideoPlay(videoName: string) {
    this.track('video_played', {
      video_name: videoName,
    });
  }

  trackVideoComplete(videoName: string) {
    this.track('video_completed', {
      video_name: videoName,
    });
  }

  /**
   * Track course interactions
   */
  trackCourseView(courseSlug: string, courseTitle: string) {
    this.track('course_viewed', {
      course_slug: courseSlug,
      course_title: courseTitle,
    });
  }

  trackLessonStart(courseSlug: string, lessonSlug: string) {
    this.track('lesson_started', {
      course_slug: courseSlug,
      lesson_slug: lessonSlug,
    });
  }

  trackLessonComplete(courseSlug: string, lessonSlug: string, duration: number) {
    this.track('lesson_completed', {
      course_slug: courseSlug,
      lesson_slug: lessonSlug,
      duration_seconds: duration,
    });
  }

  /**
   * Store event in sessionStorage for debugging
   */
  private storeEvent(event: AnalyticsEvent) {
    try {
      const stored = sessionStorage.getItem('analytics_events');
      const events = stored ? JSON.parse(stored) : [];
      events.push(event);
      // Keep only last 100 events
      if (events.length > 100) {
        events.shift();
      }
      sessionStorage.setItem('analytics_events', JSON.stringify(events));
    } catch (error) {
      // Ignore storage errors
    }
  }

  /**
   * Get stored events (for debugging)
   */
  getEvents(): AnalyticsEvent[] {
    try {
      const stored = sessionStorage.getItem('analytics_events');
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      return [];
    }
  }

  /**
   * Clear stored events
   */
  clearEvents() {
    try {
      sessionStorage.removeItem('analytics_events');
    } catch (error) {
      // Ignore storage errors
    }
  }
}

// Export singleton instance
export const analytics = new Analytics();

// Export for debugging in browser console
if (typeof window !== 'undefined') {
  (window as any).analytics = analytics;
}

