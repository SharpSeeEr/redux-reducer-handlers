import { expect } from 'chai';
import { AnyAction } from 'redux';
import { createReducer, HandlersObjectMap } from '.';

interface ChipsState {
  favorite: string,
  forSale: string[]
}

describe('createReducer', function () {
  const SET_FAVORITE_CHIPS = 'chips/SET_FAVORITE_CHIPS';
  const SET_CHIPS_FOR_SALE = 'chips/SET_CHIPS_FOR_SALE';

  const initialState: ChipsState = {
    favorite: '',
    forSale: ['BBQ', 'Sea Salt', 'Plain', 'Jalepeno']
  };

  const chipsHandlers: HandlersObjectMap<ChipsState, AnyAction> = {
    [SET_FAVORITE_CHIPS]: (state: ChipsState, action: AnyAction) => {
      state.favorite = action.payload;
    },
    [SET_CHIPS_FOR_SALE]: (state: ChipsState, action: AnyAction) => {
      state.forSale = action.payload;
    },
  }

  it('should create a redux reducer function', function() {
    const reducer = createReducer(initialState, chipsHandlers);
    expect(reducer).to.be.a('function');
  });

  it('should create a redux reducer that initializes the state properly', function() {
    const reducer = createReducer(initialState, chipsHandlers);
    const state = reducer(undefined, { type: '__INIT__' });

    expect(state).to.have.property('favorite').to.equal('');
    expect(state).to.have.property('forSale').to.deep.equal(['BBQ', 'Sea Salt', 'Plain', 'Jalepeno']);
  });


  it('should create a redux reducer returns a new updated state', function() {
    const reducer = createReducer(initialState, chipsHandlers);
    const state = reducer(undefined, { type: '__INIT__' });

    const updatedState = reducer(state, { type: SET_FAVORITE_CHIPS, payload: 'BBQ' });

    expect(state).to.not.equal(updatedState);
    expect(state.favorite).to.equal('');
    expect(updatedState.favorite).to.equal('BBQ');
  });
});
