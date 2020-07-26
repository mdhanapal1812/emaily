import { FETCH_USER } from "../actions/types";

/**
 * This reducer is responsible for the client to know
 * whether or not the user is currently logged in.
 */
export default function (state = null, action) {
  switch (action.type) {

    /**
     * Value null here would indicate , we are not aware if the user is logged in.
     * False indicates the user is not logged in for sure.
     * If the user is logged in , we have the user instace
     */
    case FETCH_USER:
      return action.payload || false;
    default:
      return state;
  }
}
