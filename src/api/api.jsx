import axios from "axios";

// const url = "https://localhost:5000";
const url = "https://rentease.onrender.com";
// const url_place = 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary';

const API = axios.create({ baseURL: url ,
	withCredentials: true,
  headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
	credentials: 'include',
});
const accessToken = JSON.parse(localStorage.getItem("profile"))?.accessToken;
API.interceptors.request.use(
  (config) => {
    // Assuming you store the access token in localStorage
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const signIn = (formData) => API.post("/api/users/login", formData);
export const signUp = (formData) => API.post("/api/users/register", formData);
export const updateUser = (userId, updatedUser) =>
  API.put(`/api/users/${userId}/profiles`, updatedUser);
export const getProfile = (userId) => 
  API.get(`/api/users/${userId}/profiles`);

export const getRentalDetails = () => {
  try {
    const response = API.get('/api/houses')
    return response
  } catch (error) {
    console.log(error)
  }
}

export const postRentalDetails = (rentalData) => {
  try {
    const response = API.post('/api/houses', rentalData);
  return response
  } catch (error) {
    console.error(error)
  }
}
export const postRentalLocation = (locationData) => {
  try {
    const response = API.post('/api/location', locationData)
    return response
  } catch (error) {
    console.log(error)
  }
}

export const postRentalAmenity = (amenityData) => {
  try {
    const response = API.post('/api/amenities', amenityData)
    return response
  } catch (error) {
    console.log(error)
  }
}

export const getAllAmenities = () => {
  try {
    const response = API.get('/api/amenities');
    return response
  } catch (error) {
    console.log(error)
  }
}

export const deleteAmenityById = (AmenityId) => {
  try {
    const response =API.delete(`/api/amenities/${AmenityId}`)
    return response
  } catch (error) {
    console.log(error)
  }
}

export const uploadPostPhoto = (image) => {
  try {
    const response = API.post('/api/house/photos', image)
    return response
  } catch (error) {
    console.log(error)
  }
}

export const getAllImages = () => {
  try {
    const response = API.get('/api/house/photos')
    return response
  } catch (error) {
    console.error(error)
  }
}

export const updateHouseById = (houseId, updatedData) => {
  try {
    const response = API.put(`/api/houses/${houseId}`, updatedData)
    return response;
  } catch (error) {
    console.log(error)
  }
}


export const deleteHouseById = (houseId) => {
  try {
    const response = API.delete(`/api/houses/${houseId}`)
    return response
  } catch (error) {
    console.log(error)  
  }
}

export const getMyHouses = () => {
  try {
    const response = API.get('/api/my_houses')
    return response
  } catch (error) {
    console.log(error)
  }
}

export const getReviewByHouseId = (houseId) => {
  try {
    const response = API.get(`/api/reviews/houses/${houseId}`)
    return response
  } catch (error) {
    console.log(error)
  }
}

export const requestRent = (houseId) => {
  try {
    const response = API.get(`/api/houses/rent/request/${houseId}`)
    return response
  } catch (error) {
    console.log(error)
  }
}

export const acceptRent = (houseId, userId) => {
  try {
    const response = API.get(`/api/houses/rent/accept/${houseId}/${userId}`)
    return response
  } catch (error) {
    console.log(error)
  }
}
// export const getRentalDetails = async (sw, ne) => {
//     try {
//       const {data : { data }} = await axios.get(url_place, {
//         params: {
//           bl_latitude: sw.lat,
//           tr_latitude: ne.lat,
//           bl_longitude: sw.lng,
//           tr_longitude: ne.lng,
//           currency: 'USD',
//         },
//         headers: {
//           'X-RapidAPI-Key': '59bea381c6mshb0cc30f8acb89b0p122572jsn1681ba468eec',
//           'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
//         }
//       });
//       return data
//     } catch (error) {
//       console.error(error);
//     }
// }