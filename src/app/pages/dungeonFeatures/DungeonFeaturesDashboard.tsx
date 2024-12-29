'use client';

import React, { useState } from 'react';
import { DungeonFeature, DungeonFeatureType } from '@/types';
import Repeater from '@components/common/Repeater';
import DisplayDungeonFeature from './components/DisplayDungeonFeature';
import Modal from '@components/common/Modal';
import Button from '@components/common/Button';

// TODO: This should be limited to just the features that are part of the dungeon
const DungeonFeaturesDashboard = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [activeFeature, setActiveFeature] = useState<DungeonFeature | null>(null);
  const [features, setFeatures] = useState<DungeonFeature[]>([
    { id: '1', name: 'Enchanted Sword', description: 'A sword with magical properties.', type: DungeonFeatureType.TREASURE, images: '', noChildren: false, mustHaveParent: false, childWhitelist: [], childFeatures: [], connections: [] },
    { id: '2', name: 'Mystic Wand', description: 'A wand that can cast powerful spells.', type: DungeonFeatureType.TREASURE, images: '', noChildren: false, mustHaveParent: false, childWhitelist: [], childFeatures: [], connections: [] },
    { id: '3', name: 'Potion of Healing', description: 'A potion that heals wounds.', type: DungeonFeatureType.TREASURE, images: '', noChildren: false, mustHaveParent: false, childWhitelist: [], childFeatures: [], connections: [] },
  ]);

  const deleteAction = (feature?: DungeonFeature) => {
    if (feature) {
      setFeatures(prevFeatures => prevFeatures.filter(f => f.id !== feature.id));
    }
    setIsDeleteModalOpen(false);
  };

  const callDeleteAction = (feature: DungeonFeature) => {
    setActiveFeature(feature);
    setIsDeleteModalOpen(true);
  };

  const modalFooter = (
    <div className="flex gap-4 justify-end">
      <Button onClick={() => setIsDeleteModalOpen(false)} colorStyle="primary">Cancel</Button>
      <Button onClick={() => deleteAction(activeFeature!)} colorStyle="danger">Delete</Button>
    </div>
  );

  return (
    <div>
      <h1>Dungeon Features</h1>
      <Repeater
        className="gap-4"
        records={features}
        reorderable={true}
        reorderAction={setFeatures}
        template={item => (
          <DisplayDungeonFeature
            key={item.id}
            feature={item}
            editAction={() => {}}
            deleteAction={callDeleteAction}
          />
        )}
      />
      {isDeleteModalOpen && (
        <Modal
          toggleModal={() => setIsDeleteModalOpen(!isDeleteModalOpen)}
          modalHeader="Delete Feature?"
          modalFooter={modalFooter}
        >
          Are you sure you want to delete this feature?
        </Modal>
      )}
    </div>
  );
};

export default DungeonFeaturesDashboard;
