import React from 'react';
import { DungeonFeature } from '@/types';

interface DisplayDungeonFeatureProps {
  feature: DungeonFeature;
}

const DisplayDungeonFeature: React.FC<DisplayDungeonFeatureProps> = ({ feature }) => {
  return (
    <div className="p-4 border rounded-lg">
      <h3 className="text-xl font-bold">{feature.name}</h3>
      <p>{feature.description}</p>
      <div>
        <strong>Type:</strong>
        {' '}
        {feature.type}
      </div>
      <div>
        <strong>Images:</strong>
        {' '}
        {feature.images}
      </div>
      <div>
        <strong>No Children:</strong>
        {' '}
        {feature.noChildren ? 'Yes' : 'No'}
      </div>
      <div>
        <strong>Must Have Parent:</strong>
        {' '}
        {feature.mustHaveParent ? 'Yes' : 'No'}
      </div>
    </div>
  );
};

export default DisplayDungeonFeature;
