import React, { useEffect } from 'react';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { AddItemForm } from '../../../components/AddItemForm/AddItemForm';
import { MessageItem } from '../../../components/Message/MessageItem';
import { ProfileInfoType } from '../../ProfilePage/profilePageReducer';
import { workChatData } from '../data';
import s from './TalkChat.module.css'
import { MessageType } from '../WorkChat/workChatReducer';
import { sendMessageTalk } from './talkChatReducer';

type TalkChattPropsType = {
    userTalkChat: MessageType[]
    userId: number
    user: ProfileInfoType
}

export const TalkChat: React.FC<TalkChattPropsType> = ({ userTalkChat, userId, user }) => {
    const dispatch = useDispatch()
    const scroll = useRef(null)
    useEffect(() => {
        //@ts-ignore
        scroll.current.scrollIntoView({ behavior: 'smooth' })
    }, [userTalkChat]);
    const onClickHandler = (title: string) => {
        dispatch(sendMessageTalk(userId, title))
    }

    return (
        <div className={s.wrapper}>
            <div className={s.content}>
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
                {userTalkChat?.map(m => {
                    return <MessageItem
                        key={m.id}
                        message={m.text}
                        name={user.firstName + " " + user.lastName}
                        time={m.time}
                        userPhoto={user.imgUrl}
                        me={true}
                        editAble={true}
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