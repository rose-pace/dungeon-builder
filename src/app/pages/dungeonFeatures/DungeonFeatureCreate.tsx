'use client';

import React from 'react';
import DungeonFeatureForm from './components/DungeonFeatureForm';
import { useDungeonFeaturesContext, sendCreateDungeonFeature } from '@providers';
import { DungeonFeature } from '@/types';

const DungeonFeatureCreatePage = () => {
  const { dungeonFeatureDispatcher } = useDungeonFeaturesContext();

  const handleAdd = async (_: DungeonFeature, formData: FormData) => {
    const updateState = Object.fromEntries(formData.entries()) as unknown as DungeonFeature;
    // update server data
    await sendCreateDungeonFeature(updateState);
    // update client data
    dungeonFeatureDispatcher.change(updateState);

    return updateState;
  };

  return (
    <div>
      <h1>Create New Dungeon Feature</h1>
      <DungeonFeatureForm submitAction={handleAdd} />
    </div>
  );
};

export default DungeonFeatureCreatePage;
