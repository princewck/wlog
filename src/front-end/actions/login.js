import {
  CHANGE_NAME,
  CHANGE_PWD,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
} from '../constants/loginTypes';


export const doLogin = () => ({
  types: [LOGIN_START, LOGIN_SUCCESS, LOGIN_ERROR],
  url: '/api/login',
  method: 'POST',
  data: ({ login: { username: name, password } }) => ({
    name,
    password,
  })
});

export const changeName = (value) => ({
  type: CHANGE_NAME,
  payload: value,
})

export const changePassword = (value) => ({
  type: CHANGE_PWD,
  payload: value,
});