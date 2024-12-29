'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import DungeonForm from './components/DungeonForm';
import { useDungeonsContext, sendUpdateDungeon } from '@providers';
import { Dungeon } from '@/types';
import ResettableForm from '@components/forms/ResettableForm';

const DungeonEditPage = ({ dungeonSlug }: { dungeonSlug: string }) => {
  const router = useRouter();
  // TODO: use server data through new context
  const { dungeonSelectors, dungeonDispatcher } = useDungeonsContext();
  const dungeon = dungeonSelectors.get(dungeonSlug);
  if (!dungeon) {
    router.push('/404');
  }

  const handleUpdate = async (_: Dungeon, formData: FormData) => {
    const updateState = Object.fromEntries(formData.entries()) as unknown as Dungeon;
    // update server data
    await sendUpdateDungeon(updateState);
    // update client data
    dungeonDispatcher.change(updateState);

    return updateState;
  };

  if (!dungeon) {
    return;
  }

  return (
    <div>
      <h1>
        Edit Dungeon:&nbsp;
        {dungeon.name}
      </h1>
      <ResettableForm
        render={({ key, resetAction }) =>
          (
            <DungeonForm
              key={key}
              dungeon={dungeon}
              submitAction={handleUpdate}
              resetAction={resetAction}
            />
          )}
      />
    </div>
  );
};

export default DungeonEditPage;
