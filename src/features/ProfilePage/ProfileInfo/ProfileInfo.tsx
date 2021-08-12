import React from 'react'
import { useDispatch } from 'react-redux'
import userPng from '../../../assets/user.png'
import s from './ProfileInfo.module.css'
import Button from '@material-ui/core/Button'
import { ProfileInfoType } from '../profilePageReducer'
import { logOut } from '../../authorization/Login/loginReducer'

type ProfileInfoPropsType = {
    profileInfo: ProfileInfoType
    setEditMode: () => void
}
export const ProfileInfo: React.FC<ProfileInfoPropsType> = ({ profileInfo, setEditMode }) => {
    const userImg = profileInfo.imgUrl ? profileInfo.imgUrl : userPng
    const dispatch = useDispatch()
    const onClickHandler = () => {
        dispatch(logOut())
    }
    return (
        <div className={s.wrapper}>
            <div className={s.user}>
                <img className={s.userPhoto} src={userImg} />
                <Button
                    size="small"
                    variant="outlined"
                    color="primary"
                    onClick={onClickHandler}
                >выйти</Button>
                <Button
                    size="small"
                    variant="outlined"
                    color="primary"
                    onClick={() => setEditMode()}

                >редактировать</Button>
            </div>
            <div className={s.profileInfo} >
                <div>
                    <b className={s.userName} >{profileInfo.firstName + ' ' + profileInfo.lastName}</b>
                </div>
                <div>
                    <b>почта: </b>{profileInfo.email}
                </div>
                <div>
                    <b>status: </b> {profileInfo.status}
                </div>
            </div>
        </div>
    )
}

