const initialState = {}

export const workChatReducer = (
  state: WorkChatStateType = initialState,
  action: WorkChatReducerActionTypes
): WorkChatStateType => {
  switch (action.type) {
    case workChatReducerActions.ADD_USER_CHAT:
      return {
        ...state,
        [action.userId]: [],
      }
    case workChatReducerActions.SEND_MESSAGE:
      return {
        ...state,
        [action.userId]: [...state[action.userId], { ...action.payload }],
      }
    default:
      return state
  }
}

// actions

const workChatReducerActions = {
  ADD_USER_CHAT: 'workChat/ADD_USER_CHAT',
  SEND_MESSAGE: 'workChat/SEND_MESSAGE',
} as const

export const addUserChatWork = (userId: number) => {
  return {
    type: workChatReducerActions.ADD_USER_CHAT,
    userId,
  } as const
}

export const sendMessageWork = (userId: number, text: string) => {
  let id = Date.now()
  const time = new Date().toTimeString().slice(0, 5)
  let payload: MessageType = { id, text, time }
  return {
    type: workChatReducerActions.SEND_MESSAGE,
    userId,
    payload,
  } as const
}


// types
export type WorkChatReducerActionTypes =
  | ReturnType<typeof addUserChatWork>
  | ReturnType<typeof sendMessageWork>

export type WorkChatStateType = {
  [key: number]: MessageType[]
}
export type MessageType = {
  id: number
  text: string
  time: string
}

