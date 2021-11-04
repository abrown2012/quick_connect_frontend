const defaultState = [
    {name: "Aga", email: "aga@email.com", phone: "555-555-5555", id: 1},
    {name: "Dan", email: "dan@email.com", phone: "444-555-5555", id: 2},
    {name: "Max", email: "max@email.com", phone: "333-555-5555", id: 3}
]

export const contactsReducer = (state = defaultState, action ) => {
    switch(action.type){
        case "ADD_CONTACT":
            return [...state, action.payload]
        case "REMOVE_CONTACT":
            return [] //to be modified
        default:
            return state 
    }
}