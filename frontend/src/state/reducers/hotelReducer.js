import {
  GET_HOTEL_DETAILS,
    GET_HOTEL_ROOMS,
    SET_SELECTED_HOTEL,
    STORE_SEARCH_PARAMS,
    SET_SELECTED_ROOM,
    SET_SELECTED_AMENITIES,
    SET_SELECTED_CART,
    ADD_TO_CART,
    CONFIRM_CART,
    SET_BOOKINGS,
    LOGOUT,
    REMOVE_FROM_CART
} from '../action-creators/types';

const initialState = {
    searchParams: {},
    hotelDetails: [],
    selectedHotel: {},
    hotelRooms: [],
    selectedAmenities:{},
    selectedRoom:{},
    cart:[],
    bookings:[]
  };

  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case STORE_SEARCH_PARAMS:
        return {
          ...state,
          searchParams: action.payload
        }
      case GET_HOTEL_DETAILS:
        return {
          ...state,
          hotelDetails: action.payload
        }
      case SET_SELECTED_HOTEL:
        return {
          ...state,
          selectedHotel: action.payload
        }
      case GET_HOTEL_ROOMS:
        return {
          ...state,
          hotelRooms: action.payload
        }
      case SET_SELECTED_AMENITIES:
        return {
          ...state,
          selectedAmenities: action.payload
        }
      case SET_SELECTED_ROOM:
        return {
          ...state,
          selectedRoom: action.payload
        }
      case ADD_TO_CART:
        return {
          ...state,
          cart: action.payload
        }
      case SET_BOOKINGS:
        return {
          ...state,
          bookings: action.payload
        }
      case REMOVE_FROM_CART:
        return {
          ...state,
          cart: action.payload
        }
      case LOGOUT:
        return initialState;
      default:
        return state;
    }
  };
  
  export default reducer;