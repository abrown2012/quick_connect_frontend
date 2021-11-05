

export const contactsReducer = (state = [], action ) => {
    switch(action.type){
        case "ADD_CONTACT":
            return [...state, action.payload]
        case "REMOVE_CONTACT":
            return [] //to be modified
        default:
            return state 
    }
}