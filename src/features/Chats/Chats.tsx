import React from 'react';
import { useState } from 'react';
import s from './Chats.module.css'
import { WorkChat } from './WorkChat/WorkChat';



export const Chats = () => {
    const [editMode, setEditMode] = useState(true)


    return (
        <div className={s.wrapper}>
            <div className={s.header}>
                <div className={s.chatBtn} onClick={() => setEditMode(true)}>
                    {editMode ? <b className={s.choosedBtn}>  Work Chat 1</b> : " Work Chat 1"}
                </div>
                <div className={s.chatBtn} onClick={() => setEditMode(false)}>
                    {!editMode ? <b className={s.choosedBtn}>  Work Chat 2</b> : " Work Chat 2"}
                </div>
            </div>
            {
                editMode ? <WorkChat /> : <WorkChat />
            }

        </div>
    )
}