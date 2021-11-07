
import { ADD_CONTACT, REMOVE_CONTACT, SET_CURRENT, FETCH_CONTACTS,ERROR, DATABASE_INSPECTING, DATABASE_SAVING } from "../actions/actionTypes";

const arrayEquals = (a, b) => {
    return Array.isArray(a) &&
          Array.isArray(b) &&
          a.length === b.length &&
          a.every((val, index) => b.includes(val));
  }

  const pick = (...selectedArgs) => obj =>  selectedArgs.reduce((acc, attr) => ({...acc, [attr]: obj[attr]}), {})



const checkContactFormat = (payload) => {
    const isObject = Object.prototype.toString.call(payload) === '[object Object]'
    const areKeysRight = arrayEquals(Object.keys(payload), ["name", "email", "phone", "id", "user_id"])
    return isObject && areKeysRight
}

const reformatCompletionTime = (contact) => {
    const newAction = pick("name", "email", "phone", "id")(contact)
    return {...newAction}
}

export const contactsReducer = (state = {contacts: [], loading: false, error: ""}, action) => {
    switch(action.type){
        case DATABASE_INSPECTING:
            return {...state, loading: action.payload}
        case DATABASE_SAVING:
            return {...state, loading: action.payload}
        case FETCH_CONTACTS:
            return {contacts: action.payload, loading: false, error: ""}
        case ERROR:
            return {...state, error: action.payload}
        case ADD_CONTACT:
            const formattedContact = reformatCompletionTime(action.payload)
            return checkContactFormat(formattedContact) ? {...state, contacts: [...state.contacts, formattedContact], loading: false, error: ""} : state
        case REMOVE_CONTACT:
            const newContacts = state.contacts.filter(contact => contact.id !== action.payload)
            return {contacts: newContacts, loading: false, error: ""}
        default:
            return state
    }
}