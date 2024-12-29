import React from 'react';
import { Breadcrumbs } from '@components/common/Breadcrumbs';
import { DungeonServer } from '@providers';

export default function DungeonLayout({ children }: { children: React.ReactNode }) {
  return (
    <DungeonServer>
      <Breadcrumbs rootSegment="dungeons" />
      {children}
    </DungeonServer>
  );
}
