import React from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { AppStateType } from '../../../App/store';


export const Registration = () => {
    const isLoggedIn = useSelector<AppStateType, boolean>(state => state.auth.isLoggedIn)
    const dispatch = useDispatch();

    type FormErrorType = {
        firstName?: string
        surname?: string
        password?: string
        passwordCheck?: string
    }
    const formik = useFormik({
        initialValues: {
            firstName: '',
            surname: '',
            password: '',
            passwordCheck: ''
        },
        validate: (values) => {
            const errors: FormErrorType = {};
            return errors;
        },
        onSubmit: values => {
            formik.resetForm()
            console.log(values);
            // dispatch(loginTC(values))
        },
    })

    if (isLoggedIn) {
        return <Redirect to={'/'} />
    }
    return <div>
        <form onSubmit={formik.handleSubmit}>

            <input
                placeholder="Имя"
                {...formik.getFieldProps('firstName')}
            />
            <input
                placeholder="Фамилия"
                {...formik.getFieldProps('surname')}
            />
            <input
                type="password"
                placeholder="пароль"
                {...formik.getFieldProps('password')}
            />
            <input
                type="password"
                placeholder="введите ещё раз пароль"
                {...formik.getFieldProps('passwordCheck')}
            />
            <button type={'submit'}>Login</button>
        </form>
    </div>
}
