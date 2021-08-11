import {
  RegistReducerActionTypes,
  updateRegistredUser,
} from './../authorization/Registration/registReducer'
import { Dispatch } from 'redux'
import { RegisteredUserType } from '../authorization/Registration/registReducer'

const initialState = {
  editMode: false,
}

export const profilePageReducer = (
  state: InitialStateType = initialState,
  action: ProfilePageReducerActionTypes
): InitialStateType => {
  switch (action.type) {
    case profilePageReducerActions.ADD_USER_PROFILE:
      return {
        ...state,
        [action.payload.id]: {
          profileInfo: {
            imgUrl: '',
            status: 'Всем пивет! Я пользуюсь Planktonics messanger.',
            ...action.payload,
          },
        },
      }
    case profilePageReducerActions.SER_EDIT_MODE:
      return {
        ...state,
        editMode: action.edit,
      }
    case profilePageReducerActions.UPDATE_PROFILE:
      return {
        ...state,
        [action.payload.id]: {
          profileInfo: { ...action.payload },
        },
      }
    default:
      return state
  }
}

// actions

const profilePageReducerActions = {
  ADD_USER_PROFILE: 'profile/ADD_USER_PROFILE',
  SER_EDIT_MODE: 'profile/SER_EDIT_MODE',
  UPDATE_PROFILE: '/profile/UPDATE_PROFILE',
} as const

export const addUserProfile = (payload: RegisteredUserType) => {
  return {
    type: profilePageReducerActions.ADD_USER_PROFILE,
    payload,
  } as const
}
export const setEditModeProfile = (edit: boolean) => {
  return {
    type: profilePageReducerActions.SER_EDIT_MODE,
    edit,
  } as const
}
export const updateProfile = (payload: ProfileInfoType) => {
  return {
    type: profilePageReducerActions.UPDATE_PROFILE,
    payload,
  } as const
}
//thunks

export const updateUserProfile =
  (payload: ProfileInfoType) =>
  (
    dispatch: Dispatch<ProfilePageReducerActionTypes | RegistReducerActionTypes>
  ) => {
    let { id, firstName, lastName, email } = payload
    dispatch(updateProfile(payload))
    dispatch(updateRegistredUser(id, firstName, lastName, email))
  }
// types
type InitialStateType = typeof initialState

export type ProfilePageReducerActionTypes =
  | ReturnType<typeof addUserProfile>
  | ReturnType<typeof setEditModeProfile>
  | ReturnType<typeof updateProfile>

export type UsersProfileType = {
  [key: number]: ProfileType
}
export type ProfileType = {
  profileInfo: ProfileInfoType
}

export type ProfileInfoType = {
  id: number
  firstName: string
  lastName: string
  email: string
  status: string
  imgUrl: string
}
export type MyNotesType = {
  id: string
  title: string
  text: string
}
