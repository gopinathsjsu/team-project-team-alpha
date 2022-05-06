/* eslint-disable no-alert */
import axios from "axios";
import backendServer from "../../Config";
import {
  GET_HOTEL_DETAILS,
  STORE_SEARCH_PARAMS,
  SET_SELECTED_HOTEL,
  GET_HOTEL_ROOMS,
  SET_SELECTED_AMENITIES,
  SET_SELECTED_ROOM,
  ADD_TO_CART
} from "./types";


export const storeSearchParams =
  (searchData) => async (dispatch) => {
    dispatch({
      type: STORE_SEARCH_PARAMS,
      payload: searchData,
    });
};

export const getHotelDetails =
  (searchData) => async (dispatch) => {
    axios.post(`${backendServer}/v1/hotel/get-availability`,searchData)
    .then((response) => {
      dispatch({
        type: GET_HOTEL_DETAILS,
        payload: response.data,
      });
    })
    .catch((err) => {
      alert(err);
      return false;
    });
};

export const setSelectedHotel =
  (selectedHotel) => async (dispatch) => {
    dispatch({
      type: SET_SELECTED_HOTEL,
      payload: selectedHotel
    });
};

export const getHotelRoomDetails =
  (hotelId,startDate,endDate) => async (dispatch) => {
    let searchData = {
      endDate:endDate,
      startDate:startDate,
      hotelId:hotelId
    };
    axios.post(`${backendServer}/v1/room/get-available-rooms`, searchData)
    .then((response) => {
      dispatch({
        type: GET_HOTEL_ROOMS,
        payload: response.data,
      });
    })
    .catch((err) => {
      alert(err);
      return false;
    });
};

export const setSelectedAmenities =
  (amenities) => async (dispatch) => {
    dispatch({
      type: SET_SELECTED_AMENITIES,
      payload: amenities
    });
};

export const setSelectedRoom = 
(room) => async (dispatch) => {
  dispatch({
    type: SET_SELECTED_ROOM,
    payload: room
  });
};

export const addToCart = 
(newItem, currentCart,startDate,endDate, userId) => async (dispatch) => {
  let tempAmenities = [];
  for(let amenity in newItem.amenities){
    tempAmenities.push(amenity);
  }
  let tempCart = {
    endDate: endDate,
    roomId: newItem.room.id,
    serviceTypeSet: tempAmenities,
    startDate: startDate,
    userId: userId
  }
axios.post(`${backendServer}/v1/reservation/add-to-cart`,tempCart)
  .then((response) => {
    dispatch({
      type: ADD_TO_CART,
      payload: [...currentCart,newItem]
    });
  })
  .catch((err) => {
    alert(err);
    return false;
  });
};

export const confirmCart = 
(userId) => async (dispatch) => {
 
axios.post(`${backendServer}/v1/reservation/book/${userId}`)
  .then((response) => {
     dispatch({
       type: ADD_TO_CART,
       payload: []
     })
     dispatch({
      type: SET_SELECTED_ROOM,
      payload: {}
    });
    dispatch({
      type: SET_SELECTED_AMENITIES,
      payload: {}
    });
    dispatch({
      type: SET_SELECTED_HOTEL,
      payload: {}
    });
  })
  .catch((err) => {
    alert(err);
    return false;
  });
};


