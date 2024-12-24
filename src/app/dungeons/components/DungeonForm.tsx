'use client';

import React, { useState } from 'react';
import { Dungeon } from '@/types';
import FormItem from '@components/forms/FormItem';
import Grid from '@components/layout/Grid';
import FormCommands from '@components/forms/FormCommands';

interface DungeonFormProps {
  dungeon?: Dungeon;
  onSubmit: (formData: Dungeon) => void;
}

const DungeonForm: React.FC<DungeonFormProps> = ({ dungeon = {} as Dungeon, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: dungeon.name || '',
    slug: dungeon.slug || '',
    description: dungeon.description || '',
    images: dungeon.images || '',
    audio: dungeon.audio || '',
    campaignNotes: dungeon.campaignNotes || '',
    dmSecrets: dungeon.dmSecrets || '',
  } as Dungeon);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="py-8 px-4 rounded-xl bg-gradient-to-br from-slate-400 dark:from-slate-600">
      <Grid columns={2}>
        <FormItem
          label="Name"
          isRequired={true}
          renderFormElement={id => (
            <input id={id} type="text" name="name" value={formData.name} onChange={handleChange} />
          )}
        />
        <FormItem
          label="Slug"
          isRequired={true}
          renderFormElement={id => (
            <input id={id} type="text" name="slug" value={formData.slug} onChange={handleChange} />
          )}
        />
        <FormItem
          label="Images"
          renderFormElement={id => (
            <input id={id} type="text" name="images" value={formData.images} onChange={handleChange} />
          )}
        />
        <FormItem
          label="Audio"
          renderFormElement={id => (
            <input id={id} type="text" name="audio" value={formData.audio} onChange={handleChange} />
          )}
        />
        <FormItem
          label="Description"
          renderFormElement={id => (
            <textarea id={id} name="description" value={formData.description} onChange={handleChange} className="h-full" />
          )}
          className="row-span-2"
        />
        <FormItem
          label="Campaign Notes"
          renderFormElement={id => (
            <textarea id={id} name="campaignNotes" value={formData.campaignNotes} onChange={handleChange} />
          )}
        />
        <FormItem
          label="DM Secrets"
          renderFormElement={id => (
            <textarea id={id} name="dmSecrets" value={formData.dmSecrets} onChange={handleChange} />
          )}
        />
      </Grid>
      <FormCommands
        className="mt-6 pt-6 border-t border-sky-700"
        commands={[
          { id: 'submit', label: 'Submit', type: 'submit' },
          { id: 'reset', label: 'Reset', type: 'reset' },
        ]}
      />
    </form>
  );
};

export default DungeonForm;
