import React from 'react';
import { DungeonAsset } from '@/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import DisplayItem from '@/app/components/common/DisplayItem';

interface DisplayDungeonAssetProps {
  asset: DungeonAsset;
  editAction?: (asset: DungeonAsset) => void;
  deleteAction?: (asset: DungeonAsset) => void;
}

const DisplayDungeonAsset: React.FC<DisplayDungeonAssetProps> = ({ asset, editAction, deleteAction }) => {
  const handleClick = (e: React.MouseEvent, action?: (asset: DungeonAsset) => void) => {
    if (!action) return;
    e.preventDefault();
    action(asset);
    return false;
  };

  return (
    <>
      <div className="p-4 border rounded-lg flex flex-col md:flex-row gap-2 md:gap-4">
        <div className="flex-none flex-nowrap flex gap-4 not-prose">
          <a href={`/dungeon-assets/${asset.slug}`} title="edit" onClick={e => handleClick(e, editAction)} aria-label="edit" className="text-sky-500 transition hover:scale-110 h-min">
            <FontAwesomeIcon icon={faEdit} />
          </a>
          <a href="#" title="delete" aria-label="delete" onClick={e => handleClick(e, deleteAction)} className="text-red-500 transition hover:scale-110 h-min">
            <FontAwesomeIcon icon={faTrashCan} />
          </a>
        </div>
        <div className="flex-auto prose-h3:m-0 prose-p:mb-0 md:prose-p:mb-3">
          <h3>{asset.name}</h3>
          <p className="text-sm">{asset.description}</p>
          <div className="hidden md:flex gap-4 justify-stretch">
            <DisplayItem label="Type" className="flex-auto">
              {asset.type}
            </DisplayItem>
            <DisplayItem label="Images" className="flex-auto">
              {asset.images}
            </DisplayItem>
          </div>
        </div>
      </div>
    </>
  );
};

export default DisplayDungeonAsset;
