import React from 'react';
import { DungeonFeature } from '@/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import DisplayItem from '@/components/common/DisplayItem';

interface DisplayDungeonFeatureProps {
  feature: DungeonFeature;
  editAction: (feature: DungeonFeature) => void;
  deleteAction: (feature: DungeonFeature) => void;
}

const DisplayDungeonFeature: React.FC<DisplayDungeonFeatureProps> = ({ feature, editAction, deleteAction }) => {
  return (
    <>
      <div className="p-4 border rounded-lg flex flex-col md:flex-row gap-2 md:gap-4">
        <div className="flex-none flex-nowrap flex gap-4 not-prose">
          <a href="#" title="edit" aria-label="edit" onClick={() => editAction(feature)} className="text-sky-500 transition hover:scale-110 h-min">
            <FontAwesomeIcon icon={faEdit} />
          </a>
          <a href="#" title="delete" aria-label="delete" onClick={() => deleteAction(feature)} className="text-red-500 transition hover:scale-110 h-min">
            <FontAwesomeIcon icon={faTrashCan} />
          </a>
        </div>
        <div className="flex-auto prose-h3:m-0 prose-p:mb-0 md:prose-p:mb-3">
          <h3>{feature.name}</h3>
          <p className="text-sm">{feature.description}</p>
          <div className="hidden md:flex gap-4 justify-stretch">
            <DisplayItem label="Type" className="flex-auto">
              {feature.type}
            </DisplayItem>
            <DisplayItem label="Images" className="flex-auto">
              {feature.images}
            </DisplayItem>
            <DisplayItem label="No Children" className="flex-auto">
              {feature.noChildren ? 'Yes' : 'No'}
            </DisplayItem>
            <DisplayItem label="Must Have Parent" className="flex-auto">
              {feature.mustHaveParent ? 'Yes' : 'No'}
            </DisplayItem>
          </div>
        </div>
      </div>
    </>
  );
};

export default DisplayDungeonFeature;
