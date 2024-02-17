/* eslint-disable react-refresh/only-export-components */
import { AUTH, LOGOUT, REGISTER, LOGIN, ERROR, UPDATEUSER } from '../constants/actionTypes';
const initialState = {
  authData : null,
  error: null,
  success: false
}
export default (state = initialState, action) => {
  switch (action.type) {
        case AUTH:
            localStorage.setItem('profile', JSON.stringify({...action?.payload}))
            return { ...state, authData: action?.payload, error:null, success: false };
        case LOGOUT:
          localStorage.clear()
          return {...state, authData: null, error:null, success:false}
        case REGISTER:
          localStorage.setItem('profile', JSON.stringify(action?.payload))
          return { ...state, authData: action?.payload, error:null, success:true };
        case LOGIN:
          localStorage.setItem('profile', JSON.stringify(action?.payload))
          return { ...state, authData: action?.payload, error:null, success: true };
        case UPDATEUSER:
          localStorage.setItem('profile', JSON.stringify(action?.payload))
          return {...state, authData:action?.payload, error:null, success: false}
        case ERROR:
          return {  authData: null, error: action?.payload, success: false };
    default:
      return state;
  }
};