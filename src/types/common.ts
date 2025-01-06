export interface DispatchAction<T> {
  type: Extract<'add' | 'set' | 'remove' | 'change', string>;
  payload: T | T[];
  context?: Record<string, string | number | object>;
}

export interface Dispatcher<T> {
  add: (payload: T) => void;
  change: (payload: T, context?: Record<string, string | number | object>) => void;
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
