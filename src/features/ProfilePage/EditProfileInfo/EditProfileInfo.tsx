import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import s from './EditProfileInfo.module.css'
import Button from '@material-ui/core/Button'
import { RegisteredUserType } from '../../authorization/Registration/registReducer'
import { AppStateType } from '../../../App/store'
import { setEditModeProfile, updateUserProfile, UsersProfileType } from '../profilePageReducer'
import { useFormik } from 'formik'
import Grid from '@material-ui/core/Grid/Grid'
import FormControl from '@material-ui/core/FormControl'
import FormGroup from '@material-ui/core/FormGroup'
import TextField from '@material-ui/core/TextField'
import userPng from '../../../assets/user.png'
import { PATH } from '../../../components/routes/Pages'
import { Redirect } from 'react-router-dom'

type EditProfileInfoPropsType = {

}
export const EditProfileInfo: React.FC<EditProfileInfoPropsType> = () => {
    const id = useSelector<AppStateType, number>(state => state.login.loggedId)
    const users = useSelector<AppStateType, UsersProfileType>(state => state.profile)
    const dispatch = useDispatch()
    const onClickHandler = () => dispatch(setEditModeProfile(false))
    const user = users[id]
    const email = user.profileInfo.email
    const editMode = useSelector<AppStateType, boolean>(state => state.profile.editMode)
    const [url, setUrl] = useState('');
    useEffect(() => {
        // @ts-ignore
        setUrl(localStorage.getItem('recent-image'));
    }, [localStorage.getItem('recent-image')])

    // ------------> formik <-----------------//
    type FormErrorType = {
        firstName?: string
        lastName?: string
        status?: string

    }
    const formik = useFormik({
        initialValues: {
            firstName: user.profileInfo.firstName,
            lastName: user.profileInfo.lastName,
            status: user.profileInfo.status
        },
        validate: (values) => {
            const errors: FormErrorType = {};
            if (!values.firstName) {
                errors.firstName = 'Обязательное поле'
            }
            if (!values.lastName) {
                errors.lastName = 'Обязательное поле'
            }
            if (values.status.length > 50) {
                errors.status = 'Не больше 50 символов'
            }
            return errors;
        },
        onSubmit: values => {
            formik.resetForm()
            let { firstName, lastName, status } = values
            let payload = {
                id,
                firstName,
                lastName,
                email,
                status,
                imgUrl: url
            }
            dispatch(updateUserProfile(payload))
            dispatch(setEditModeProfile(false))
        },
    })
    if (!editMode) {
        return <Redirect to={PATH.MAIN} />
    }
    if (user) {
        const uploader = (file: any) => {
            const reader = new FileReader();
            reader.addEventListener('load', () => {
                //@ts-ignore
                localStorage.setItem('recent-image', reader.result)
            })
            reader.readAsDataURL(file);
        }
        const userImg = user.profileInfo.imgUrl ? user.profileInfo.imgUrl : userPng
        return (
            <div className={s.wrapper}>
                <div className={s.userPhotoBlock}>
                    <img className={s.userPhoto} src={userImg} />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={e => {
                            if (!e.target.files) return
                            uploader(e.target.files[0])
                        }}
                        name="fileInput"
                    />
                </div>

                <form onSubmit={formik.handleSubmit}>
                    <FormControl>
                        <FormGroup>
                            <TextField
                                label="Имя"
                                margin="normal"
                                {...formik.getFieldProps('firstName')}
                            />
                            {
                                <div className={s.errorStyle}>
                                    {
                                        formik.touched.firstName && formik.errors.firstName
                                    }
                                </div>
                            }
                            <TextField
                                label="Фамилия"
                                margin="normal"
                                {...formik.getFieldProps('lastName')}
                            />
                            {
                                <div className={s.errorStyle}>
                                    {
                                        formik.touched.lastName && formik.errors.lastName
                                    }
                                </div>
                            }
                            <TextField
                                label="Статус"
                                margin="normal"
                                {...formik.getFieldProps('status')}
                            />
                            {
                                <div className={s.errorStyle}>
                                    {
                                        formik.touched.status && formik.errors.status
                                    }
                                </div>
                            }
                            <div className={s.buttons}>
                                <Button type={'submit'} variant={'contained'} color={'primary'}>сохранить</Button>
                            </div>

                        </FormGroup>
                    </FormControl>
                </form>
                <div className={s.buttons}>
                    <Button type={'submit'} color={'primary'} onClick={onClickHandler}>отменить</Button>
                </div>
            </div>
        )
    } else {
        return (
            <div>

            </div>
        )
    }
}