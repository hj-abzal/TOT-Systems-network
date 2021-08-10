import React from 'react';
import { ProfilePage } from '../../features/ProfilePage/ProfilePage';
import s from './Main.module.css'



export const Main = () => {
    return(
        <div className={s.wrapper}>
            <ProfilePage />
        </div>
    )
}