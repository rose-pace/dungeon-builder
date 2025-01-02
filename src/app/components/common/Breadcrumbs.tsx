'use client';

import React from 'react';
import Link from 'next/link';
import { useSelectedLayoutSegments } from 'next/navigation';

export const Breadcrumbs = ({ rootSegment }: { rootSegment: string }) => {
  const segments = useSelectedLayoutSegments()
    .reduce((acc, segment) => {
      const href = acc.length === 0 ? `/${segment}` : `${acc[acc.length - 1]}/${segment}`;
      acc.push({ segment, href });
      return acc;
    }, [] as { segment: string; href: string }[]);

  return (
    <nav aria-label="breadcrumb" className="-mt-4 mb-4">
      <ul className="not-prose flex gap-6">
        <li key="home">
          <Link href="/">Home</Link>
        </li>
        <li key="node" className="list-disc list-outside">
          {segments.length === 0 && <span className="font-semibold">{rootSegment}</span>}
          {segments.length > 0 && (
            <Link href={`/${rootSegment}`}>{rootSegment}</Link>
          )}
        </li>
        {segments.map((item, index) => (
          <li key={index} className="list-disc list-outside">
            {index < segments.length - 1 && <Link href={item.href}>{item.segment}</Link>}
            {index === segments.length - 1 && <span className="font-semibold">{item.segment}</span>}
          </li>
        ))}
      </ul>
    </nav>
  );
};
