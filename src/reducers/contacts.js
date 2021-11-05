import { ADD_CONTACT, REMOVE_CONTACT, FETCH_CONTACTS, DATABASE_SAVING, DATABASE_INSPECTING, ERROR} from "../actions/actionTypes"


const arrayEquals = (a, b) => {
    return Array.isArray(a) && 
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => b.includes(val))
}

const checkContactFormat = (payload) => {
    const isObject = Object.prototype.toString.call(payload) === '[object Object]'
    const areKeysRight = arrayEquals(Object.keys(payload), ["name", "email", "phone", "id"])
    return isObject && areKeysRight
}

export const contactsReducer = (state = [], action ) => {
    switch(action.type){
        case "FETCH_CONTACT":
            return 
        case "ADD_CONTACT":
            return [...state, action.payload]
        case "REMOVE_CONTACT":
            return [] //to be modified
        default:
            return state 
    }
}