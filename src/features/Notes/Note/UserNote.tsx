import { IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EditableSpan } from '../../../components/EditableSpan/EditableSpan';
import { deleteNote, updateUserNote } from '../notesReducer';
import s from './UserNote.module.css'

type UserNotePropsType = {
    userId: number
    noteId: number
    title: string
    text: string
}

export const UserNote: React.FC<UserNotePropsType> = ({ userId, noteId, title, text }) => {

    const dispatch = useDispatch()
    const onUpdateNoteTitle = (udatedTitle: string) => {
        dispatch(updateUserNote(userId, noteId, udatedTitle, text))
    }
    const onUpdateNoteText = (updatedText: string) => {
        dispatch(updateUserNote(userId, noteId, title, updatedText))
    }
    const onDeleteNote = () => {
        dispatch(deleteNote(userId, noteId))
    }
    return (
        <div className={s.wrapper}>
            <div className={s.title}>
                <EditableSpan value={title} onChange={onUpdateNoteTitle} bold />

            </div>
            <div>
                <EditableSpan value={text} onChange={onUpdateNoteText} />
            </div>
            <IconButton onClick={onDeleteNote}>
                <Delete fontSize="small" />
            </IconButton>
        </div>
    )
}