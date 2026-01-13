import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  const allItems = [
    { name: 'Inicio', url: 'https://comparadorinternet.co' },
    ...items
  ];

  return (
    <nav
      aria-label="Breadcrumb"
      className={`bg-gray-50 py-3 px-4 rounded-lg mb-6 ${className}`}
      itemScope
      itemType="https://schema.org/BreadcrumbList"
    >
      <ol className="flex items-center flex-wrap gap-2 text-sm">
        {allItems.map((item, index) => {
          const isLast = index === allItems.length - 1;
          const isFirst = index === 0;

          return (
            <li
              key={item.url}
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
              className="flex items-center"
            >
              {index > 0 && (
                <ChevronRight className="w-4 h-4 text-gray-400 mx-2" />
              )}

              {isLast ? (
                <span
                  itemProp="name"
                  className="text-gray-900 font-medium flex items-center gap-1"
                  aria-current="page"
                >
                  {isFirst && <Home className="w-4 h-4" />}
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.url}
                  itemProp="item"
                  className="text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1 transition-colors"
                >
                  {isFirst && <Home className="w-4 h-4" />}
                  <span itemProp="name">{item.name}</span>
                </Link>
              )}

              <meta itemProp="position" content={String(index + 1)} />
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
