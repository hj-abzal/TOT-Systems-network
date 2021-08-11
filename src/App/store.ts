import {
  registReducer,
  RegistReducerActionTypes,
} from './../features/authorization/Registration/registReducer'
import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import { ThunkAction } from 'redux-thunk'
import thunk from 'redux-thunk'

import { loadState, saveState } from '../utils/localStorage'
import { loginReducer } from '../features/authorization/Login/loginReducer'
import { profilePageReducer } from '../features/ProfilePage/profilePageReducer'
import { notesReducer } from '../features/Notes/notesReducer'

let rootReducer = combineReducers({
  login: loginReducer,
  registration: registReducer,
  profile: profilePageReducer,
  notes: notesReducer,
})

export type StoreType = typeof store

type RootReducerType = typeof rootReducer

export type AppStateType = ReturnType<RootReducerType>
export type GetAppStateType = () => AppStateType

export type AppActionsType = RegistReducerActionTypes

export type AppThunkType<ReturnType = void> = ThunkAction<
  ReturnType,
  AppStateType,
  unknown,
  AppActionsType
>
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(
  rootReducer,
  loadState(),
  composeEnhancers(applyMiddleware(thunk))
)

store.subscribe(() => {
  saveState({
    login: store.getState().login,
    registration: store.getState().registration,
    profile: store.getState().profile,
    notes: store.getState().notes,
  })
})
