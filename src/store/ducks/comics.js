/**
 * Reducers
 */

export const Types = {
  ADD_REQUEST: 'comics/ADD_REQUEST',
  ADD_SUCCESS: 'comics/ADD_SUCCESS',
  ADD_FAILURE: 'comics/ADD_FAILURE',
};

const INITIAL_STATE = {
  data: [],
  limit: 50,
  offset: 0,
  loading: false,
};

export default function comics(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.ADD_REQUEST:
      return { ...state, loading: true };

    case Types.ADD_SUCCESS:
      return {
        ...state,
        loading: false,
        offset: state.offset + state.limit,
        data: [...state.data, ...action.payload.data.results],
      };
    case Types.ADD_FAILURE:
      return { ...state, loading: false };

    default:
      return state;
  }
}

/**
 * Actions
 */

export const Creators = {
  addComicsRequest: () => ({
    type: Types.ADD_REQUEST,
    payload: {},
  }),

  addComicsSuccess: data => ({
    type: Types.ADD_SUCCESS,
    payload: { data },
  }),

  addComicsFailure: error => ({
    type: Types.ADD_FAILURE,
    payload: { error },
  }),
};
