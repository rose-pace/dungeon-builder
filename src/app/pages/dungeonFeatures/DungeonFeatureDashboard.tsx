'use client';

import React, { useState } from 'react';
import { DungeonFeature } from '@/types';
import Repeater from '@/app/components/common/Repeater';
import DisplayDungeonFeature from './components/DisplayDungeonFeature';
import Modal from '@/app/components/common/Modal';
import Button from '@/app/components/common/Button';
import { useDungeonFeaturesContext } from '@providers';

// TODO: This should be limited to just the features that are part of the dungeon
const DungeonFeaturesDashboard = () => {
  const { dungeonFeatureSelectors } = useDungeonFeaturesContext();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [activeFeature, setActiveFeature] = useState<DungeonFeature | null>(null);
  const [features, setFeatures] = useState<DungeonFeature[]>(dungeonFeatureSelectors.getAll());

  const deleteAction = (feature?: DungeonFeature) => {
    if (feature) {
      setFeatures(prevFeatures => prevFeatures.filter(f => f.id !== feature.id));
    }
    setIsDeleteModalOpen(false);
  };

  const callDeleteAction = (feature: DungeonFeature) => {
    setActiveFeature(feature);
    setIsDeleteModalOpen(true);
    return false;
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
