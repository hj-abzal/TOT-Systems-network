import React from 'react'
import { useSelector } from 'react-redux'
import { AppStateType } from '../../App/store'
import { UsersProfileType } from './profileReducer'
import userPng from '../../assets/user.png'
export const Profile = () => {
    const id = useSelector<AppStateType, number>(state => state.login.loggedId)
    const users = useSelector<AppStateType, UsersProfileType>(state => state.profile)
    const user = users[id]

    if (user) {
        return (
            <div>
                <div>
                    <img src="userPng" alt="" />
                </div>
                <div>
                    <b>{user.profileInfo.firstName + ' ' + user.profileInfo.lastName}</b>
                    <b>{user.profileInfo.email}</b>
                    <b>status: </b>
                </div>
                <div>
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