
   
import {ADD_USER, FETCH_USERS, LOADING_DATA, DATABASE_SAVING, ERROR} from "./actionTypes"

export function addUser(user){
    return (dispatch) => {
        const configObj = {
            method: "POST",
            headers: {
                accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        }
        dispatch({type: DATABASE_SAVING, payload: true})
        fetch("http://localhost:3000/users", configObj)
        .then(resp => resp.json())
        .then(json => dispatch({type: ADD_USER, payload: json}))
        .catch(err => dispatch({type: ERROR, payload: err}))
    }
}

export function fetchUsers(user){
    return (dispatch, getState) => {
        dispatch({type: LOADING_DATA})
        fetch("http://localhost:3000/users")
        .then(resp => resp.json())
        .then(json => dispatch({type: FETCH_USERS, payload: json}))
        .catch(err => dispatch({type: ERROR, payload: err}))
    }
}


