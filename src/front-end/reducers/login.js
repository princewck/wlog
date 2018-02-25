import {
  CHANGE_NAME,
  CHANGE_PWD,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
} from '../constants/loginTypes';

const initialState = {
  username: null,
  password: null,
  loading: false,
};

export default function loginReducer(
  state = initialState,
  action = {}
) {
  switch (action.type) {
    case CHANGE_NAME:
      return {
        ...state,
        username: action.payload,
      }
    case CHANGE_PWD:
      return {
        ...state,
        password: action.payload,
      }
    case LOGIN_START:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_SUCCESS:
      // persistent token to storage;
      return {
        ...state,
        loading: false,
      }
    case LOGIN_ERROR:
      return {
        ...state,
        loading: false,
      }
    default: 
      return state;
  }
}