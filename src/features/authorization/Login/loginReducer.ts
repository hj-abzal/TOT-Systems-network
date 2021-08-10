import { Dispatch } from 'redux'

const initialState = {
  isLoggedIn: false,
}

export const loginReducer = (
  state: InitialStateType = initialState,
  action: LoginReducerActionTypes
): InitialStateType => {
  switch (action.type) {
    case loginReducerActions.SET_IS_LOGGED_IN:
      return { ...state, isLoggedIn: action.value }
    default:
      return state
  }
}

// actions

const loginReducerActions = {
  SET_IS_LOGGED_IN: 'login/SET_IS_LOGGED_IN',
} as const

export const setIsLoggedIn = (value: boolean) =>
  ({ type: loginReducerActions.SET_IS_LOGGED_IN, value } as const)


// types
type InitialStateType = typeof initialState

export type LoginReducerActionTypes =
  | ReturnType<typeof setIsLoggedIn>
