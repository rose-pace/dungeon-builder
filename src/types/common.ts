export interface DispatchAction<T> {
  type: Extract<'add' | 'set' | 'remove' | 'change', string>;
  payload: T | T[];
}

export interface Dispatcher<T> {
  add: (payload: T) => void;
  change: (payload: T) => void;
  remove: (payload: T) => void;
  set: (payload: T[]) => void;
}

export interface IEntity {
  id: string;
  createdAt: number;
  updatedAt?: number;
}

export interface ValidationDisplay {
  lead: string | null;
  show: boolean;
  errors: string[];
  warnings: string[];
}
