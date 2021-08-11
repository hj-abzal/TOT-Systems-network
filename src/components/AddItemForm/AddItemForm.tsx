import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { Box, Button, FormControl, IconButton, TextField } from '@material-ui/core';
import { AddBox } from '@material-ui/icons';

type AddItemFormPropsType = {
    addItem: (title: string) => void
    disabled?: boolean

}

export const AddItemForm = React.memo(function ({ addItem, disabled = false }: AddItemFormPropsType) {

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addItemHandler = () => {
        let trimmed = title.trim()
        if (trimmed.length < 50) {
            if (trimmed !== "") {
                addItem(title);
                setTitle("");
            } else {
                setError("введите текст");
            }
        } else {
            setError("превышает максимальное значение");
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null);
        }
        if (e.charCode === 13) {
            addItemHandler();
        }
    }

    return <div>
        <TextField variant="outlined"
            style={{backgroundColor: "white"}}
            disabled={disabled}
            error={!!error}
            value={title}
            onChange={onChangeHandler}
            onKeyPress={onKeyPressHandler}
            label="Текст"
            helperText={error}
        />
        <IconButton color="primary" onClick={addItemHandler} disabled={disabled}>
            <AddBox />
        </IconButton>
    </div>
})
