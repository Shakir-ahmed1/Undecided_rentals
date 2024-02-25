import * as api from '../api/api';
import { ERROR, GETRENTAL, POSTRENTAL } from '../constants/actionTypes'

export const getRentalData = () => async (dispatch) => {
    try {
        const response = await api.getRentalDetails();
        // console.log('here is the data in the dispatched action',response)
        dispatch({ type: GETRENTAL, payload: response.data })
    } catch (error) {
        console.log(error)
        dispatch({ type: ERROR, payload: error.response.data})
    }
}

export const postRentalDetails = (rentalData) => async (dispatch) => {
    try {
        const response = await api.postRentalDetails(rentalData);
        console.log('here is the data in the dispatched action',response)
        dispatch({ type: POSTRENTAL, payload: response })  
    } catch (error) {
        console.error(error)
        dispatch({ type: ERROR, payload: error.response.data})
    }
}