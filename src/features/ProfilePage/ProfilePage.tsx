import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppStateType } from '../../App/store'
import { ProfileInfoType, setEditModeProfile, UsersProfileType } from './profilePageReducer'
import s from './ProfilePage.module.css'
import { ProfileInfo } from './ProfileInfo/ProfileInfo'
import { EditProfileInfo } from './EditProfileInfo/EditProfileInfo'
import { Redirect } from 'react-router-dom'
import { PATH } from '../../components/routes/Pages'
import { UserNotes } from '../Notes/userNotes'

type ProfilePagePropsType = {
    user: UsersProfileType
}
export const ProfilePage: React.FC<ProfilePagePropsType> = ({user}) => {
    const editMode = useSelector<AppStateType, boolean>(state => state.profile.editMode)
    const dispatch = useDispatch()
    const onClickHandler = () => dispatch(setEditModeProfile(true))
    if (editMode) {
        return <Redirect to={PATH.EDIT_PROFILE} />
    }
        return (
            <div className={s.wrapper}>
                {
                    !editMode && <ProfileInfo profileInfo={user} setEditMode={onClickHandler} />
                }
                <UserNotes />
            </div>
        )
}