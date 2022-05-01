/* eslint-disable no-alert */
import axios from "axios";
import backendServer from "../../Config";
import {
  GET_HOTEL_DETAILS,
  STORE_SEARCH_PARAMS,

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

