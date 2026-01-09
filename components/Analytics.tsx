'use client';

import Script from 'next/script';
import { useEffect, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { 
  GA_TRACKING_ID, 
  FB_PIXEL_ID,
  isAnalyticsEnabled,
  isFacebookPixelEnabled,
  pageview,
  fbPageview,
  initializeAnalytics
} from '@/lib/analytics';

function AnalyticsPageTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Track page views on route change
  useEffect(() => {
    if (!pathname) return;

    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
    
    // Google Analytics
    pageview(url);
    
    // Facebook Pixel
    fbPageview();
  }, [pathname, searchParams]);

  return null;
}

export function Analytics() {
  // Initialize analytics behaviors (scroll, time tracking)
  useEffect(() => {
    initializeAnalytics();
  }, []);

  if (!isAnalyticsEnabled() && !isFacebookPixelEnabled()) {
    return null;
  }

  return (
    <>
      {/* Page tracking with Suspense boundary */}
      <Suspense fallback={null}>
        <AnalyticsPageTracker />
      </Suspense>

      {/* Google Analytics 4 */}
      {isAnalyticsEnabled() && (
        <>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          />
          <Script
            id="google-analytics"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_TRACKING_ID}', {
                  send_page_view: true,
                  cookie_flags: 'SameSite=None;Secure'
                });
              `,
            }}
          />
        </>
      )}

      {/* Facebook Pixel */}
      {isFacebookPixelEnabled() && (
        <Script
          id="facebook-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${FB_PIXEL_ID}');
              fbq('track', 'PageView');
            `,
          }}
        />
      )}

      {/* Google Tag Manager */}
      {process.env.NEXT_PUBLIC_GTM_ID && (
        <>
          <Script
            id="google-tag-manager"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');
              `,
            }}
          />
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        </>
      )}
    </>
  );
}
