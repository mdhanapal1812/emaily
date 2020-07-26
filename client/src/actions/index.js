import axios from "axios";
import { FETCH_USER, FETCH_SURVEYS } from "./types";

/**
 * This action creator , fetches the current user from server.
 * This action can be used to check if the user is currently logged in or not.
 */
export const fetchUser = () => async (dispatch) => {
  const res = await axios.get("/api/current_user");

  /**
   * As a response we get the current user (which contains the user ID and google ID).
   * This is dispatched to the store.
   * Store calls the reducers to update state , which causes the components to re-render.
   */
  dispatch({ type: FETCH_USER, payload: res.data });
};

/** This action creator is to send the token sent by stripe to server. After we send this token ,
 * Server will update the number of credits for this user . Server will send the updated user information
 * and we can dispatch that to auth reducer that maintains the current user information.
 */
export const handleToken = (token) => async (dispatch) => {
  const res = await axios.post("/api/stripe", token);
  dispatch({ type: FETCH_USER, payload: res.data });
};

/**
 * This action creator is used to submit the survey to the backend server.
 * Server will update the surveys collections in the backend and respond with the
 * updated user info and this reducer will dispatch that to authReducer to maintain the 
 * current user information.
 */
export const submitSurvey = (values, history) => async (dispatch) => {
  const res = await axios.post("/api/surveys", values);

  history.push("/surveys");
  dispatch({ type: FETCH_USER, payload: res.data });
};

/**
 * This action creator is used to fetch the surveys from the backend server.
 */
export const fetchSurveys = () => async (dispatch) => {
  const res = await axios.get("/api/surveys");
  dispatch({ type: FETCH_SURVEYS, payload: res.data });
};
