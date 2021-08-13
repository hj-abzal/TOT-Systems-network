import { MessageType, WorkChatStateType } from '../WorkChat/workChatReducer'

const initialState = {}

export const talkChatReducer = (
  state: WorkChatStateType = initialState,
  action: TalkChatReducerActionTypes
): WorkChatStateType => {
  switch (action.type) {
    case talkChatReducerActions.ADD_USER_CHAT:
      return {
        ...state,
        [action.userId]: [],
      }
    case talkChatReducerActions.SEND_MESSAGE:
      return {
        ...state,
        [action.userId]: [...state[action.userId], { ...action.payload }],
      }
    case talkChatReducerActions.DELETE_MESSAGE:
      return {
        ...state,
        [action.userId]: state[action.userId].filter(
          m => m.id !== action.messageId
        ),
      }
    case talkChatReducerActions.UPDATE_MESSAGE:
      return {
        ...state,
        [action.userId]: state[action.userId].map(m =>
          m.id === action.messageId ? { ...m, text: action.text } : m
        ),
      }
    default:
      return state
  }
}

// actions

const talkChatReducerActions = {
  ADD_USER_CHAT: 'talkChat/ADD_USER_CHAT',
  SEND_MESSAGE: 'talkChat/SEND_MESSAGE',
  UPDATE_MESSAGE: 'talkChat/UPDATE_MESSAGE',
  DELETE_MESSAGE: 'talkChat/DELETE_MESSAGE',
} as const

export const addUserChatTalk = (userId: number) => {
  return {
    type: talkChatReducerActions.ADD_USER_CHAT,
    userId,
  } as const
}

export const sendMessageTalk = (userId: number, text: string) => {
  let id = Date.now()
  const time = new Date().toTimeString().slice(0, 5)
  let payload: MessageType = { id, text, time }
  return {
    type: talkChatReducerActions.SEND_MESSAGE,
    userId,
    payload,
  } as const
}

export const deleteMessageTalk = (userId: number, messageId: number) => {
  return {
    type: talkChatReducerActions.DELETE_MESSAGE,
    userId,
    messageId,
  } as const
}

export const updateMessageTalk = (
  userId: number,
  messageId: number,
  text: string
) => {
  return {
    type: talkChatReducerActions.UPDATE_MESSAGE,
    userId,
    messageId,
    text,
  } as const
}
// types
export type TalkChatReducerActionTypes =
  | ReturnType<typeof addUserChatTalk>
  | ReturnType<typeof sendMessageTalk>
  | ReturnType<typeof deleteMessageTalk>
  | ReturnType<typeof updateMessageTalk>

