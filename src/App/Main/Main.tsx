import React from 'react';
import { useSelector } from 'react-redux';
import { UsersNotesType } from '../../features/Notes/notesReducer';
import { ProfilePage } from '../../features/ProfilePage/ProfilePage';
import { UsersProfileType } from '../../features/ProfilePage/profilePageReducer';
import { WorkChat } from '../../features/WorkChat/WorkChat';
import { AppStateType } from '../store';
import s from './Main.module.css'



export const Main = () => {
    const userId = useSelector<AppStateType, number>(state => state.login.loggedId)
    const users = useSelector<AppStateType, UsersProfileType>(state => state.profile)
    const usersNotes = useSelector<AppStateType, UsersNotesType>(state => state.notes)
    const user = users[userId].profileInfo
    const userNote = usersNotes[userId]
    if (user) {
        return (
            <div className={s.wrapper}>
                <div className={s.profile}>
                    <ProfilePage user={user} userNote={userNote} userId={userId} />
                </div>
                <div className={s.chats}>
                    <WorkChat />
                </div>
            </div>
        )
    } else {
        return <div>Что то  не так /\\^._.^//\</div>
    }
}