import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import thunkMiddlewere, { ThunkAction } from 'redux-thunk'
import thunk from 'redux-thunk'
import {
  authReducer,
  AuthReducerActionTypes,
} from '../features/authorization/auth-reducer'

let rootReducer = combineReducers({
  auth: authReducer,
})

//store type
// export let store = createStore(rootReducer, applyMiddleware(thunkMiddlewere))

export type StoreType = typeof store

type RootReducerType = typeof rootReducer

export type AppStateType = ReturnType<RootReducerType>
export type GetAppStateType = () => AppStateType

export type AppActionsType = AuthReducerActionTypes

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
  composeEnhancers(applyMiddleware(thunk))
)
