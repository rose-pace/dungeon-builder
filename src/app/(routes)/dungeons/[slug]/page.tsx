'use server';

import React from 'react';
import DungeonEditPage from '@/app/pages/dungeons/DungeonEdit';

const EditDungeonPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  return (
    <DungeonEditPage dungeonSlug={slug} />
  );
};

export default EditDungeonPage;
