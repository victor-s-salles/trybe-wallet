import { LOGIN } from '../actions';

const initialState = {
  email: 'Configure seu email!',
};

function userReducer(state = initialState, action) {
  switch (action.type) {
  case LOGIN:
    return {
      ...state,
      email: action.payload,
    };
  default:
    return state;
  }
}
export default userReducer;
