import React, { ChangeEvent, useState, KeyboardEvent } from 'react';
import { TextField } from '@material-ui/core';

type EditableSpanPropsType = {
    value: string
    onChange: (newValue: string) => void
    bold?: boolean
}

export const EditableSpan = React.memo(function (props: EditableSpanPropsType) {
    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState(props.value);
    let [error, setError] = useState<string | null>(null)

    const activateEditMode = () => {
        setEditMode(true);
        setTitle(props.value);
    }
    const activateViewMode = () => {
        addItemHandler()
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const addItemHandler = () => {
        let trimmed = title.trim()
        if (trimmed.length < 50) {
            if (trimmed !== "") {
                setEditMode(false);
                props.onChange(title);
            } else {
                setError("введите текст");
            }
        } else {
            setError("превышает максимальное значение");
        }
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null);
        }
        if (e.charCode === 13) {
            addItemHandler();
        }
    }

    return editMode
        ? <TextField
            value={title}
            onChange={changeTitle}
            autoFocus onBlur={activateViewMode}
            onKeyPress={onKeyPressHandler}
            helperText={error}
        />
        : <span onDoubleClick={activateEditMode}> {props.bold ? <b>{props.value}</b> : props.value}</span>
});
