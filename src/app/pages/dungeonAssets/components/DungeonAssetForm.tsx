import React from 'react';
import { DungeonAsset } from '@/types';
import FormItem from '@/app/components/forms/FormItem';
import Form from '@/app/components/forms/Form';
import Grid from '@/app/components/layout/Grid';

interface DungeonAssetFormProps {
  dungeonAsset?: DungeonAsset;
  submitAction: (initialState: DungeonAsset, updateState: FormData) => Promise<DungeonAsset>;
}

const DungeonAssetForm: React.FC<DungeonAssetFormProps> = ({ dungeonAsset = {} as DungeonAsset, submitAction }) => {
  return (
    <Form
      data={dungeonAsset}
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
                <option value="ENCOUNTER">Encounter</option>
                <option value="HAZARD">Hazard</option>
                <option value="TREASURE">Treasure</option>
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
            label="Child Assets"
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

export default DungeonAssetForm;
