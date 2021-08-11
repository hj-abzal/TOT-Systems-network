import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppStateType } from '../../App/store'
import { setEditModeProfile, UsersProfileType } from './profilePageReducer'
import s from './ProfilePage.module.css'
import { ProfileInfo } from './ProfileInfo/ProfileInfo'
import { EditProfileInfo } from './EditProfileInfo/EditProfileInfo'
import { Redirect } from 'react-router-dom'
import { PATH } from '../../components/routes/Pages'


export const ProfilePage = () => {
    const id = useSelector<AppStateType, number>(state => state.login.loggedId)
    const users = useSelector<AppStateType, UsersProfileType>(state => state.profile)
    const editMode = useSelector<AppStateType, boolean>(state => state.profile.editMode)
    const dispatch = useDispatch()
    const onClickHandler = () => dispatch(setEditModeProfile(true))
    const user = users[id]
    if (editMode) {
        return <Redirect to={PATH.EDIT_PROFILE} />
    }
    if (user) {
        return (
            <div className={s.wrapper}>
                {
                    !editMode && <ProfileInfo profileInfo={user.profileInfo} setEditMode={onClickHandler} />
                }
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