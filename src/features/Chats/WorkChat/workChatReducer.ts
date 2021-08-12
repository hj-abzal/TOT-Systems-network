import { Dispatch } from 'redux'
import { RegisteredUserType } from '../../authorization/Registration/registReducer'

const initialState = {}

export const workChatReducer = (
  state: workChatStateType = initialState,
  action: workChatReducerActionTypes
): workChatStateType => {
  switch (action.type) {
    case workChatReducerActions.ADD_USER_CHAT:
      return {
        ...state,
        [action.userId]: [],
      }
    case workChatReducerActions.SEND_MESSAGE:
      return {
        ...state,
        [action.userId]: [],
      }
    default:
      return state
  }
}

// actions

const workChatReducerActions = {
  ADD_USER_CHAT: 'workChat/ADD_USER_CHAT',
  SEND_MESSAGE: 'workChat/SEND_MESSAGE',
  DELETE_MESSAGE: 'workChat/DELETE_MESSAGE',
} as const

export const addUserChat = (userId: number) => {
  return {
    type: workChatReducerActions.ADD_USER_CHAT,
    userId,
  } as const
}

export const sendMessage = (userId: number, message: string) => {
  let id = Date.now()
  const time = new Date().toTimeString().slice(0, 5);
  let payload = { id, message, time }
  return {
    type: workChatReducerActions.SEND_MESSAGE,
    userId,
    payload,
  } as const
}

export const deleteMessage = (userId: number, messageId: number) => {
  return {
    type: workChatReducerActions.DELETE_MESSAGE,
    userId,
    messageId,
  } as const
}
// types
export type workChatReducerActionTypes =
  | ReturnType<typeof addUserChat>
  | ReturnType<typeof sendMessage>
  | ReturnType<typeof deleteMessage>

export type workChatStateType = {
  [key: number]: MessageType[]
}
export type MessageType = {
  id: number
  text: string
  time: string
}
