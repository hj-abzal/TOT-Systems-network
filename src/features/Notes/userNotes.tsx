import React from 'react';
import { useDispatch } from 'react-redux';
import { AddItemForm } from '../../components/AddItemForm/AddItemForm';
import { UserNote } from './Note/UserNote';
import { addNote, NotesType } from './notesReducer';
import s from './UserNotes.module.css'

type UserNotesPropsType = {
    userNote: NotesType[]
    userId: number
}

export const UserNotes: React.FC<UserNotesPropsType> = ({ userNote, userId }) => {
    const dispatch = useDispatch()
    const onAddNote = (title: string) => {
        dispatch(addNote(userId, title))
    }
    return (
        <div className={s.wrapper}>
            <div className={s.title}>
                <h3>Заметки</h3>
            </div>
            <AddItemForm addItem={onAddNote} />
            {
                userNote.map(n => {
                    return <UserNote
                        key={n.id}
                        userId={userId}
                        noteId={n.id}
                        title={n.title}
                        text={n.text}
                    />
                })
            }
        </div>
    )
}