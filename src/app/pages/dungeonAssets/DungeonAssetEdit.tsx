'use client';

import React from 'react';
import { notFound } from 'next/navigation';
import DungeonAssetForm from './components/DungeonAssetForm';
import { useDungeonAssetsContext, sendUpdateDungeonAsset } from '@providers';
import { DungeonAsset } from '@/types';

const DungeonAssetEditPage = ({ assetSlug }: { assetSlug: string }) => {
  const { dungeonAssetSelectors, dungeonAssetDispatcher } = useDungeonAssetsContext();
  const dungeonAsset = dungeonAssetSelectors.get(assetSlug);
  if (!dungeonAsset) {
    notFound();
  }

  const handleUpdate = async (initialState: DungeonAsset, formData: FormData) => {
    const updateState = Object.fromEntries(formData.entries()) as unknown as DungeonAsset;
    await sendUpdateDungeonAsset(updateState);
    dungeonAssetDispatcher.change(updateState, { initialSlug: initialState.slug });

    return updateState;
  };

  return (
    <div>
      <h1>
        Edit Dungeon Asset:&nbsp;
        {dungeonAsset.name}
      </h1>
      <DungeonAssetForm dungeonAsset={dungeonAsset} submitAction={handleUpdate} />
    </div>
  );
};

export default DungeonAssetEditPage;
