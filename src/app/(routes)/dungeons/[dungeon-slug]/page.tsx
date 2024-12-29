'use server';

import React from 'react';
import DungeonEditPage from '@/app/pages/dungeons/DungeonEdit';

const DungeonDetailPage = async ({ params }: { params: Promise<{ 'dungeon-slug': string }> }) => {
  const { 'dungeon-slug': dungeonSlug } = await params;
  return (
    <DungeonEditPage dungeonSlug={dungeonSlug} />
  );
};

export default DungeonDetailPage;
