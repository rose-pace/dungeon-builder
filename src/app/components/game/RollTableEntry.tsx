'use client';

import React, { useState } from 'react';
import DataTable from '@components/common/DataTable';
import { Die, RollTable } from '@/types';

const RollTableEntry = ({ value }: { value: RollTable }) => {
  const [rollTable, setRollTable] = useState<RollTable>({
    name: value.name || '',
    description: value.description || '',
    dice: value.dice || 6,
    rollTableEntries: value.rollTableEntries || [],
  });
  const possibleDice = [2, 3, 4, 6, 8, 10, 12, 20, 100];

  const addEntry = () => {
    setRollTable(prevState => ({
      ...prevState,
      dice: determineDice(prevState.rollTableEntries.length + 1),
      rollTableEntries: [
        ...prevState.rollTableEntries,
        { description: '', dieRollTargets: [] },
      ],
    }));
  };

  const updateEntry = (index: number, field: string, value: string | number[]) => {
    const updatedEntries = rollTable.rollTableEntries.map((entry, i) =>
      i === index ? { ...entry, [field]: value } : entry,
    );
    setRollTable({ ...rollTable, rollTableEntries: updatedEntries });
  };

  const determineDice = (numEntries: number): Die => {
    if (numEntries <= 2) return 2;
    if (numEntries <= 3) return 3;
    if (numEntries <= 4) return 4;

    if (numEntries <= 12) {
      if (possibleDice.includes(numEntries)) return numEntries as Die;

      const i = possibleDice.indexOf(numEntries + 1) + 2;
      return Math.min(possibleDice[i], 20) as Die;
    }

    if (numEntries <= 20) return 20;

    return 100;
  };

  /**
   * Assigns die roll targets based on the number of entries
   * @param numEntries - Number of entries to assign targets for
   * @returns Array of target arrays
   */
  const assignDieRollTargets = (numEntries: number): number[][] => {
    const dice = determineDice(numEntries);
    const maxTargetsPerEntry = Math.floor(dice / numEntries);
    const remainder = dice % numEntries;
    const targets: number[][] = [];
    for (let i = 0; i < numEntries; i++) {
      const targetCount = i < remainder ? maxTargetsPerEntry + 1 : maxTargetsPerEntry;
      const startValue = i * maxTargetsPerEntry + (i < remainder ? i : remainder);
      const targetArray = Array.from(
        { length: targetCount },
        (_, index) => startValue + index + 1,
      );
      targets.push(targetArray);
    }
    return targets;
  };

  const handleAddEntry = () => {
    addEntry();
    const numEntries = rollTable.rollTableEntries.length + 1;
    const targets = assignDieRollTargets(numEntries);
    setRollTable(prevState => ({
      ...prevState,
      rollTableEntries: prevState.rollTableEntries.map((entry, index) => ({
        ...entry,
        dieRollTargets: targets[index],
      })),
    }));
  };

  const columns = [
    { key: 'dieRollTargets', headerContent: 'Die Roll Targets' },
    { key: 'description', headerContent: 'Description' },
  ];

  const data = rollTable.rollTableEntries.map((entry, index) => ({
    dieRollTargets: (
      <input
        type="text"
        placeholder="Die Roll Targets"
        value={entry.dieRollTargets.join(', ')}
        onChange={e => updateEntry(index, 'dieRollTargets', e.target.value.split(',').map(Number))}
      />
    ),
    description: (
      <input
        type="text"
        placeholder="Description"
        value={entry.description}
        onChange={e => updateEntry(index, 'description', e.target.value)}
      />
    ),
  }));

  return (
    <div>
      <h2>Roll Table</h2>
      <input
        type="text"
        placeholder="Name"
        value={rollTable.name}
        onChange={e => setRollTable({ ...rollTable, name: e.target.value })}
      />
      <textarea
        placeholder="Description"
        value={rollTable.description}
        onChange={e => setRollTable({ ...rollTable, description: e.target.value })}
      />
      <select
        value={rollTable.dice}
        onChange={e => setRollTable({ ...rollTable, dice: Number(e.target.value) as Die })}
      >
        {possibleDice.map(die => (
          <option key={die} value={die}>
            d
            {die}
          </option>
        ))}
      </select>
      <button onClick={handleAddEntry} disabled={rollTable.rollTableEntries.length > 99}>Add Entry</button>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default RollTableEntry;
