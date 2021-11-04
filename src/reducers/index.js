import { contactsReducer } from "./contacts";
import { combineReducers } from "redux";

export const rootReducer = combineReducers({
    contacts: contactsReducer, 
})