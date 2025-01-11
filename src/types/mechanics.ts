export type Die = 2 | 3 | 4 | 6 | 8 | 10 | 12 | 20 | 100;

/**
 * Defines a random roll table for generating random results based on a die roll.
 */
export interface RollTable {
  name: string;
  description: string;
  dice: Die;
  rollTableEntries: {
    /** Description of the roll result */
    description: string;
    /** One or more die roll targets */
    dieRollTargets: number[];
  }[];
}
