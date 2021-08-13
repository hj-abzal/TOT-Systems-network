import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { IconButton, TextField } from '@material-ui/core';
import { AddBox, SendRounded } from '@material-ui/icons';
import Tippy from '@tippyjs/react';

type AddItemFormPropsType = {
    addItem: (title: string) => void
    disabled?: boolean
    multiline?: boolean
    className?: string
    inputStyle?: string

}

export const AddItemForm = React.memo(function (
    {
        addItem, disabled = false, multiline, className, inputStyle
    }: AddItemFormPropsType) {

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
            setError("превышает максимальное значение 50");
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
        {
            multiline ? <div className={className}>
                
                <TextField
                    className={inputStyle}
                    variant="filled"
                    multiline
                    disabled={disabled}
                    error={!!error}
                    value={title}
                    onChange={onChangeHandler}
                    onKeyPress={onKeyPressHandler}
                    label="Текст"
                    helperText={error}
                />

                <IconButton color="primary" onClick={addItemHandler} disabled={disabled}>
                    <SendRounded fontSize={"large"} />
                </IconButton>
            </div>
                : <div className={className}>
                    <TextField
                        variant="outlined"
                        className={className}
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

        }


    </div>
})
