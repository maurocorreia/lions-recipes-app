const INITIAL_STATE = {
  email: '',
};

const userReducer = (state = INITIAL_STATE, action) => {
  const objectUserReducer = {
    USER_LOGIN: { ...state, email: action.payload },
  };
  return objectUserReducer[action.type] || state;
};

export default userReducer;
