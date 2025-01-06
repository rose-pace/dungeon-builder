'use server';

import React from 'react';
import DungeonFeatureEditPage from '@/app/pages/dungeonFeatures/DungeonFeatureEdit';

/**
 * Component for editing a dungeon feature
 * @returns A placeholder React node
 */
const EditDungeonFeaturePage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  return <DungeonFeatureEditPage featureSlug={slug} />;
};

export default EditDungeonFeaturePage;
