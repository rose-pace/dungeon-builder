'use client';

import React, { useState } from 'react';
import { DungeonAsset } from '@/types';
import Repeater from '@/app/components/common/Repeater';
import DisplayDungeonAsset from './components/DisplayDungeonAsset';
import Modal from '@/app/components/common/Modal';
import Button from '@/app/components/common/Button';
import { useDungeonAssetsContext } from '@providers';

// TODO: This should be limited to just the assets that are part of the dungeon
const DungeonAssetsDashboard = () => {
  const { dungeonAssetSelectors } = useDungeonAssetsContext();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [activeAsset, setActiveAsset] = useState<DungeonAsset | null>(null);
  const [assets, setAssets] = useState<DungeonAsset[]>(dungeonAssetSelectors.getAll());

  const deleteAction = (asset?: DungeonAsset) => {
    if (asset) {
      setAssets(prevAssets => prevAssets.filter(f => f.id !== asset.id));
    }
    setIsDeleteModalOpen(false);
  };

  const callDeleteAction = (asset: DungeonAsset) => {
    setActiveAsset(asset);
    setIsDeleteModalOpen(true);
    return false;
  };

  const modalFooter = (
    <div className="flex gap-4 justify-end">
      <Button onClick={() => setIsDeleteModalOpen(false)} colorStyle="primary">Cancel</Button>
      <Button onClick={() => deleteAction(activeAsset!)} colorStyle="danger">Delete</Button>
    </div>
  );

  return (
    <div>
      <h1>Dungeon Assets</h1>
      <Repeater
        className="gap-4"
        records={assets}
        reorderable={true}
        reorderAction={setAssets}
        template={item => (
          <DisplayDungeonAsset
            key={item.id}
            asset={item}
            deleteAction={callDeleteAction}
          />
        )}
      />
      {isDeleteModalOpen && (
        <Modal
          toggleModal={() => setIsDeleteModalOpen(!isDeleteModalOpen)}
          modalHeader="Delete Asset?"
          modalFooter={modalFooter}
        >
          Are you sure you want to delete this asset?
        </Modal>
      )}
    </div>
  );
};

export default DungeonAssetsDashboard;
