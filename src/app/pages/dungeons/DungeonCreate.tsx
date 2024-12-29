'use client';

import React from 'react';
import DungeonForm from './components/DungeonForm';
import { useDungeonsContext, sendCreateDungeon } from '@providers';
import ResettableForm from '@components/forms/ResettableForm';
import { Dungeon } from '@/types';

const DungeonCreatePage = () => {
  const { dungeonDispatcher } = useDungeonsContext();

  const handleAdd = async (_: Dungeon, formData: FormData) => {
    const updateState = Object.fromEntries(formData.entries()) as unknown as Dungeon;
    // update server data
    await sendCreateDungeon(updateState);
    // update client data
    dungeonDispatcher.change(updateState);

    return updateState;
  };

  return (
    <div>
      <h1>Create New Dungeon</h1>
      <ResettableForm
        render={({ key, resetAction }) =>
          (
            <DungeonForm
              key={key}
              submitAction={handleAdd}
              resetAction={resetAction}
            />
          )}
      />
    </div>
  );
};

export default DungeonCreatePage;