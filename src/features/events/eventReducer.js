import { CREATE_EVENT, UPDATE_EVENT, DELETE_EVENT } from "./eventConstants";
import { sampleData } from "../../app/api/sampleData";

const initialState = {
  events: sampleData,
};

const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_EVENT:
      return {
        ...state,
        events: [...state.events, action.payload],
      };
    case UPDATE_EVENT:
      return {
        ...state,
        events: [
          // Filter out the updated event from the events array
          // to get rid of the OLD VERSION of the event
          ...state.events.filter((event) => event.id !== action.payload.id),
          // then add the updated event to the array
          action.payload,
        ],
      };
    case DELETE_EVENT:
      return {
        ...state,
        events: [
          ...state.events.filter((event) => event.id !== action.payload),
        ],
      };
    default:
      return state;
  }
};

export default eventReducer;
