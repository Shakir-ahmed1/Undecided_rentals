import { getMyHouses } from "../api/api";
import {
  GETRENTAL,
  POSTRENTAL,
  ERROR,
  RENTALOCATION,
  AMENITY,
  GETALLAMENETIES,
  DELETEAMENITY,
  UPLOADPHOTO,
  GETIMAGES,
  LOADING,
  NOTLOADING, 
  DELETEHOUSE,
  UPDATEHOUSE,
  GETMYHOUSES,
  GETREVIEW,
  REQUESTRENT,
  CLEARSTATUS
} from "../constants/actionTypes";

const initialState = {
  rentalDetails: { amenities: [] },
  getAllRentals: [],
  getMyRentals:[],
  getImages: [],
  getReview:[],
  requestStatus:'',
  loading: true,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GETRENTAL:
      return { ...state, getAllRentals: action?.payload };
    // case LOADING:
    //   return { ...state, loading: true };
    // case NOTLOADING:
    //   return { ...state, loading: false };
    case POSTRENTAL:
      return {
        ...state,
        getAllRentals: [...state.getAllRentals, action?.payload],
        getMyRentals:[...state.getMyRentals, action?.payload],
        error: null,
      };
    case RENTALOCATION:
      return {
        ...state,
        rentalDetails: {
          ...state.rentalDetails,
          location: action?.payload,
          error: null,
        },
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
        rentalDetails: {
          ...state.rentalDetails,
          amenities: action?.payload,
          error: null,
        },
      };
    case DELETEAMENITY:
      return {
        ...state,
        rentalDetails: {
          ...state.rentalDetails,
          amenities: state.rentalDetails.amenities.filter(
            (amenity) => amenity._id !== action.payload._id
          ),
        },
      };
    case UPLOADPHOTO:
      return {
        ...state,
        rentalDetails: {
          ...state.rentalDetails,
          housePhotos: action.payload,
        },
      };
    case GETIMAGES:
      return {
        ...state,
        getImages: [action.payload],
      };
    case GETMYHOUSES:
      return {
        ...state,
        getMyRentals: action?.payload
      }
    case UPDATEHOUSE:
      return {
        ...state,
        getAllRentals:state.getAllRentals.map(
          (rental) => rental?._id === action?.payload?.house?._id ? action?.payload?.house : rental
        ),
        getMyRentals:state.getMyRentals.map(
          (rental) => rental?._id === action?.payload?.house?._id ? action?.payload?.house : rental
        ),
      }
    case DELETEHOUSE:
      return {
        ...state,
        getAllRentals: state.getAllRentals.filter(
          (rental) => rental?._id !== action?.payload),
        getMyRentals: state.getMyRentals.filter(
          (rental) => rental?._id !== action?.payload),
      }
    case GETREVIEW:
      return {
        ...state,
        getReview:action?.payload
      }
    case REQUESTRENT:
      return {
        ...state,
        requestStatus:action?.payload
      }
    case CLEARSTATUS:
      return {
        ...state,
        requestStatus:null
      }
    case ERROR:
      return {
        rentalDetails: { ...state.rentalDetails },
        error: action?.payload,
      };
    default:
      return state;
  }
};
