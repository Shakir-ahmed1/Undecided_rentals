import * as api from '../api/api'
import { REGISTER, LOGIN, ERROR } from '../constants/actionTypes'

export const signIn = (formData) => async (dispatch) => {
    try {
        const response = await api.signIn(formData);
        console.log(response)
        dispatch({type: LOGIN, payload:response.data})
    } catch (error) {
        console.error(error)
        dispatch({type:ERROR, payload:error.response.data.error})
}
}

export const signUp = (formData) => async (dispatch) => {
    try {
        const response = await api.signUp(formData);
        console.log(response)
        dispatch({type: REGISTER, payload:response.data.user})
    } catch (error) {
        dispatch({type:ERROR, payload:error})
    }
}

