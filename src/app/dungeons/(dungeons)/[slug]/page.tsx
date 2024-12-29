'use client';

import React, { use } from 'react';
import { useRouter } from 'next/navigation';
import DungeonForm from '../_components/DungeonForm';
import { useDungeonsContext } from '../../_providers/DungeonsProvider';
import { Dungeon } from '@/types';
import ResettableForm from '@components/forms/ResettableForm';
import { sendUpdateDungeon } from '../_components/DungeonServer';

const DungeonDetailPage = ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = use(params);
  const router = useRouter();
  const { dungeonSelectors, dungeonDispatcher } = useDungeonsContext();
  const dungeon = dungeonSelectors.get(slug);
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

export default DungeonDetailPage;
