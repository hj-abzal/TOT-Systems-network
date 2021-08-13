import IconButton from '@material-ui/core/IconButton';
import { SendRounded } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { AddItemForm } from '../../../components/AddItemForm/AddItemForm';
import { MessageItem } from '../../../components/Message/MessageItem';
import { ProfileInfoType } from '../../ProfilePage/profilePageReducer';
import { workChatData } from '../data';
import s from './WorkChat.module.css'
import { MessageType, sendMessageWork } from './workChatReducer';

type WorkChatPropsType = {
    userWorkChat: MessageType[]
    userId: number
    user: ProfileInfoType
}

export const WorkChat: React.FC<WorkChatPropsType> = ({ userWorkChat, userId, user }) => {
    const dispatch = useDispatch()
    const scroll = useRef(null)
    useEffect(() => {
        //@ts-ignore
        scroll.current.scrollIntoView({ behavior: 'smooth' })
    }, [userWorkChat]);
    const onClickHandler = (title: string) => {
        dispatch(sendMessageWork(userId, title))
    }

    return (
        <div className={s.wrapper}>
            <div className={s.content}>
                chat
                {workChatData.map(m => {
                    return <MessageItem
                        key={m.id}
                        message={m.text}
                        name={m.name}
                        time={m.time}
                        userPhoto={m.url}
                        userId={userId}
                        messageId={m.id}
                    />

                })}
                {userWorkChat?.map(m => {
                    return <MessageItem
                        key={m.id}
                        message={m.text}
                        name={user.firstName + " " + user.lastName}
                        time={m.time}
                        userPhoto={user.imgUrl}
                        me={true}
                        userId={userId}
                        messageId={m.id}
                    />

                })}

                <div ref={scroll}></div>
            </div>
            <div className={s.footer}>

                <AddItemForm
                    addItem={onClickHandler}
                    multiline={true}
                    className={s.divWrapper}
                    inputStyle={s.messageInput}
                />
            </div>
        </div>
    )
}