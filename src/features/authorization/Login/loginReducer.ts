import { GetAppStateType } from './../../../App/store'
import { Dispatch } from 'redux'
import { act } from 'react-dom/test-utils'

const initialState = {
  isLoggedIn: false,
  loggedId: 0,
  validation: '' as string | null,
}

export const loginReducer = (
  state: InitialStateType = initialState,
  action: LoginReducerActionTypes
): InitialStateType => {
  switch (action.type) {
    case loginReducerActions.SET_IS_LOGGED_IN:
      return {
        ...state,
        loggedId: action.id,
        isLoggedIn: action.value,
      }
    case loginReducerActions.SET_LOGIN_VALIDATION:
      return {
        ...state,
        validation: action.validation,
      }
    case loginReducerActions.LOG_OUT:
      return {
        ...state,
        isLoggedIn: false,
        loggedId: 0,
      }
    default:
      return state
  }
}

// actions

const loginReducerActions = {
  SET_IS_LOGGED_IN: 'login/SET_IS_LOGGED_IN',
  SET_LOGIN_VALIDATION: 'login/SET_LOGIN_VALIDATION',
  LOG_OUT: 'login/LOG_OUT',
} as const

export const setIsLoggedIn = (id: number, value: boolean) =>
  ({ type: loginReducerActions.SET_IS_LOGGED_IN, id, value } as const)

export const logOut = () => ({ type: loginReducerActions.LOG_OUT } as const)

export const setValidation = (validation: string | null) =>
  ({ type: loginReducerActions.SET_LOGIN_VALIDATION, validation } as const)
//thunks

export const LogIn =
  (email: string, password: string) =>
  (dispatch: Dispatch<LoginReducerActionTypes>, getState: GetAppStateType) => {
    const registeredUsers = getState().registration.registeredUsers
    let user = registeredUsers.find(
      u => u.email === email && u.password === password
    )
    if (user !== undefined) {
      dispatch(setIsLoggedIn(user.id, true))
    } else {
      dispatch(setValidation('Не правильный адрес почты или пароль'))
    }
  }

// types
type InitialStateType = typeof initialState

export type LoginReducerActionTypes =
  | ReturnType<typeof setIsLoggedIn>
  | ReturnType<typeof setValidation>
  | ReturnType<typeof logOut>
