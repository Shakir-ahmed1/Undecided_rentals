import { GETRENTAL, POSTRENTAL, ERROR } from "../constants/actionTypes";

const initialState = {
    rentalDetails : null,
    error: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case GETRENTAL:
            return { ...state, rentalDetails:action.payload}
        case POSTRENTAL:
            return {...state, rentalDetails:action.payload}
        case ERROR:
            return {  rentalDetails: null, error: action?.payload };
        default:
            return state
    }
}