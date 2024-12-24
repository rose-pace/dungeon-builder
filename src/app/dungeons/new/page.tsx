'use client';

import React from 'react';
import DungeonForm from '@/app/dungeons/components/DungeonForm';
import useLocalStorage from '@/hooks/useLocalStorage';
import { Dungeon } from '@/types';

const NewDungeonPage = () => {
  const [, updateDungeons] = useLocalStorage<Dungeon[]>('dungeons', []);
  const handleSubmit = (dungeonData: Dungeon) => {
    updateDungeons(dungeons => [...dungeons, dungeonData]);
    console.log('New dungeon data:', dungeonData);
  };

  return (
    <div>
      <h1>Create New Dungeon</h1>
      <DungeonForm onSubmit={handleSubmit} />
    </div>
  );
};

export default NewDungeonPage;
