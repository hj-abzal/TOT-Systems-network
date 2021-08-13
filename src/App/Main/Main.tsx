import React from 'react';
import { useSelector } from 'react-redux';
import { UsersNotesType } from '../../features/Notes/notesReducer';
import { ProfilePage } from '../../features/ProfilePage/ProfilePage';
import { UsersProfileType } from '../../features/ProfilePage/profilePageReducer';
import { Chats } from '../../features/Chats/Chats';
import { AppStateType } from '../store';
import s from './Main.module.css'
import { WorkChatStateType } from '../../features/Chats/WorkChat/workChatReducer';



export const Main = () => {
    const userId = useSelector<AppStateType, number>(state => state.login.loggedId)
    const users = useSelector<AppStateType, UsersProfileType>(state => state.profile)
    const usersNotes = useSelector<AppStateType, UsersNotesType>(state => state.notes)
    const userWorkChats = useSelector<AppStateType, WorkChatStateType>(state => state.workChat)
    const userTalkChats = useSelector<AppStateType, WorkChatStateType>(state => state.talkChat)
    const user = users[userId].profileInfo
    const userNote = usersNotes[userId]
    const userWorkChat = userWorkChats[userId]
    const userTalkChat = userTalkChats[userId]
    if (user) {
        return (
            <div className={s.wrapper}>
                <div className={s.container}>
                    <div className={s.profile}>
                        <ProfilePage user={user} userNote={userNote} userId={userId} />
                    </div>
                    <div className={s.chats}>
                        <Chats userWorkChat={userWorkChat} userId={userId} user={user} userTalkChat={userTalkChat}/>
                    </div>
                </div>
            </div>
        )
    } else {
        return <div>Что то  не так /\\^._.^//\</div>
    }
}