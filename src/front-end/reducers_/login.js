import {
  CHANGE_NAME,
  CHANGE_PWD,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
} from '../constants/loginTypes';
import {getUser, setUser} from '../utils/tokenHandler';
import createHistory from 'history/createBrowserHistory';
const history = createHistory();

const user = getUser();

const initialState = {
  username: 'liying',
  password: 'Mima12345',
  loading: false,
  token: user.token,
  id: user.id
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
      const user = action.payload;
      setUser(user);
      return {
        ...state,
        username: user.name,
        token: user.token,
        id: user._id,
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