import * as api from '../api/api';
import {
  ERROR,
  GETRENTAL,
  POSTRENTAL,
  RENTALOCATION,
  AMENITY,
  GETALLAMENETIES,
  DELETEAMENITY,
  UPLOADPHOTO,
  GETIMAGES,
  DELETEHOUSE,
  UPDATEHOUSE,
  GETMYHOUSES,
  GETREVIEW,
  REQUESTRENT,
  ACCEPTRENT
} from "../constants/actionTypes";

export const getRentalData = () => async (dispatch) => {
    try {
        const response = await api.getRentalDetails();
        // console.log('here is the data in the dispatched action',response)
        dispatch({ type: GETRENTAL, payload: response.data })
    } catch (error) {
        console.log(error)
        dispatch({ type: ERROR, payload: error?.response?.data})
    }
}

export const postRentalDetails = (rentalData) => async (dispatch) => {
    try {
        const response = await api.postRentalDetails(rentalData);
        // console.log('here is the data in the dispatched action',response.data.house)
        dispatch({ type: POSTRENTAL, payload: response?.data?.house })  
    } catch (error) {
        console.error(error)
        dispatch({ type: ERROR, payload: error?.response?.data})
    }
}

export const postRentalLocation = (locationData) => async (dispatch) => {
    try {
        const response = await api.postRentalLocation(locationData)
        // console.log('here is the data of the location',response)
        dispatch({ type: RENTALOCATION, payload: response.data.location })  
    } catch (error) {
        console.error(error)
        dispatch({ type: ERROR, payload: error.response.data})
    }
}

export const postRentalAmenity = (amenityData) => async (dispatch) => {
    try {
        const response = await api.postRentalAmenity(amenityData)
        // console.log('here is the data of the amenity',response)
        dispatch({ type: AMENITY, payload: response })  
    } catch (error) {
        console.error(error)
        dispatch({ type: ERROR, payload: error.response.data})
    }
}

export const getAllAmenities = () => async (dispatch) => {
   try {
    const response = await api.getAllAmenities()
    // console.log('here is all data of amenities', response)
    dispatch({type: GETALLAMENETIES, payload:response.data})
   } catch (error) {
    console.log(error)
    dispatch({ type: ERROR, payload: error?.response?.data})
   }
}

export const deleteAmenityById = (AmenityId) => async (dispatch) => {
   try {
    const response = await api.deleteAmenityById(AmenityId)
    // console.log('here is the amenity that is deleted', response)
    dispatch({type: DELETEAMENITY, payload:response.data})
   } catch (error) {
    console.log(error)
    dispatch({ type: ERROR, payload: error?.response?.data})
   }
}

export const uploadPostPhoto = (image) => async (dispatch) => {
    try {
        const response = await api.uploadPostPhoto(image)
        // console.log('here is the response of uploadinga photo', response.data)
        dispatch({type:UPLOADPHOTO, payload:response.data})
    } catch (error) {
        console.log(error)
        dispatch({ type: ERROR, payload: error?.response?.data})
    }
}

export const getAllImages = (image) => async (dispatch) => {
    try {
        const response = await api.getAllImages(image)
        // console.log('here is all images', response.data)
        dispatch({type:GETIMAGES, payload:response.data})
    } catch (error) {
        console.log(error)
        dispatch({ type: ERROR, payload: error?.response?.data})
    }
}

export const updateHouseById = (houseId, updatedData) => async(dispatch) => {
    try {
        const response = await api.updateHouseById(houseId, updatedData)
        // console.log('here is the response of the updated house', response)
        dispatch({type:UPDATEHOUSE, payload:response.data})
    } catch (error) {
        console.log(error)
        dispatch({ type: ERROR, payload: error?.response?.data})
    }
}

export const deleteHouseById = (houseId) => async (dispatch) => {
    try {
        await api.deleteHouseById(houseId)
        // console.log('here is the response of deleting house', response)
        dispatch({type:DELETEHOUSE, payload: houseId})
    } catch (error) {
        console.log(error)
        dispatch({ type: ERROR, payload: error?.response?.data})
    }
}

export const getMyHouses = () => async (dispatch) => {
    try {
        const response = await api.getMyHouses()
        // console.log('here is my houses', response.data)
        dispatch({type:GETMYHOUSES, payload: response.data})
    } catch (error) {
        console.log(error)
        dispatch({ type: ERROR, payload: error?.response?.data})
    }
}

export const getReviewByHouseId = (houseId) => async(dispatch) => {
    try {
        const response = await api.getReviewByHouseId(houseId)
        // console.log('here is the response of getting house by id', response)
        dispatch({type:GETREVIEW, payload: response?.data})
    } catch (error) {
        console.log(error)
        dispatch({ type: ERROR, payload: error?.response?.data})
    }
}

export const requestRent = (houseId) => async (dispatch) => {
    try {
        const response = await api.requestRent(houseId)
        console.log('here is the response from the request', response)
        dispatch({type:REQUESTRENT, payload:response.data})
    } catch (error) {
        console.log(error)
        dispatch({ type: REQUESTRENT, payload: error?.response?.data})
    }
}

export const acceptRent = (houseId, userId) => async (dispatch) => {
    try {
        const response = await api.acceptRent(houseId, userId)
        console.log('here is the response of accepting', response)
        dispatch({type:ACCEPTRENT, payload:response.data})
    } catch (error) {
        console.log(error)
    }
}