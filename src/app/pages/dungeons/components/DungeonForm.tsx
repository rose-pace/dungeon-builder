'use client';

import React from 'react';
import { Dungeon } from '@/types';
import Form from '@/app/components/forms/Form';
import FormItem from '@/app/components/forms/FormItem';
import Grid from '@/app/components/layout/Grid';

interface DungeonFormProps {
  dungeon?: Dungeon;
  submitAction: (initialState: Dungeon, updateState: FormData) => Promise<Dungeon>;
}

const DungeonForm: React.FC<DungeonFormProps> = ({ dungeon = {} as Dungeon, submitAction }) => {
  return (
    <Form
      data={dungeon}
      submitAction={submitAction}
      renderFormFields={(formData, handleChange) => (
        <Grid columns={2}>
          <FormItem
            label="Name"
            isRequired={true}
            renderFormElement={id => (
              <input id={id} type="text" name="name" defaultValue={formData.name} onChange={handleChange} />
            )}
          />
          <FormItem
            label="Slug"
            isRequired={true}
            renderFormElement={id => (
              <input id={id} type="text" name="slug" defaultValue={formData.slug} onChange={handleChange} />
            )}
          />
          <FormItem
            label="Images"
            renderFormElement={id => (
              <input id={id} type="text" name="images" defaultValue={formData.images} onChange={handleChange} />
            )}
          />
          <FormItem
            label="Audio"
            renderFormElement={id => (
              <input id={id} type="text" name="audio" defaultValue={formData.audio} onChange={handleChange} />
            )}
          />
          <FormItem
            label="Description"
            renderFormElement={id => (
              <textarea id={id} name="description" defaultValue={formData.description} onChange={handleChange} className="h-full" />
            )}
            className="row-span-2"
          />
          <FormItem
            label="Campaign Notes"
            renderFormElement={id => (
              <textarea id={id} name="campaignNotes" defaultValue={formData.campaignNotes} onChange={handleChange} />
            )}
          />
          <FormItem
            label="DM Secrets"
            renderFormElement={id => (
              <textarea id={id} name="dmSecrets" defaultValue={formData.dmSecrets} onChange={handleChange} />
            )}
          />
        </Grid>
      )}
    />
  );
};

export default DungeonForm;
