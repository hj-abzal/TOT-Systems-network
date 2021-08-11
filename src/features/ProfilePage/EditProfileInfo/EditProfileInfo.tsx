import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import s from './EditProfileInfo.module.css'
import Button from '@material-ui/core/Button'
import { RegisteredUserType } from '../../authorization/Registration/registReducer'
import { AppStateType } from '../../../App/store'
import { ProfileInfoType, setEditModeProfile, updateUserProfile, UsersProfileType } from '../profilePageReducer'
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
    const registeredUsers = useSelector<AppStateType, RegisteredUserType[]>(state => state.registration.registeredUsers)
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
        email?: string
        status?: string

    }
    const formik = useFormik({
        initialValues: {
            firstName: user.profileInfo.firstName,
            lastName: user.profileInfo.lastName,
            email: user.profileInfo.email,
            status: user.profileInfo.status
        },
        validate: (values) => {
            const errors: FormErrorType = {};
            let checkEmail = registeredUsers.find(u => u.email === values.email)
            if (!values.firstName) {
                errors.firstName = 'Обязательное поле'
            }
            if (!values.lastName) {
                errors.lastName = 'Обязательное поле'
            }
            if (!values.email) {
                errors.email = 'Обязательное поле';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Не действительная эл.почта'
            } else if (checkEmail !== undefined) {
                errors.email = 'Эта эл.почта уже заригестрирована'
            }
            if (values.status.length > 70) {
                errors.status = 'Не больше 70 символов'
            }
            return errors;
        },
        onSubmit: values => {
            formik.resetForm()
            let { firstName, lastName, email, status } = values
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
            <Grid container justify="center">
                <Grid item xs={12}>
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
                    <form onSubmit={formik.handleSubmit}>
                        <FormControl>
                            <FormGroup>
                                <TextField
                                    className={s.textField}
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
                                    label="Эл.почта"
                                    margin="normal"
                                    {...formik.getFieldProps('email')}
                                />
                                {
                                    <div className={s.errorStyle}>
                                        {
                                            formik.touched.email && formik.errors.email
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
                </Grid>
            </Grid>
        )
    } else {
        return (
            <div>

            </div>
        )
    }
}