import axios from 'axios';
import {FETCH_USER} from "./types";

/*
export const fetchUser = () => {
    return function (dispatch) {
        axios.get('/api/current_user').then
        (res => dispatch({type:FETCH_USER,payload:res}))
    };
}; */

/** ES2017 Syntax will be followed now , note the above definition for equivalent syntax */
export const fetchUser = ()=> async dispatch=>{
    const res = await axios.get('/api/current_user');
    //res is the response we get from /api/current_user which is from server , when you
    //have a look into the console you can see that the data is the only thing we need
    //which contains the google id and user id.
    dispatch({type:FETCH_USER,payload:res.data});
};

/** This action creator is to send the token sent by stripe to server. After we send this token ,
 * Server will update the number of credits for this user . Server will send the updated user information
 * and we can dispatch that to reducers.
 */
export const handleToken = (token)=>async dispatch =>{
    const res = await axios.post('/api/stripe',token);
    dispatch({type:FETCH_USER,payload:res.data});
}