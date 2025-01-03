import React, { useState } from 'react';
import { DungeonFeature, DUNGEON_FEATURE_TYPES } from '@/types';

interface EditDungeonFeatureProps {
  feature: DungeonFeature;
  onSave: (feature: DungeonFeature) => void;
}

const EditDungeonFeature: React.FC<EditDungeonFeatureProps> = ({ feature, onSave }) => {
  const [editedFeature, setEditedFeature] = useState<DungeonFeature>(feature);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setEditedFeature(prevFeature => ({
      ...prevFeature,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSave = () => {
    onSave(editedFeature);
  };

  return (
    <div className="p-4 border rounded-lg">
      <h3 className="text-xl font-bold">Edit Dungeon Feature</h3>
      <input
        type="text"
        name="name"
        value={editedFeature.name}
        onChange={handleChange}
        placeholder="Name"
        className="w-full p-2 mb-2 border rounded"
      />
      <textarea
        name="description"
        value={editedFeature.description}
        onChange={handleChange}
        placeholder="Description"
        className="w-full p-2 mb-2 border rounded"
      />
      <input
        type="text"
        name="images"
        value={editedFeature.images}
        onChange={handleChange}
        placeholder="Images"
        className="w-full p-2 mb-2 border rounded"
      />
      <select
        name="type"
        value={editedFeature.type}
        onChange={handleChange}
        className="w-full p-2 mb-2 border rounded"
      >
        <option value={DUNGEON_FEATURE_TYPES.DOOR}>Door</option>
        <option value={DUNGEON_FEATURE_TYPES.HAZARD}>Hazard</option>
        <option value={DUNGEON_FEATURE_TYPES.HIDDEN}>Hidden</option>
        <option value={DUNGEON_FEATURE_TYPES.MONSTER_ENCOUNTER}>Monster Encounter</option>
        <option value={DUNGEON_FEATURE_TYPES.NPC_ENCOUNTER}>NPC Encounter</option>
        <option value={DUNGEON_FEATURE_TYPES.PASSAGE}>Passage</option>
        <option value={DUNGEON_FEATURE_TYPES.PUZZLE}>Puzzle</option>
        <option value={DUNGEON_FEATURE_TYPES.ROOM}>Room</option>
        <option value={DUNGEON_FEATURE_TYPES.TRAP}>Trap</option>
        <option value={DUNGEON_FEATURE_TYPES.TREASURE}>Treasure</option>
      </select>
      <label className="block mb-2">
        <input
          type="checkbox"
          name="noChildren"
          checked={editedFeature.noChildren}
          onChange={handleChange}
          className="mr-2"
        />
        No Children
      </label>
      <label className="block mb-2">
        <input
          type="checkbox"
          name="mustHaveParent"
          checked={editedFeature.mustHaveParent}
          onChange={handleChange}
          className="mr-2"
        />
        Must Have Parent
      </label>
      <button onClick={handleSave} className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
        Save Feature
      </button>
    </div>
  );
};

export default EditDungeonFeature;
