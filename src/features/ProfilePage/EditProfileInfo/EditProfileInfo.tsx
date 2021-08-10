import React from 'react'
import { useSelector } from 'react-redux'
import userPng from '../../../assets/user.png'
import s from './ProfileInfo.module.css'
import Button from '@material-ui/core/Button'
import { RegisteredUserType } from '../../authorization/Registration/registReducer'

type EditProfileInfoPropsType = {
    profileInfo: RegisteredUserType
}
export const EditProfileInfo: React.FC<EditProfileInfoPropsType> = ({ profileInfo }) => {

    return (
        <div className={s.notesBlock}>

        </div>
    )
}