'use client';

import React from 'react';
import DungeonAssetForm from './components/DungeonAssetForm';
import { useDungeonAssetsContext, sendCreateDungeonAsset } from '@providers';
import { DungeonAsset } from '@/types';

const DungeonAssetCreatePage = () => {
  const { dungeonAssetDispatcher } = useDungeonAssetsContext();

  const handleAdd = async (_: DungeonAsset, formData: FormData) => {
    const updateState = Object.fromEntries(formData.entries()) as unknown as DungeonAsset;
    // update server data
    await sendCreateDungeonAsset(updateState);
    // update client data
    dungeonAssetDispatcher.change(updateState);

    return updateState;
  };

  return (
    <div>
      <h1>Create New Dungeon Asset</h1>
      <DungeonAssetForm submitAction={handleAdd} />
    </div>
  );
};

export default DungeonAssetCreatePage;
