import { fetchSampleData } from "../../app/api/mockApi";
import {
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from "../../app/store/asyncReducer";
import {
  CREATE_EVENT,
  UPDATE_EVENT,
  DELETE_EVENT,
  FETCH_EVENTS,
} from "./eventConstants";

export const createEvent = (event) => ({
  type: CREATE_EVENT,
  payload: event,
});

export const updateEvent = (event) => ({
  type: UPDATE_EVENT,
  payload: event,
});

export const deleteEvent = (id) => ({
  type: DELETE_EVENT,
  payload: id,
});

export const loadEvents = () => async (dispatch) => {
  dispatch(asyncActionStart());
  try {
    const events = await fetchSampleData();
    dispatch({ type: FETCH_EVENTS, payload: events });
    dispatch(asyncActionFinish());
  } catch (error) {
    dispatch(asyncActionError(error));
  }
};
