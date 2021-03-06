import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { AppStateType } from '../../../App/store';
import { addUser, RegisteredUserType } from './registReducer';
import FormControl from '@material-ui/core/FormControl/FormControl';
import FormGroup from '@material-ui/core/FormGroup/FormGroup';
import Button from '@material-ui/core/Button/Button';
import TextField from '@material-ui/core/TextField/TextField';
import s from './Registration.module.css'
import { PATH } from '../../../components/routes/Pages';

export const Registration = () => {
    const registeredUsers = useSelector<AppStateType, RegisteredUserType[]>(state => state.registration.registeredUsers)
    const [editMode, setEditMode] = useState(false)
    const dispatch = useDispatch();

    type FormErrorType = {
        firstName?: string
        lastName?: string
        email?: string
        password?: string
        passwordCheck?: string
    }
    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            passwordCheck: ''
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
            if (!values.password) {
                errors.password = 'Обязательное поле';
            } else if (values.password.length < 7) {
                errors.password = 'Пароль должен состоять минимум из 7 символов';
            }
            if (values.password !== values.passwordCheck) {
                errors.passwordCheck = 'Пароли не совпадают';
            }
            return errors;
        },
        onSubmit: values => {
            let { firstName, lastName, email, password, } = values;
            formik.resetForm()
            console.log(values);
            dispatch(addUser(firstName, lastName, email, password))
            setEditMode(true)

        },
    })

    if (editMode) {
        return <Redirect to={'/'} />
    }
    return <div >
        <form onSubmit={formik.handleSubmit}>
            <FormControl >
                <Button className={s.linkButton} variant={'contained'} >
                    <NavLink to={PATH.LOGIN}>login</NavLink>
                </Button>
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
                        type="password"
                        label="пароль"
                        margin="normal"
                        {...formik.getFieldProps('password')}

                    />
                    {
                        <div className={s.errorStyle}>
                            {
                                formik.touched.password && formik.errors.password
                            }
                        </div>
                    }
                    <TextField
                        type="password"
                        label="введите ещё раз пароль"
                        margin="normal"
                        {...formik.getFieldProps('passwordCheck')}

                    />
                    {
                        <div className={s.errorStyle}>
                            {
                                formik.touched.passwordCheck && formik.errors.passwordCheck
                            }
                        </div>
                    }
                    <Button type={'submit'} variant={'contained'} color={'primary'}>зарегистрироваться</Button>
                </FormGroup>
            </FormControl>
        </form>
    </div>
}



// <div>
//         <form onSubmit={formik.handleSubmit}>

//             <input
//                 placeholder="Имя"
//                 {...formik.getFieldProps('firstName')}
//             />
//             {formik.touched.firstName &&
//                 formik.errors.firstName ? <div style={{ color: 'red' }}>{formik.errors.firstName}</div> : null}
//             <input
//                 placeholder="Фамилия"
//                 {...formik.getFieldProps('lastName')}
//             />
//             {formik.touched.lastName &&
//                 formik.errors.lastName ? <div style={{ color: 'red' }}>{formik.errors.lastName}</div> : null}

//             <input
//                 placeholder="Эл.почта"
//                 {...formik.getFieldProps('email')}
//             />
//             {formik.touched.email &&
//                 formik.errors.email ? <div style={{ color: 'red' }}>{formik.errors.email}</div> : null}
//             <input
//                 type="password"
//                 placeholder="пароль"
//                 {...formik.getFieldProps('password')}
//             />
//             {formik.touched.password &&
//                 formik.errors.password ? <div style={{ color: 'red' }}>{formik.errors.password}</div> : null}
//             <input
//                 type="password"
//                 placeholder="введите ещё раз пароль"
//                 {...formik.getFieldProps('passwordCheck')}
//             />
//             {formik.touched.passwordCheck &&
//                 formik.errors.passwordCheck ? <div style={{ color: 'red' }}>{formik.errors.passwordCheck}</div> : null}
//             <button type={'submit'}>Заригестрироваться</button>
//         </form>
//     </div>