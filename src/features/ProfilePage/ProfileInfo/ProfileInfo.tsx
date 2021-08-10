import React from 'react'
import { useSelector } from 'react-redux'
import userPng from '../../../assets/user.png'
import s from './ProfileInfo.module.css'
import Button from '@material-ui/core/Button'
import { RegisteredUserType } from '../../authorization/Registration/registReducer'

type ProfileInfoPropsType = {
    profileInfo: RegisteredUserType
}
export const ProfileInfo: React.FC<ProfileInfoPropsType> = ({profileInfo}) => {
        
        return (
            <div className={s.wrapper}>
                    <div className={s.user}>
                        <img className={s.userPhoto} src={userPng} alt="" />
                                <Button size="small" variant="outlined" color="primary">выйти</Button>
                                <Button size="small" variant="outlined" color="primary">редактировать</Button>
                    </div>
                    <div className={s.profileInfo} >
                        <div>
                            <b>{profileInfo.firstName + ' ' + profileInfo.lastName}</b>
                        </div>
                        <div>
                            <b>{profileInfo.email}</b>
                        </div>
                        <div>
                            <b>status: </b>
                        </div>
                    </div>
            </div>
        )
}