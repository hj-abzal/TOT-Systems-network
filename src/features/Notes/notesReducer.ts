import { Dispatch } from 'redux'
import { RegisteredUserType } from '../authorization/Registration/registReducer'

const initialState = {}

export const notesReducer = (
  state: UserNotesType = initialState,
  action: NotesReducerActionTypes
): UserNotesType => {
  switch (action.type) {
    case notesReducerActions.ADD_USER_NOTE:
      return {
        ...state,
        [action.userId]: [
          {
            id: 0,
            title: 'Первая заметка',
            text: 'Пример записи первой рабочей заметки.',
          },
        ],
      }
    case notesReducerActions.UPDATE_USER_NOTE:
      return {
        ...state,
        [action.userId]: state[action.userId].map(n =>
          n.id === action.noteId
            ? { ...n, title: action.title, text: action.text }
            : n
        ),
      }
    case notesReducerActions.ADD_NOTE:
      return {
        ...state,
        [action.userId]: [action.payload, ...state[action.userId]],
      }
    default:
      return state
  }
}

// actions

const notesReducerActions = {
  ADD_USER_NOTE: 'notes/ADD_USER_NOTE',
  UPDATE_USER_NOTE: 'notes/UPDATE_USER_NOTE',
  ADD_NOTE: 'notes/ADD_NOTE',
  DELETE_NOTE: 'notes/DELETE_NOTE',
} as const

export const addUserNote = (userId: number) => {
  return {
    type: notesReducerActions.ADD_USER_NOTE,
    userId,
  } as const
}

export const updateUserNote = (
  userId: number,
  noteId: number,
  title: string,
  text: string
) => {
  return {
    type: notesReducerActions.UPDATE_USER_NOTE,
    userId,
    noteId,
    title,
    text,
  } as const
}

export const addNote = (userId: number, title: string, text: string) => {
  let id = Date.now()
  let payload = { id, title, text }
  return {
    type: notesReducerActions.ADD_NOTE,
    userId,
    payload,
  } as const
}

export const deleteNote = (userId: number, noteId: number) => {
  return {
    type: notesReducerActions.ADD_NOTE,
    userId,
    noteId,
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

export type NotesReducerActionTypes =
  | ReturnType<typeof addUserNote>
  | ReturnType<typeof updateUserNote>
  | ReturnType<typeof addNote>
  | ReturnType<typeof deleteNote>

export type UserNotesType = {
  [key: number]: NotesType[]
}
export type NotesType = {
  id: number
  title: string
  text: string
}
