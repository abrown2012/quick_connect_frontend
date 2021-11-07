import { contactsReducer } from "./contacts";
import { usersReducer} from "./users";
import { combineReducers } from "redux";

export const rootReducer = combineReducers({
    contacts: contactsReducer, 
    users: usersReducer,
 
})