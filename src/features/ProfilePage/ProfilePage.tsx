import React from 'react'
import { useSelector } from 'react-redux'
import { AppStateType } from '../../App/store'
import { UsersProfileType } from './profilePageReducer'
import s from './ProfilePage.module.css'
import { ProfileInfo } from './ProfileInfo/ProfileInfo'


export const ProfilePage = () => {
    const id = useSelector<AppStateType, number>(state => state.login.loggedId)
    const users = useSelector<AppStateType, UsersProfileType>(state => state.profile)
    const user = users[id]

    if (user) {
        return (
            <div className={s.wrapper}>
                <ProfileInfo profileInfo={user.profileInfo}/>
                
                <div className={s.notesBlock}>
                    {
                        user.myPosts.map(p => {
                            return <div key={p.id}>
                                <b>{p.title}</b>
                                <p>{p.text}</p>
                            </div>
                        })
                    }
                </div>
            </div>
        )
    } else {
        return <div></div>
    }
}