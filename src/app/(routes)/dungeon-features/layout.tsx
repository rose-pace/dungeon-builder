import React from 'react';
import { Breadcrumbs } from '@/app/components/common/Breadcrumbs';
import { DungeonFeatureServer } from '@providers';

// DungeonFeaturesLayout component
/**
 * Layout component for dungeon features
 * @returns JSX.Element representing the layout
 */
const DungeonFeaturesLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <DungeonFeatureServer>
      <Breadcrumbs rootSegment="dungeon-features" />
      {children}
    </DungeonFeatureServer>
  );
};

export default DungeonFeaturesLayout;
