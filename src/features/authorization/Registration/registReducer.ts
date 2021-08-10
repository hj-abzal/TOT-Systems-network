import { Dispatch } from 'redux'
import {
  addUserProfile,
  ProfilePageReducerActionTypes,
} from '../../ProfilePage/profilePageReducer'

const initialState = {
  registeredUsers: [] as RegisteredUserType[],
}

export const registReducer = (
  state: InitialStateType = initialState,
  action: RegistReducerActionTypes
): InitialStateType => {
  switch (action.type) {
    case registReducerActions.ADD_REGISTERED_USER:
      return {
        ...state,
        registeredUsers: [...state.registeredUsers, action.payload],
      }
    default:
      return state
  }
}

// actions

const registReducerActions = {
  ADD_REGISTERED_USER: 'reg/ADD_REGISTERED_USER',
} as const

export const addRegisteredUser = (payload: RegisteredUserType) => {
  return {
    type: registReducerActions.ADD_REGISTERED_USER,
    payload,
  } as const
}
//
export const addUser =
  (firstName: string, lastName: string, email: string, password: string) =>
  (
    dispatch: Dispatch<RegistReducerActionTypes | ProfilePageReducerActionTypes>
  ) => {
    let id = Date.now()
    dispatch(addRegisteredUser({ id, firstName, lastName, email, password }))
    dispatch(addUserProfile({ id, firstName, lastName, email, password }))
  }
// types
type InitialStateType = typeof initialState

export type RegistReducerActionTypes = ReturnType<typeof addRegisteredUser>

export type RegisteredUserType = {
  id: number
  firstName: string
  lastName: string
  email: string
  password: string
}
