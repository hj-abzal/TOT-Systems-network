import React from 'react';
import s from './WorkChat.module.css'



export const WorkChat = () => {
    return (
        <div className={s.wrapper}>
            <div className={s.content}>
                chat
            </div>
            <div className={s.footer}>
                <input type="text" />
                <button>send</button>
            </div>
        </div>
    )
}