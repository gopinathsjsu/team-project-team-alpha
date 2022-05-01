import {
  GET_HOTEL_DETAILS,
    STORE_SEARCH_PARAMS,
} from '../action-creators/types';

const initialState = {
    searchParams: {},
    hotelDetails: []
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
      default:
        return state;
    }
  };
  
  export default reducer;