import { IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppStateType } from '../../App/store';
import { AddItemForm } from '../../components/AddItemForm/AddItemForm';
import { EditableSpan } from '../../components/EditableSpan/EditableSpan';
import { addNote, deleteNote, updateUserNote, UsersNotesType } from './notesReducer';
import s from './UserNotes.module.css'



export const UserNotes = () => {
    const id = useSelector<AppStateType, number>(state => state.login.loggedId)
    const usersNotes = useSelector<AppStateType, UsersNotesType>(state => state.notes)
    const dispatch = useDispatch()
    const userNote = usersNotes[id]

    const onAddNote = (title: string) => {
        dispatch(addNote(id, title))
    }



    if (userNote) {
        return (
            <div className={s.wrapper}>
                <div className={s.title}>
                    <h3>Заметки</h3>
                </div>
                <AddItemForm addItem={onAddNote} />
                {
                    userNote.map(p => {

                        const onUpdateNoteTitle = (title: string) => {
                            dispatch(updateUserNote(id, p.id, title, p.text))
                        }
                        const onUpdateNoteText = (text: string) => {
                            dispatch(updateUserNote(id, p.id, p.title, text))
                        }
                        const onDeleteNote = () => {
                            dispatch(deleteNote(id, p.id))
                        }
                        return <div key={p.id}>
                            <EditableSpan value={p.title} onChange={onUpdateNoteTitle} bold />
                            <EditableSpan value={p.text} onChange={onUpdateNoteText} />
                            <IconButton onClick={onDeleteNote}>
                                <Delete />
                            </IconButton>
                        </div>
                    })
                }
            </div>
        )
    } else {
        return <div></div>
    }
}