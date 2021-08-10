import { Dispatch } from 'redux'

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

export const addRegisteredUser = (
  firstName: string,
  lastName: string,
  email: string,
  password: string
) => {
  let payload = {
    id: Date.now(),
    firstName,
    lastName,
    email,
    password,
  }
  return { type: registReducerActions.ADD_REGISTERED_USER, payload } as const
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
