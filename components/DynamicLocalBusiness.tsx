'use client';

import { usePathname } from 'next/navigation';
import { generateLocalBusinessSchema } from '@/lib/schemas/local-business';
import { renderJsonLd } from '@/lib/schemas';

export default function DynamicLocalBusiness() {
  const pathname = usePathname();
  const path = pathname?.toLowerCase() || '';

  let providerName = '';
  
  if (path.includes('claro')) {
    providerName = 'Claro';
  } else if (path.includes('movistar')) {
    providerName = 'Movistar';
  } else if (path.includes('etb')) {
    providerName = 'ETB';
  }

  const schema = generateLocalBusinessSchema(providerName);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={renderJsonLd(schema)}
    />
  );
}
