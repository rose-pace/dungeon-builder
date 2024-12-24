'use server';

import React from 'react';
import DungeonList from './components/DungeonList';
import DungeonServer from './components/DungeonServer';

const DungeonIndexPage = () => {
  return (
    <DungeonServer>
      <DungeonList />
    </DungeonServer>
  );
};

export default DungeonIndexPage;
