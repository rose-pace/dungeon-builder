'use server';

import React from 'react';
import { dungeonRepository } from '@server';
import DungeonsProvider from '../providers/DungeonsProvider';
import { Dungeon } from '@/types';

/**
 * DungeonServer component that fetches dungeons and provides them to its children.
 *
 * @param props - Component properties.
 * @param props.children - The child components to render.
 * @returns A promise that resolves to the rendered component.
 */
const DungeonServer = async ({ children }: { children: React.ReactNode }) => {
  const dungeons = await dungeonRepository.filter([]);
  return (
    <DungeonsProvider dungeons={dungeons}>
      {children}
    </DungeonsProvider>
  );
};

// Default Export
export default DungeonServer;

// Exports

/**
 * Server function to create a dungeon.
 *
 * @param dungeon - The dungeon to create.
 * @returns A promise that resolves to the created dungeon.
 */
export async function sendCreateDungeon(dungeon: Dungeon): Promise<Dungeon> {
  'use server';
  return await dungeonRepository.create(dungeon);
}

/**
 * Server function to update a dungeon.
 *
 * @param dungeon - The dungeon to update.
 * @returns A promise that resolves when the dungeon is updated.
 */
export async function sendUpdateDungeon(dungeon: Dungeon): Promise<void> {
  'use server';
  return await dungeonRepository.update(dungeon, [{ id: dungeon.id }]);
}

/**
 * Server function to delete a dungeon.
 *
 * @param dungeon - The dungeon to delete.
 * @returns A promise that resolves when the dungeon is deleted.
 */
export async function sendDeleteDungeon(dungeon: Dungeon): Promise<void> {
  'use server';
  return await dungeonRepository.delete([{ id: dungeon.id }]);
}
