
import { ADD_USER, FETCH_USERS,ERROR, DATABASE_INSPECTING, DATABASE_SAVING } from "../actions/actionTypes";

const arrayEquals = (a, b) => {
    return Array.isArray(a) &&
          Array.isArray(b) &&
          a.length === b.length &&
          a.every((val, index) => b.includes(val));
  }

  const pick = (...selectedArgs) => obj =>  selectedArgs.reduce((acc, attr) => ({...acc, [attr]: obj[attr]}), {})


const checkUserFormat = (payload) => {
    const isObject = Object.prototype.toString.call(payload) === '[object Object]'
    const areKeysRight = arrayEquals(Object.keys(payload), ["uesrname", "email", "password", "id"])
    return isObject && areKeysRight
}

const reformatCompletionTime = (user) => {
    const newAction = pick("username", "email", "password", "id")(user)
    return {...newAction}
}

export const usersReducer = (state = {users: [], loading: false, error: ""}, action) => {
    switch(action.type){
        case DATABASE_INSPECTING:
            return {...state, loading: action.payload}
        case DATABASE_SAVING:
            return {...state, loading: action.payload}
        case FETCH_USERS:
            return {users: action.payload, loading: false, error: ""}
        case ERROR:
            return {...state, error: action.payload}
        case ADD_USER:
            const formattedUser = reformatCompletionTime(action.payload)
            return checkUserFormat(formattedUser) ? {...state, users: [...state.users, formattedUser], loading: false, error: ""} : state
        default:
            return state
    }
}