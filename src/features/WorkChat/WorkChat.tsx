import React from 'react';
import s from './WorkChat.module.css'



export const WorkChat = () => {
    return (
        <div className={s.wrapper}>
            <div>
                <div>
                    <button>Work Chat</button>
                    <button>Work Chat</button>
                </div>
            </div>
            <div>
                chat
            </div>

            <input type="text" />
            <button>send</button>
        </div>
    )
}