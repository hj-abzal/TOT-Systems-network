import { Button } from '@material-ui/core';
import React from 'react'
import s from './MessageItem.module.css'
import userPng from '../../assets/user.png'

type MessagePropsType = {
    message: string
    name: string
    time: string
    userPhoto: string
    me?: boolean
}
export const MessageItem: React.FC<MessagePropsType> = ({
    message,
    name,
    time,
    userPhoto,
    me,
    ...restPprops
}) => {
    let now = new Date().toTimeString().slice(0, 5);

    return (
        <div>
            {
                me
                    ? <div className={s.myMessage}>
                        <div className={s.item}>
                            <div className={s.name} ><b>{name}</b></div>
                            <div className={s.text} >{message} </div>
                            <div className={s.time} >{time}</div>
                        </div>
                        <img className={s.avatar} src={userPhoto ? userPhoto : userPng} alt="avatar" />
                    </div>
                    : <div className={s.message}>
                        <img className={s.avatar} src={userPhoto ? userPhoto : userPng} alt="avatar" />
                        <div className={s.angle}></div>
                        <div className={s.item}>
                            <div className={s.name} ><b>{name}</b></div>
                            <div className={s.text} >{message} </div>
                            <div className={s.time} >{time}</div>
                        </div>
                    </div>
            }

        </div>
    )
}


