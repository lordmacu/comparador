'use client';

import dynamic from 'next/dynamic';

// Lazy load heavy components
const ChatWidget = dynamic(() => import("@/components/ChatWidget"), {
  ssr: false,
  loading: () => null,
});

export function ClientProviders() {
  return (
    <>
      <ChatWidget />
    </>
  );
}
