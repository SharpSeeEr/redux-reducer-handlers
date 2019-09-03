import { Reducer, Action, AnyAction } from 'redux';
import produce, { Immutable, Draft } from 'immer';

export type Handler<S = any, A extends Action = AnyAction> = ((state: Draft<S>, action: A) => void | S) | ((state: Draft<S>) => void | S);

export type HandlersObjectMap<S = any, A extends Action = AnyAction> = {
  [key: string]: Handler<S, A>
}

export function createReducer<S = any, A extends Action = AnyAction>(initialState: Immutable<S>, handlers: HandlersObjectMap): Reducer<Immutable<S>, A> {
  return produce((draft: Draft<S>, action: A) => {
    if (handlers[action.type]) {
      handlers[action.type](draft, action);
    }
  }, initialState);
}
