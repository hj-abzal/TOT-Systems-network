import { Dispatch } from 'redux'
import { RegisteredUserType } from '../authorization/Registration/registReducer'

const initialState = {}

export const notesReducer = (
  state: UsersNotesType = initialState,
  action: NotesReducerActionTypes
): UsersNotesType => {
  switch (action.type) {
    case notesReducerActions.ADD_USER_NOTE:
      return {
        ...state,
        [action.userId]: [
          {
            id: 0,
            title: 'Первая заметка',
            text: 'Нажмите дважды  на заголовок или текст для режима радектирования',
            color: '#b5c3fa',
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
        [action.userId]: [
          {
            ...action.payload,
            text: 'Нажмите дважды  на заголовок или текст для режима радaктирования',
          },
          ...state[action.userId],
        ],
      }
    case notesReducerActions.DELETE_NOTE:
      return {
        ...state,
        [action.userId]: state[action.userId].filter(
          n => n.id !== action.noteId
        ),
      }
    case notesReducerActions.CHANGE_NOTE_COLOR:
      return {
        ...state,
        [action.userId]: state[action.userId].map(n =>
          n.id === action.noteId ? { ...n, color: action.color } : n
        ),
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
  CHANGE_NOTE_COLOR: 'notes/CHANGE_NOTE_COLOR',
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

export const addNote = (userId: number, title: string) => {
  let id = Date.now()
  let payload = { id, title, color: '#b5c3fa' }
  return {
    type: notesReducerActions.ADD_NOTE,
    userId,
    payload,
  } as const
}

export const deleteNote = (userId: number, noteId: number) => {
  return {
    type: notesReducerActions.DELETE_NOTE,
    userId,
    noteId,
  } as const
}

export const changeNoteColor = (
  userId: number,
  noteId: number,
  color: string
) => {
  return {
    type: notesReducerActions.CHANGE_NOTE_COLOR,
    userId,
    noteId,
    color,
  } as const
}
// types
type InitialStateType = typeof initialState

export type NotesReducerActionTypes =
  | ReturnType<typeof addUserNote>
  | ReturnType<typeof updateUserNote>
  | ReturnType<typeof addNote>
  | ReturnType<typeof deleteNote>
  | ReturnType<typeof changeNoteColor>

export type UsersNotesType = {
  [key: number]: NotesType[]
}
export type NotesType = {
  id: number
  title: string
  text: string
  color: string
}
