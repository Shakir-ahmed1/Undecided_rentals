import { GETRENTAL, POSTRENTAL } from "../constants/actionTypes";

const initialState = {
    rentalDetails : null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case GETRENTAL:
            return { ...state, rentalDetails:action.payload}
        case POSTRENTAL:
            return {...state, rentalDetails:action.payload}
        default:
            return state
    }
}