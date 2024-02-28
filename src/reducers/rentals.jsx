import { GETRENTAL, POSTRENTAL, ERROR, RENTALOCATION, AMENITY, GETALLAMENETIES, DELETEAMENITY, UPLOADPHOTO, GETIMAGES } from "../constants/actionTypes";

const initialState = {
    rentalDetails : { amenities: [] },
    getAllRentals: [],
    getImages: [],
    error: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GETRENTAL:
      return { ...state, getAllRentals: action?.payload };
    case POSTRENTAL:
      return { ...state, rentalDetails: action?.payload, error:null };
    case RENTALOCATION:
      return {
        ...state,
        rentalDetails: { ...state.rentalDetails, location: action?.payload, error:null },
      };
    case AMENITY:
      return {
        ...state,
        rentalDetails: {
          ...state.rentalDetails,
          amenities: [
            ...state.rentalDetails.amenities,
            action.payload.data.amenity,
          ],
        },
      };
    case GETALLAMENETIES:
      return {
        ...state,
        rentalDetails: { ...state.rentalDetails, amenities: action?.payload, error:null },
      };
    case DELETEAMENITY:
      return {
        ...state,
        rentalDetails: {
          ...state.rentalDetails,
          amenities: state.rentalDetails.amenities.filter((amenity) => amenity._id !== action.payload._id)
        }
      };
    case UPLOADPHOTO:
      return {
        ...state,
        rentalDetails: {
          ...state.rentalDetails,
          housePhotos: action.payload
      }
    }
    case GETIMAGES:
      return {
        ...state,
        getImages: [action.payload]
    }
    case ERROR:
      return { rentalDetails: {...state.rentalDetails}, error: action?.payload };
    default:
      return state;
  }
};