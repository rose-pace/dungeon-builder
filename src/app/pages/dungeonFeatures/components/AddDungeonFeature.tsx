import React, { useState } from 'react';
import { DungeonFeature, DungeonFeatureType } from '@/types';
import FormItem from '@/app/components/forms/FormItem';

interface AddDungeonFeatureProps {
  onAdd: (feature: DungeonFeature) => void;
}

const AddDungeonFeature: React.FC<AddDungeonFeatureProps> = ({ onAdd }) => {
  const [feature, setFeature] = useState<DungeonFeature>({
    id: '',
    type: DungeonFeatureType.DOOR,
    name: '',
    description: '',
    images: '',
    noChildren: false,
    mustHaveParent: false,
    childWhitelist: [],
    childFeatures: [],
    connections: [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFeature(prevFeature => ({
      ...prevFeature,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleAdd = () => {
    onAdd(feature);
    setFeature({
      id: '',
      type: DungeonFeatureType.DOOR,
      name: '',
      description: '',
      images: '',
      noChildren: false,
      mustHaveParent: false,
      childWhitelist: [],
      childFeatures: [],
      connections: [],
    });
  };

  return (
    <div className="p-4 border rounded-lg">
      <h3 className="text-xl font-bold">Add Dungeon Feature</h3>
      <FormItem
        label="Name"
        renderFormElement={id => (
          <input
            id={id}
            type="text"
            name="name"
            value={feature.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full p-2 mb-2 border rounded"
          />
        )}
      />
      <FormItem
        label="Description"
        renderFormElement={id => (
          <textarea
            id={id}
            name="description"
            value={feature.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full p-2 mb-2 border rounded"
          />
        )}
      />
      <FormItem
        label="Images"
        renderFormElement={id => (
          <input
            id={id}
            type="text"
            name="images"
            value={feature.images}
            onChange={handleChange}
            placeholder="Images"
            className="w-full p-2 mb-2 border rounded"
          />
        )}
      />
      <FormItem
        label="Type"
        renderFormElement={id => (
          <select
            id={id}
            name="type"
            value={feature.type}
            onChange={handleChange}
            className="w-full p-2 mb-2 border rounded"
          >
            <option value={DungeonFeatureType.DOOR}>Door</option>
            <option value={DungeonFeatureType.HAZARD}>Hazard</option>
            <option value={DungeonFeatureType.HIDDEN}>Hidden</option>
            <option value={DungeonFeatureType.MONSTER_ENCOUNTER}>Monster Encounter</option>
            <option value={DungeonFeatureType.NPC_ENCOUNTER}>NPC Encounter</option>
            <option value={DungeonFeatureType.PASSAGE}>Passage</option>
            <option value={DungeonFeatureType.PUZZLE}>Puzzle</option>
            <option value={DungeonFeatureType.ROOM}>Room</option>
            <option value={DungeonFeatureType.TRAP}>Trap</option>
            <option value={DungeonFeatureType.TREASURE}>Treasure</option>
          </select>
        )}
      />
      <FormItem
        label="No Children"
        renderFormElement={id => (
          <input
            id={id}
            type="checkbox"
            name="noChildren"
            checked={feature.noChildren}
            onChange={handleChange}
            className="mr-2"
          />
        )}
      />
      <FormItem
        label="Must Have Parent"
        renderFormElement={id => (
          <input
            id={id}
            type="checkbox"
            name="mustHaveParent"
            checked={feature.mustHaveParent}
            onChange={handleChange}
            className="mr-2"
          />
        )}
      />
      <button onClick={handleAdd} className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
        Add Feature
      </button>
    </div>
  );
};

export default AddDungeonFeature;
