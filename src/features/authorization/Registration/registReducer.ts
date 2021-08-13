import { Dispatch } from 'redux'
import { addUserChatTalk } from '../../Chats/TalkChat/talkChatReducer'
import { addUserChatWork } from '../../Chats/WorkChat/workChatReducer'
import { addUserNote } from '../../Notes/notesReducer'
import {
  addUserProfile,
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
    case registReducerActions.UPDATE_REGISTERED_USER:
      return {
        ...state,
        registeredUsers: state.registeredUsers.map(u =>
          u.id === action.payload.id ? { ...u, ...action.payload } : u
        ),
      }
    default:
      return state
  }
}

// actions

const registReducerActions = {
  ADD_REGISTERED_USER: 'reg/ADD_REGISTERED_USER',
  UPDATE_REGISTERED_USER: 'reg/UPDATE_REGISTERED_USER',
} as const

export const addRegisteredUser = (payload: RegisteredUserType) => {
  return {
    type: registReducerActions.ADD_REGISTERED_USER,
    payload,
  } as const
}

export const updateRegistredUser = (
  id: number,
  firstName: string,
  lastName: string,
  email: string
) => {
  return {
    type: registReducerActions.UPDATE_REGISTERED_USER,
    payload: { id, firstName, lastName, email },
  } as const
}
//
export const addUser =
  (firstName: string, lastName: string, email: string, password: string) =>
  (dispatch: Dispatch) => {
    let id = Date.now()
    dispatch(addRegisteredUser({ id, firstName, lastName, email, password }))
    dispatch(addUserProfile({ id, firstName, lastName, email, password }))
    dispatch(addUserNote(id))
    dispatch(addUserChatTalk(id))
    dispatch(addUserChatWork(id))
  }
// types
type InitialStateType = typeof initialState

export type RegistReducerActionTypes =
  | ReturnType<typeof addRegisteredUser>
  | ReturnType<typeof updateRegistredUser>

export type RegisteredUserType = {
  id: number
  firstName: string
  lastName: string
  email: string
  password: string
}
