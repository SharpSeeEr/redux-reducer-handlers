# Redux Reducer Handlers
A library for converting Reducer switch statements to a dictionary map of handlers, which are simply callbacks that can directly modify the passed in state.

Instead of defining a Reducer like this:

```javascript
const SET_FAVORITE_CHIPS = 'chips/SET_FAVORITE_CHIPS';
const SET_CHIPS_FOR_SALE = 'chips/SET_CHIPS_FOR_SALE';

const initialState = {
  favorite: '',
  forSale: ['BBQ', 'Sea Salt', 'Plain', 'Jalepeno']
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_FAVORITE_CHIPS:
      return { ...state, favorite: action.payload };
    case SET_CHIPS_FOR_SALE:
      return { ...state, forSale: action.payload };
    default:
      return state;
  }
}
```

You define them as Handler functions.  Handler functions are passed a mutable, draft copy of the state and the action.  They may directly modify the draft state, and do not return any value.  The object map of Handlers is passed into the `createReducer` function, which returns a redux reducer. Your reducer code now looks like this:

```javascript
const handlers = {
  [SET_FAVORITE_CHIPS]: (draft, action) => {
    draft.favorite = action.payload;
  },
  [SET_CHIPS_FOR_SALE]: (draft, action) => {
    draft.forSale = action.payload;
  }
}

const reducer = createReducer(initialState, handlers);
```

In the background `createReducer` uses [immer](https://github.com/immerjs/immer) to create a mutable copy of the state.

## Quick Start

1. Install using npm, yarn, pnmp, or whatever package manager you use:

   ``` bash
   npm install redux-handlers
   yarn add redux-handlers
   pnmp install redux-handlers
   ```

1. Import `createReducer` into your reducers file and use to convert your handlers map object to a reducer:

   ``` javascript
   import createReducer from 'redux-reducer-handlers';

   const reducer = createReducer(initialState, handlers)
   ```
