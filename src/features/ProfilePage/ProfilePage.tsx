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
import { NotesType } from '../Notes/notesReducer'

type ProfilePagePropsType = {
    user: ProfileInfoType
    userNote: NotesType[]
    userId: number
}
export const ProfilePage: React.FC<ProfilePagePropsType> = ({user, userNote, userId}) => {
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
                <UserNotes userNote={userNote} userId={userId}/>
            </div>
        )
}