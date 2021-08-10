import React from 'react'
import { useSelector } from 'react-redux'
import { AppStateType } from '../../App/store'
import { UsersProfileType } from './profileReducer'

export const Profile = () => {
    const id = useSelector<AppStateType, number >(state => state.login.loggedId)
    const users = useSelector<AppStateType, UsersProfileType >(state => state.profile)
    const user = users[id]

    
    return (
        <div>
            
        </div>
    )
}