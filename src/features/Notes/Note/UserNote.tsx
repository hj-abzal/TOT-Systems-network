import { IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EditableSpan } from '../../../components/EditableSpan/EditableSpan';
import { deleteNote, updateUserNote } from '../notesReducer';
import s from './UserNote.module.css'
import PaletteIcon from '@material-ui/icons/Palette';
import Tippy from '@tippyjs/react';
import { HexColorPicker } from "react-colorful";

type UserNotePropsType = {
    userId: number
    noteId: number
    title: string
    text: string
}

export const UserNote: React.FC<UserNotePropsType> = ({ userId, noteId, title, text }) => {
    const [selectedColor, setSelectedColor] = useState("#F0EBCC")
    const [visible, setVisible] = useState(false);
    const show = () => setVisible(true);
    const hide = () => setVisible(false);
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
        <div className={s.wrapper} >
            <div className={s.item} style={{ backgroundColor: selectedColor }}>
                <div className={s.title}>
                    <EditableSpan value={title} onChange={onUpdateNoteTitle} bold />
                </div>
                <div className={s.text}>
                    <EditableSpan value={text} onChange={onUpdateNoteText} />
                </div>
                <div className={s.buttons}>
                    <IconButton onClick={onDeleteNote}>
                        <Delete fontSize="small" />
                    </IconButton>
                    <Tippy visible={visible} onClickOutside={hide} interactive={true} placement={'bottom'} content={
                        <HexColorPicker color={selectedColor} onChange={setSelectedColor} />
                    }>
                        <IconButton onClick={visible ? hide : show}>
                            <PaletteIcon fontSize="small" />
                        </IconButton>
                    </Tippy>
                </div>
            </div>
        </div>
    )
}

// <BlockPicker color={selectedColor}
// onChangeComplete={color => setSelectedColor(color.hex)
//     />