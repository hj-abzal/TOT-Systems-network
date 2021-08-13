import React from 'react';
import { useState } from 'react';
import { ProfileInfoType } from '../ProfilePage/profilePageReducer';
import s from './Chats.module.css'
import { TalkChat } from './TalkChat/TalkChat';
import { WorkChat } from './WorkChat/WorkChat';
import { MessageType } from './WorkChat/workChatReducer';

type ChatsPropsType = {
    userWorkChat: MessageType[]
    userId: number
    user: ProfileInfoType
    userTalkChat: MessageType[]
}

export const Chats: React.FC<ChatsPropsType> = React.memo(({ userWorkChat, userId, user, userTalkChat }) => {
    const [editMode, setEditMode] = useState(true)


    return (
        <div className={s.wrapper}>
            <div className={s.header}>
                <div className={s.chatBtn} onClick={() => setEditMode(true)}>
                    {editMode ? <b className={s.choosedBtn}>  Рабочий чат </b> : "Рабочий чат"}
                </div>
                <div className={s.chatBtn} onClick={() => setEditMode(false)}>
                    {!editMode ? <b className={s.choosedBtn}>  Общение </b> : "Общение"}
                </div>
            </div>
            {
                editMode ? <WorkChat
                    userWorkChat={userWorkChat}
                    userId={userId}
                    user={user}
                /> : <TalkChat
                    userTalkChat={userTalkChat}
                    userId={userId}
                    user={user}
                />
            }

        </div>
    )
})