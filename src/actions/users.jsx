import * as api from '../api/api'
import { REGISTER, LOGIN, ERROR, UPDATEUSER, GETPROFILE } from '../constants/actionTypes'


export const signIn = (formData, navigate) => async (dispatch) => {
    try {
        const response = await api.signIn(formData);
        console.log(response)
        dispatch({type: LOGIN, payload:response.data})
        navigate('/')
    } catch (error) {
        dispatch({type:ERROR, payload:error.response.data.error})
        console.log(error)
}
}

export const signUp = (formData, navigate) => async (dispatch) => {
    try {
        const response = await api.signUp(formData);
        console.log(response)
        dispatch({type: REGISTER, payload:response.data.user})
        navigate('/')
    } catch (error) {
        dispatch({type:ERROR, payload:error})
    }
}


export const updatedUser = (userId, updatedUser, navigate) => async (dispatch) => {
    try {
        const response = await api.updateUser(userId, updatedUser);
        console.log(JSON.parse(response.config.data))
        dispatch({type: UPDATEUSER, payload:JSON.parse(response.config.data)})
        navigate('/')
    } catch (error) {
        console.log(error)
    }
}

export const getUserProfile = (userId) => async (dispatch) => {
    try {
        const response = await api.getProfile(userId);
        dispatch({type: GETPROFILE, payload:JSON.parse(response)})
    } catch (error) {
        console.log(error)
    }
}