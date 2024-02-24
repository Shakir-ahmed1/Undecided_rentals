/* eslint-disable react-refresh/only-export-components */
import { AUTH, LOGOUT, REGISTER, LOGIN, ERROR, UPDATEUSER, GETPROFILE } from '../constants/actionTypes';
import Cookies from "js-cookie";

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
          Cookies.remove('accessToken')
          return {...state, authData: null, error:null}
        case REGISTER:
          localStorage.setItem('profile', JSON.stringify(action?.payload))
          //Cookies.set('accessToken', JSON.parse(localStorage.getItem('profile'))?.accessToken, { expires: 1 , secure:false, httpOnly: false});
          return { ...state, authData: action?.payload, error:null };
        case LOGIN:
          localStorage.setItem('profile', JSON.stringify(action?.payload))
          //Cookies.set('accessToken', JSON.parse(localStorage.getItem('profile'))?.accessToken, { expires: 1 , secure:false , httpOnly: false});
          return { ...state, authData: action?.payload, error:null };
        case UPDATEUSER:
          return state
        case ERROR:
          return {  authData: null, error: action?.payload };
        case GETPROFILE:
          return {...state, authData:{...state.authData, ...action.payload}, error:null}
        default:
          return state;
  }
};