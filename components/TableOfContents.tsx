'use client';

import { useState, useEffect } from 'react';
import { List } from 'lucide-react';

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // Extract headings from markdown content
    const headingRegex = /^(#{2,3})\s+(.+)$/gm;
    const extractedHeadings: Heading[] = [];
    let match;

    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length;
      const text = match[2];
      const id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-');

      extractedHeadings.push({ id, text, level });
    }

    setHeadings(extractedHeadings);
  }, [content]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -80% 0px' }
    );

    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) {
    return null;
  }

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 sticky top-8">
      <div className="flex items-center gap-2 mb-4">
        <List className="w-5 h-5 text-blue-600" />
        <h3 className="font-bold text-gray-900">Contenido</h3>
      </div>

      <ul className="space-y-2 text-sm">
        {headings.map(({ id, text, level }) => (
          <li key={id} className={level === 3 ? 'ml-4' : ''}>
            <button
              onClick={() => scrollToHeading(id)}
              className={`
                text-left w-full py-1 px-2 rounded transition-colors
                ${activeId === id
                  ? 'text-blue-600 bg-blue-50 font-semibold'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                }
              `}
            >
              {text}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
