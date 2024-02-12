import { AUTH, LOGOUT, REGISTER, LOGIN } from '../constants/actionTypes';

export default (state = {authData : null}, action) => {
  switch (action.type) {
        case AUTH:
            console.log('here is the data from reducers', action?.payload)
            localStorage.setItem('profile', JSON.stringify({...action?.payload}))
            return { ...state, authData: action?.payload };
          case LOGOUT:
            localStorage.clear()
            return {...state, authData: null}
          case REGISTER:
            console.log('here is the data from register', action?.payload)
            localStorage.setItem('profile', JSON.stringify(action?.payload))
            return { ...state, authData: action?.payload };
          case LOGIN:
            console.log('here is the data from login', action?.payload)
            localStorage.setItem('profile', JSON.stringify(action?.payload))
            return { ...state, authData: action?.payload };
    default:
      return state;
  }
};