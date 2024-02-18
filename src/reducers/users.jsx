/* eslint-disable react-refresh/only-export-components */
import { AUTH, LOGOUT, REGISTER, LOGIN, ERROR, UPDATEUSER } from '../constants/actionTypes';
const initialState = {
  authData : null,
  error: null,
}
export default (state = initialState, action) => {
  switch (action.type) {
        case AUTH:
            localStorage.setItem('profile', JSON.stringify({...action?.payload}))
            return { ...state, authData: action?.payload, error:null };
        case LOGOUT:
          localStorage.clear()
          return {...state, authData: null, error:null}
        case REGISTER:
          localStorage.setItem('profile', JSON.stringify(action?.payload))
          return { ...state, authData: action?.payload, error:null };
        case LOGIN:
          localStorage.setItem('profile', JSON.stringify(action?.payload))
          return { ...state, authData: action?.payload, error:null };
        case UPDATEUSER:
          localStorage.setItem('profile', JSON.stringify(action?.payload))
          return {...state, authData:action?.payload, error:null}
        case ERROR:
          return {  authData: null, error: action?.payload };
    default:
      return state;
  }
};