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
  ADD_TO_CART,
  SET_BOOKINGS,
  LOGOUT
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
    let sdate = searchData.startDate.split("-");
    let edate = searchData.endDate.split("-");
    let formattedStartDate = sdate[2] + "-" + sdate[1] + "-" + sdate[0];
    let formattedEndDate = edate[2] + "-" + edate[1] + "-" + edate[0];
    searchData.startDate = formattedStartDate;
    searchData.endDate = formattedEndDate;
    axios.post(`${backendServer}/v1/hotel/get-availability`, searchData)
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
  (hotelId, startDate, endDate) => async (dispatch) => {
    let sdate = startDate.split("-");
    let edate = endDate.split("-");
    let formattedStartDate = sdate[2] + "-" + sdate[1] + "-" + sdate[0];
    let formattedEndDate = edate[2] + "-" + edate[1] + "-" + edate[0];
    let searchData = {
      endDate: formattedEndDate,
      startDate: formattedStartDate,
      hotelId: hotelId
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
  (newItem, currentCart, startDate, endDate, userId, points) => async (dispatch) => {
    let tempAmenities = [];
    for (let amenity in newItem.amenities) {
      tempAmenities.push(amenity);
    }
    let sdate = startDate.split("-");
    let edate = endDate.split("-");
    let formattedStartDate = sdate[2] + "-" + sdate[1] + "-" + sdate[0];
    let formattedEndDate = edate[2] + "-" + edate[1] + "-" + edate[0];
    let tempCart = {
      endDate: formattedEndDate,
      roomId: newItem.room.id,
      serviceTypeSet: tempAmenities,
      startDate: formattedStartDate,
      userId: userId,
      customLoyaltyCredit: points
    }
    axios.post(`${backendServer}/v1/reservation/add-to-cart`, tempCart)
      .then((response) => {
        dispatch({
          type: ADD_TO_CART,
          payload: [...currentCart, response.data]
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

export const viewOrders =
  (userId) => async (dispatch) => {
    axios.get(`${backendServer}/v1/reservation/user/${userId}`)
      .then((response) => {
        dispatch({
          type: SET_BOOKINGS,
          payload: response.data
        })
      })
      .catch((err) => {
        alert(err);
        return false;
      });
  };

export const logout =
  () => async (dispatch) => {
    dispatch({
      type: LOGOUT,
      payload: []
    })
  };
