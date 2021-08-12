import { Dispatch } from 'redux'
import { RegisteredUserType } from '../authorization/Registration/registReducer'

const initialState = {}

export const workChatReducer = (
  state: workChatStateType = initialState,
  action: workChatReducerActionTypes
): workChatStateType => {
  switch (action.type) {
    default:
      return state
  }
}

// actions

const workChatReducerActions = {
  ADD_USER_NOTE: 'notes/ADD_USER_NOTE',
  UPDATE_USER_NOTE: 'notes/UPDATE_USER_NOTE',
  ADD_NOTE: 'notes/ADD_NOTE',
  DELETE_NOTE: 'notes/DELETE_NOTE',
} as const

export const addUserNote = (userId: number) => {
  return {
    type: workChatReducerActions.ADD_USER_NOTE,
    userId,
  } as const
}



//thunks

// export const updateUserProfile =
//   (payload: ProfileInfoType) =>
//   (
//     dispatch: Dispatch<ProfilePageReducerActionTypes | RegistReducerActionTypes>
//   ) => {
//     let { id, firstName, lastName, email } = payload
//     dispatch(updateProfile(payload))
//     dispatch(updateRegistredUser(id, firstName, lastName, email))
//   }
// types
type InitialStateType = typeof initialState

export type workChatReducerActionTypes =  ReturnType<typeof addUserNote>
  

export type workChatStateType = {
  [key: number]: NotesType[]
}
export type NotesType = {
  id: number
  title: string
  text: string
}
