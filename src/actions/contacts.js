
   
import {ADD_CONTACT, REMOVE_CONTACT, FETCH_CONTACTS, DATABASE_INSPECTING, LOADING_DATA, DATABASE_SAVING, ERROR} from "./actionTypes"

export function addContact(contact){
    return (dispatch) => {
        const configObj = {
            method: "POST",
            headers: {
                accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(contact)
        }
        dispatch({type: DATABASE_SAVING, payload: true})
        fetch("http://localhost:3000/contacts", configObj)
        .then(resp => resp.json())
        .then(json => dispatch({type: ADD_CONTACT, payload: json}))
        .catch(err => dispatch({type: ERROR, payload: err}))
    }
}

export function fetchContacts(contacts){
    return (dispatch, getState) => {
        dispatch({type: LOADING_DATA})
        fetch("http://localhost:3000/contacts")
        .then(resp => resp.json())
        .then(json => dispatch({type: FETCH_CONTACTS, payload: json}))
        .catch(err => dispatch({type: ERROR, payload: err}))
    }
}

export function removeContact(contactId){
    return (dispatch) => {
        const configObj = {
            method: "DELETE",
            headers: {
                accept: "application/json",
                "Content-Type": "application/json"
            }
        }
        dispatch({type: DATABASE_INSPECTING, payload: true})
        fetch(`http://localhost:3000/contacts/${contactId}`, configObj)
        .then(resp => resp.json())
        .then(successMessage => dispatch({type: REMOVE_CONTACT, payload: contactId}))
        .catch(err => dispatch({type: ERROR, payload: err}))
    }
}

