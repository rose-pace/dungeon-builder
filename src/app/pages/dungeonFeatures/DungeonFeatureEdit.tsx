'use client';

import React from 'react';
import { notFound } from 'next/navigation';
import DungeonFeatureForm from './components/DungeonFeatureForm';
import { useDungeonFeaturesContext, sendUpdateDungeonFeature } from '@providers';
import { DungeonFeature } from '@/types';

const DungeonFeatureEditPage = ({ featureSlug }: { featureSlug: string }) => {
  const { dungeonFeatureSelectors, dungeonFeatureDispatcher } = useDungeonFeaturesContext();
  const dungeonFeature = dungeonFeatureSelectors.get(featureSlug);
  if (!dungeonFeature) {
    notFound();
  }

  const handleUpdate = async (initialState: DungeonFeature, formData: FormData) => {
    const updateState = Object.fromEntries(formData.entries()) as unknown as DungeonFeature;
    await sendUpdateDungeonFeature(updateState);
    dungeonFeatureDispatcher.change(updateState, { initialSlug: initialState.slug });

    return updateState;
  };

  return (
    <div>
      <h1>
        Edit Dungeon Feature:&nbsp;
        {dungeonFeature.name}
      </h1>
      <DungeonFeatureForm dungeonFeature={dungeonFeature} submitAction={handleUpdate} />
    </div>
  );
};

export default DungeonFeatureEditPage;
