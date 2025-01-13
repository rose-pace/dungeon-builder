'use server';

import React from 'react';
import { dungeonAssetsRepository } from '@server';
import DungeonAssetsProvider from './DungeonAssetProvider';
import { DungeonAsset } from '@/types';

/**
 * DungeonAssetServer component that fetches dungeon assets and provides them to its children.
 *
 * @param props - Component properties.
 * @param props.children - The child components to render.
 * @returns A promise that resolves to the rendered component.
 */
const DungeonAssetServer = async ({ children }: { children: React.ReactNode }) => {
  const dungeonAssets = await dungeonAssetsRepository.filter([]);
  return (
    <DungeonAssetsProvider dungeonAssets={dungeonAssets}>
      {children}
    </DungeonAssetsProvider>
  );
};

// Default Export
export default DungeonAssetServer;

// Exports

export async function refreshDungeonAssets(criteria: Partial<DungeonAsset>[] = [], skip?: number, take?: number) {
  'use server';
  const dungeonAssets = await dungeonAssetsRepository.filter(criteria, skip, take);
  return dungeonAssets;
}

/**
 * Server function to create a dungeon asset.
 *
 * @param dungeonAsset - The dungeon asset to create.
 * @returns A promise that resolves to the created dungeon asset.
 */
export async function sendCreateDungeonAsset(dungeonAsset: DungeonAsset): Promise<void> {
  'use server';
  await dungeonAssetsRepository.create(dungeonAsset);
}

/**
 * Server function to update a dungeon asset.
 *
 * @param dungeonAsset - The dungeon asset to update.
 * @returns A promise that resolves when the dungeon asset is updated.
 */
export async function sendUpdateDungeonAsset(dungeonAsset: DungeonAsset): Promise<void> {
  'use server';
  await dungeonAssetsRepository.update(dungeonAsset, [{ id: dungeonAsset.id }]);
}

/**
 * Server function to delete a dungeon asset.
 *
 * @param dungeonAsset - The dungeon asset to delete.
 * @returns A promise that resolves when the dungeon asset is deleted.
 */
export async function sendDeleteDungeonAsset(dungeonAsset: DungeonAsset): Promise<void> {
  'use server';
  await dungeonAssetsRepository.delete([{ id: dungeonAsset.id }]);
}
