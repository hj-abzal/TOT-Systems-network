import React from 'react';
import { useState } from 'react';
import { ProfileInfoType } from '../ProfilePage/profilePageReducer';
import s from './Chats.module.css'
import { WorkChat } from './WorkChat/WorkChat';
import { MessageType } from './WorkChat/workChatReducer';

type ChatsPropsType = {
    userWorkChat: MessageType[]
    userId: number
    user: ProfileInfoType
}

export const Chats: React.FC<ChatsPropsType> = ({ userWorkChat, userId, user }) => {
    const [editMode, setEditMode] = useState(true)


    return (
        <div className={s.wrapper}>
            <div className={s.header}>
                <div className={s.chatBtn} onClick={() => setEditMode(true)}>
                    {editMode ? <b className={s.choosedBtn}>  Work Chat 1</b> : " Work Chat 1"}
                </div>
                <div className={s.chatBtn} onClick={() => setEditMode(false)}>
                    {!editMode ? <b className={s.choosedBtn}>  Work Chat 2</b> : " Work Chat 2"}
                </div>
            </div>
            {
                editMode ? <WorkChat
                    userWorkChat={userWorkChat}
                    userId={userId}
                    user={user}
                /> : <WorkChat
                    userWorkChat={userWorkChat}
                    userId={userId}
                    user={user}
                />
            }

        </div>
    )
}