'use client';

import React, { useActionState, useState } from 'react';
import { Dungeon } from '@/types';
import FormItem from '@/components/forms/FormItem';
import Grid from '@/components/layout/Grid';
import FormCommands from '@/components/forms/FormCommands';

interface DungeonFormProps {
  dungeon?: Dungeon;
  submitAction: (initialState: Dungeon, updateState: FormData) => Promise<Dungeon>;
  resetAction: () => void;
}

const DungeonForm: React.FC<DungeonFormProps> = ({ dungeon = {} as Dungeon, submitAction, resetAction = () => {} }) => {
  const [isDirty, setDirty] = useState(false);
  const [formData, formDispatch, isPending] = useActionState(
    submitAction,
    {
      id: dungeon.id || '',
      name: dungeon.name || '',
      slug: dungeon.slug || '',
      description: dungeon.description || '',
      images: dungeon.images || '',
      audio: dungeon.audio || '',
      campaignNotes: dungeon.campaignNotes || '',
      dmSecrets: dungeon.dmSecrets || '',
    } as Dungeon,
  );

  const handleChange = () => {
    if (!isDirty) {
      setDirty(true);
    }
  };

  return (
    <form action={formDispatch} className="py-8 px-4 rounded-xl bg-gradient-to-b from-slate-300 dark:from-zinc-800 from-10% via-zinc-200 dark:via-slate-700 via-50% to-gray-300 dark:to-gray-700 to-90%">
      <input type="hidden" name="id" defaultValue={formData.id} />
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
      <FormCommands
        className="mt-6 pt-6 border-t border-sky-700"
        commands={[
          { id: 'submit', label: 'Submit', type: 'submit', disabled: isPending || !isDirty },
          { id: 'reset', label: 'Reset', type: 'reset', onClick: resetAction, disabled: !isDirty },
        ]}
      />
    </form>
  );
};

export default DungeonForm;
