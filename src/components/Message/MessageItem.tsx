import { IconButton } from '@material-ui/core';
import React, { useState } from 'react'
import s from './MessageItem.module.css'
import userPng from '../../assets/user.png'
import { Delete } from '@material-ui/icons';
import Tippy from '@tippyjs/react';
import { EditableSpan } from '../EditableSpan/EditableSpan';
import { useDispatch } from 'react-redux';
import { deleteMessageTalk, updateMessageTalk } from '../../features/Chats/TalkChat/talkChatReducer';

type MessagePropsType = {
    message: string
    name: string
    time: string
    userPhoto: string
    me?: boolean
    editAble?: boolean
    userId: number
    messageId: number
}
export const MessageItem: React.FC<MessagePropsType> = ({
    message,
    name,
    time,
    userPhoto,
    me,
    editAble,
    userId,
    messageId,
    ...restPprops
}) => {
    const dispatch = useDispatch()
    const onDeleteNote = () => {
        dispatch(deleteMessageTalk(userId, messageId))
    }
    const onChange = (text: string) => {
        dispatch(updateMessageTalk(userId, messageId, text))
    }

    return (
        <div>
            {
                me
                    ? <div className={s.myMessage}>
                        <Tippy interactive={true} placement={'left'} content={
                            editAble && <IconButton onClick={onDeleteNote}>
                                <Delete fontSize="small" />
                            </IconButton>
                        }>
                            <div className={s.item}>
                                <div className={s.name} ><b>{name}</b></div>
                                {
                                    editAble ? <EditableSpan value={message} onChange={onChange} />
                                        : <div className={s.text} >{message} </div>
                                }

                                <div className={s.time} >{time}</div>
                            </div>
                        </Tippy>
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


