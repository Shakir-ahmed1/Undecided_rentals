import * as api from '../api/api';
import { GETRENTAL, POSTRENTAL } from '../constants/actionTypes'

export const getRentalData = () => async (dispatch) => {
    try {
        const response = await api.getRentalDetails();
        console.log('here is the data in the dispatched action',response)
        dispatch({ type: GETRENTAL, payload: response.data })  
    } catch (error) {
        console.log(error)
    }
}

export const postRentalDetails = (rentalData) => async (dispatch) => {
    try {
        const response = await api.postRentalDetails(rentalData);
        console.log('here is the data in the dispatched action',response)
        dispatch({ type: POSTRENTAL, payload: response })  
    } catch (error) {
        console.error(error)
    }
}