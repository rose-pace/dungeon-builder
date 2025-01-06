import React from 'react';
import { DungeonFeature, DUNGEON_FEATURE_TYPES } from '@/types';
import FormItem from '@/app/components/forms/FormItem';
import Form from '@/app/components/forms/Form';
import Grid from '@/app/components/layout/Grid';

interface DungeonFeatureFormProps {
  dungeonFeature?: DungeonFeature;
  submitAction: (initialState: DungeonFeature, updateState: FormData) => Promise<DungeonFeature>;
}

const DungeonFeatureForm: React.FC<DungeonFeatureFormProps> = ({ dungeonFeature = {} as DungeonFeature, submitAction }) => {
  return (
    <Form
      data={dungeonFeature}
      submitAction={submitAction}
      renderFormFields={(formData, handleChange) => (
        <Grid columns={2}>
          <FormItem
            label="Name"
            isRequired={true}
            renderFormElement={id => (
              <input
                id={id}
                type="text"
                name="name"
                defaultValue={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className="w-full p-2 mb-2 border rounded"
              />
            )}
          />
          <FormItem
            label="Slug"
            isRequired={true}
            renderFormElement={id => (
              <input
                id={id}
                type="text"
                name="slug"
                defaultValue={formData.slug}
                onChange={handleChange}
              />
            )}
          />
          <FormItem
            label="Type"
            renderFormElement={id => (
              <select
                id={id}
                name="type"
                defaultValue={formData.type}
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
            )}
          />
          <FormItem
            label="Description"
            className="row-span-2"
            renderFormElement={id => (
              <textarea
                id={id}
                name="description"
                defaultValue={formData.description}
                onChange={handleChange}
                placeholder="Description"
                className="w-full h-full p-2 mb-2 border rounded"
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
                defaultValue={formData.images}
                onChange={handleChange}
                placeholder="Images"
                className="w-full p-2 mb-2 border rounded"
              />
            )}
          />
          <div className="flex justify-between">
            <FormItem
              label="No Children"
              renderFormElement={id => (
                <input
                  id={id}
                  type="checkbox"
                  name="noChildren"
                  defaultChecked={formData.noChildren}
                  onChange={handleChange}
                  className="mr-2 mb-2"
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
                  defaultChecked={formData.mustHaveParent}
                  onChange={handleChange}
                  className="mr-2 mb-2"
                />
              )}
            />
          </div>
          <FormItem
            label="Child Whitelist"
            renderFormElement={id => (
              <select
                id={id}
              >
                <option value="">TBD</option>
              </select>
            )}
          />
          <FormItem
            label="Child Features"
            renderFormElement={id => (
              <select
                id={id}
              >
                <option value="">TBD</option>
              </select>
            )}
          />
          <FormItem
            label="Connections"
            renderFormElement={id => (
              <select
                id={id}
              >
                <option value="">TBD</option>
              </select>
            )}
          />
        </Grid>
      )}
    />
  );
};

export default DungeonFeatureForm;
