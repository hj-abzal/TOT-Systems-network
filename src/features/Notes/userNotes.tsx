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
            <div>
                <b className={s.title}>Заметки</b>
                <AddItemForm addItem={onAddNote} className={s.inputStyle} />
            </div>
            <div className={s.noteItems}>
                {
                    userNote.map(n => {
                        return <UserNote
                            key={n.id}
                            userId={userId}
                            noteId={n.id}
                            title={n.title}
                            text={n.text}
                            color={n.color}
                        />
                    })
                }
            </div>
        </div>
    )
}