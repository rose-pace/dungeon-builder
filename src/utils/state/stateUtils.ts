import { DispatchAction, Dispatcher } from '@/types';

const createDispatcher = <T>(sendDispatch: React.Dispatch<DispatchAction<T>>): Dispatcher<T> => {
  return {
    add: (payload: T) => sendDispatch({ type: 'add', payload }),
    change: (payload: T) => sendDispatch({ type: 'change', payload }),
    remove: (payload: T) => sendDispatch({ type: 'remove', payload }),
    set: (payload: T[]) => sendDispatch({ type: 'set', payload }),
  };
};

const createStateSelectors = <T>(state: Record<string, T>) => {
  return {
    get: (key: string) => state[key],
    getAll: () => Object.values(state),
  };
};

export {
  createDispatcher,
  createStateSelectors,
};
