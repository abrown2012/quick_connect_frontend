import {ADD_CONTACT, REMOVE_CONTACT, FETCH_CONTACTS} from './actionTypes'

export function addContact(contact){
    return {
        type: ADD_CONTACT,
        payload: contact
    }
}

export function fetchContacts(contacts) {
    return {
        type: FETCH_CONTACTS, 
        payload: contacts
    }
}

export function removeContact(contactId){
    return {
        type: REMOVE_CONTACT,
        payload: contactId
    }
}