import {FETCH_USER} from "../actions/types";

export default (state = null ,action) =>{
    console.log(action);
    switch(action.type){
        case FETCH_USER :{
            //JS syntax if action.payload is empty string we return false.
            return  action.payload || false;
        }
        break;
        default:
            return state;
    }
}