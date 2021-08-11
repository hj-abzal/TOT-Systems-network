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
            imgUrl: "",
            status: "Всем пивет! Я пользуюсь Planktonics messanger.",
            ...action.payload
           },
          myPosts: [
            {
              id: 1,
              title: 'Всем привет!',
              text: 'Это мой первый пост ... //\\^._.^//\\ ',
            },
          ],
        },
      }
    case profilePageReducerActions.SER_EDIT_MODE:
      return {
        ...state,
        editMode: action.edit,
      }
    default:
      return state
  }
}

// actions

const profilePageReducerActions = {
  ADD_USER_PROFILE: 'profile/ADD_USER_PROFILE',
  SER_EDIT_MODE: 'profile/SER_EDIT_MODE',
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

// types
type InitialStateType = typeof initialState

export type ProfilePageReducerActionTypes =
  | ReturnType<typeof addUserProfile>
  | ReturnType<typeof setEditModeProfile>

export type UsersProfileType = {
  [key: number]: ProfileType
}
export type ProfileType = {
  profileInfo: ProfileInfoType
  myPosts: MyNotesType[]
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
