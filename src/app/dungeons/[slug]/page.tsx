'use client';

import React, { Suspense, use, useState } from 'react';
import { useRouter } from 'next/navigation';
import DungeonForm from '../components/DungeonForm';
import useLocalStorage from '@/hooks/useLocalStorage';
import { Dungeon } from '@/types';

// TODO: Switch to dynamic metadata when server and client code is separated
// export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
//   const { slug } = await params;
//   const dungeon = defaultState.dungeons.find(d => d.slug === slug);
//   return {
//     title: `Edit Dungeon: ${dungeon?.name}`,
//   };
// }

const DungeonDetailPage = ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = use(params);
  const router = useRouter();
  const [dungeons, updateDungeons] = useLocalStorage<Dungeon[]>('dungeons', []);
  const [dungeon] = useState<Dungeon | undefined>(() => {
    const foundDungeon = dungeons.find(d => d.slug === slug);
    if (!foundDungeon) {
      router.push('/404');
    }
    return foundDungeon;
  });

  const handleSubmit = (updatedDungeonData: Dungeon) => {
    const index = dungeons.findIndex(d => d.slug === updatedDungeonData.slug);
    if (index !== -1) {
      const updatedDungeons = [...dungeons];
      updatedDungeons[index] = updatedDungeonData;
      updateDungeons(updatedDungeons);
    }
    console.log('Updated dungeon data:', updatedDungeonData);
  };

  if (!dungeon) {
    return;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        <h1>
          Edit Dungeon:&nbsp;
          {dungeon.name}
        </h1>
        <DungeonForm dungeon={dungeon} onSubmit={handleSubmit} />
      </div>
    </Suspense>
  );
};

export default DungeonDetailPage;
