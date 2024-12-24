'use server';

import React from 'react';
import DungeonList from './dungeons/components/DungeonList';
import DungeonServer from './dungeons/components/DungeonServer';

/**
 * Dungeon Builder Home Page.
 * @returns A promise that resolves to the rendered component.
 */
const HomePage = async () => {
  return (
    <DungeonServer>
      <DungeonList />
    </DungeonServer>
  );
};

export default HomePage;
