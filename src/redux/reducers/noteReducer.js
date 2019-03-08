import { types } from '../actions/types';

const INITIAL_STATE = {
  notes: [],
  categories: [],
  pickerItems: [],
  loading: false,
  error: false
};

export default function noteReducer(state = INITIAL_STATE, action) {
  const { type, payload, error } = action;
  switch (type) {
    case types.FETCH_NOTES_LOADING:
      return { ...state, loading: true, error: false };

    case types.FETCH_NOTES_RESPONSE:
      return { ...state, loading: false, notes: payload };

    case types.ADD_NOTE:
      return { ...state, loading: false, notes: payload };

    case types.UPDATE_NOTE:
      return { ...state, loading: false, notes: payload };

    case types.DELETE_NOTE:
      return { ...state, loading: false, notes: payload };

    case types.ADD_CATEGORY:
      return { ...state, loading: false };

    case types.FETCH_CATEGORY: {
      const pickerItems = [];
      payload.forEach((element) => {
        pickerItems.push(element.category);
      });
      return { ...state, loading: false, pickerItems, categories: payload };
    }
    default:
      return state;
  }
}
