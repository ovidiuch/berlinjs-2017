const initialState = { name: null };

export default (state = initialState, action) => {
  if (action.type === 'SET_NAME') {
    return {
      ...state,
      name: action.name
    };
  }

  return state;
};
