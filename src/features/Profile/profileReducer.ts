import { Dispatch } from 'redux'
import { RegisteredUserType } from '../authorization/Registration/registReducer'

const initialState = {}
  

export const profileReducer = (
  state: InitialStateType = initialState,
  action: ProfileReducerActionTypes
): InitialStateType => {
  switch (action.type) {
    case registReducerActions.ADD_USER_PROFILE:
      return {
        ...state,
        [action.payload.id]: {
          profileInfo: { ...action.payload },
          myPosts: [
            {
              id: 1,
              title: 'Всем привет!',
              text: 'Это мой первый пост ... //\\^._.^//\\ ',
            },
          ],
        },
      }
    default:
      return state
  }
}

// actions

const registReducerActions = {
  ADD_USER_PROFILE: 'profile/ADD_USER_PROFILE',
} as const

export const addUserProfile = (payload: RegisteredUserType) => {
  return {
    type: registReducerActions.ADD_USER_PROFILE,
    payload,
  } as const
}


// types
type InitialStateType = typeof initialState

export type ProfileReducerActionTypes = ReturnType<typeof addUserProfile>

export type UsersProfileType = {
  [key: number]: ProfileType
}
export type ProfileType = {
  profileInfo: RegisteredUserType
  myPosts: PostType[]
}
export type PostType = {
  id: string
  title: string
  text: string
}
