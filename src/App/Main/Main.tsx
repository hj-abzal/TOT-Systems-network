import React from 'react';
import { useSelector } from 'react-redux';
import { ProfilePage } from '../../features/ProfilePage/ProfilePage';
import { UsersProfileType } from '../../features/ProfilePage/profilePageReducer';
import { AppStateType } from '../store';
import s from './Main.module.css'



export const Main = () => {
    const id = useSelector<AppStateType, number>(state => state.login.loggedId)
    const users = useSelector<AppStateType, UsersProfileType>(state => state.profile)
    const user = users[id]
    if (user) {
        return (
            <div className={s.wrapper}>
                <ProfilePage user={user}/>
            </div>
        )
    } else {
        return <div>Что то пошло не так /\\^._.^//\</div>
    }
}