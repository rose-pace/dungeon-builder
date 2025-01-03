'use server';

import React from 'react';
import { dungeonFeaturesRepository } from '@server';
import DungeonFeaturesProvider from './DungeonFeaturesProvider';
import { DungeonFeature } from '@/types';

/**
 * DungeonFeatureServer component that fetches dungeon features and provides them to its children.
 *
 * @param props - Component properties.
 * @param props.children - The child components to render.
 * @returns A promise that resolves to the rendered component.
 */
const DungeonFeatureServer = async ({ children }: { children: React.ReactNode }) => {
  const dungeonFeatures = await dungeonFeaturesRepository.filter([]);
  return (
    <DungeonFeaturesProvider dungeonFeatures={dungeonFeatures}>
      {children}
    </DungeonFeaturesProvider>
  );
};

// Default Export
export default DungeonFeatureServer;

// Exports

export async function refreshDungeonFeatures(criteria: Partial<DungeonFeature>[] = [], skip?: number, take?: number) {
  'use server';
  const dungeonFeatures = await dungeonFeaturesRepository.filter(criteria, skip, take);
  return dungeonFeatures;
}

/**
 * Server function to create a dungeon feature.
 *
 * @param dungeonFeature - The dungeon feature to create.
 * @returns A promise that resolves to the created dungeon feature.
 */
export async function sendCreateDungeonFeature(dungeonFeature: DungeonFeature): Promise<void> {
  'use server';
  await dungeonFeaturesRepository.create(dungeonFeature);
}

/**
 * Server function to update a dungeon feature.
 *
 * @param dungeonFeature - The dungeon feature to update.
 * @returns A promise that resolves when the dungeon feature is updated.
 */
export async function sendUpdateDungeonFeature(dungeonFeature: DungeonFeature): Promise<void> {
  'use server';
  await dungeonFeaturesRepository.update(dungeonFeature, [{ id: dungeonFeature.id }]);
}

/**
 * Server function to delete a dungeon feature.
 *
 * @param dungeonFeature - The dungeon feature to delete.
 * @returns A promise that resolves when the dungeon feature is deleted.
 */
export async function sendDeleteDungeonFeature(dungeonFeature: DungeonFeature): Promise<void> {
  'use server';
  await dungeonFeaturesRepository.delete([{ id: dungeonFeature.id }]);
}
