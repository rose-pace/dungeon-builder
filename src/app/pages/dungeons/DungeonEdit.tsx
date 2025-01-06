'use client';

import React from 'react';
import { notFound } from 'next/navigation';
import DungeonForm from './components/DungeonForm';
import { useDungeonsContext, sendUpdateDungeon } from '@providers';
import { Dungeon } from '@/types';

const DungeonEditPage = ({ dungeonSlug }: { dungeonSlug: string }) => {
  // TODO: use server data through new context
  const { dungeonSelectors, dungeonDispatcher } = useDungeonsContext();
  const dungeon = dungeonSelectors.get(dungeonSlug);
  if (!dungeon) {
    notFound();
  }

  const handleUpdate = async (initialState: Dungeon, formData: FormData) => {
    const updateState = Object.fromEntries(formData.entries()) as unknown as Dungeon;
    // update server data
    await sendUpdateDungeon(updateState);
    // update client data
    dungeonDispatcher.change(updateState, { initialSlug: initialState.slug });

    return updateState;
  };

  return (
    <div>
      <h1>
        Edit Dungeon:&nbsp;
        {dungeon.name}
      </h1>
      <DungeonForm dungeon={dungeon} submitAction={handleUpdate} />
    </div>
  );
};

export default DungeonEditPage;
