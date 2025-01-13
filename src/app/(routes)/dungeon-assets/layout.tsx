import React from 'react';
import { Breadcrumbs } from '@/app/components/common/Breadcrumbs';
import { DungeonAssetServer } from '@providers';

// DungeonAssetsLayout component
/**
 * Layout component for dungeon assets
 * @returns JSX.Element representing the layout
 */
const DungeonAssetsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <DungeonAssetServer>
      <Breadcrumbs rootSegment="dungeon-assets" />
      {children}
    </DungeonAssetServer>
  );
};

export default DungeonAssetsLayout;
