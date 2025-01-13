'use server';

import React from 'react';
import DungeonAssetEditPage from '@/app/pages/dungeonAssets/DungeonAssetEdit';

/**
 * Component for editing a dungeon asset
 * @returns A placeholder React node
 */
const EditDungeonAssetPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  return <DungeonAssetEditPage assetSlug={slug} />;
};

export default EditDungeonAssetPage;
