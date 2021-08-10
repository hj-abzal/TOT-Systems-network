import React from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { AppStateType } from '../../../App/store';


export const Login = () => {
    const isLoggedIn = useSelector<AppStateType, boolean>(state => state.auth.isLoggedIn)
    const dispatch = useDispatch();

    type FormErrorType = {
        email?: string
        password?: string
        rememberMe?: boolean
    }
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: (values) => {
            const errors: FormErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            }

            if (!values.password) {
                errors.password = 'Required';
            } else if (values.password.length < 3) {
                errors.password = 'Must be 3 characters at least';
            }
            return errors;
        },
        onSubmit: values => {
            formik.resetForm()
            alert(values)
            // dispatch(loginTC(values))
        },
    })

    if (isLoggedIn) {
        return <Redirect to={'/'} />
    }
    return <div>
        <form onSubmit={formik.handleSubmit}>
            <p>To log in get registered
                <a href={'https://social-network.samuraijs.com/'}
                    target={'_blank'}>here
                </a>
            </p>
            <p>or use common test account credentials:</p>
            <p>Email: free@samuraijs.com</p>
            <p>Password: free</p>
            <input
                placeholder="Email"
                {...formik.getFieldProps('email')}
            />
            {formik.touched.email &&
                formik.errors.email ? <div style={{ color: 'red' }}>{formik.errors.email}</div> : null}
            <input
                type="password"
                placeholder="Password"
                {...formik.getFieldProps('password')}

            />
            {formik.touched.password &&
                formik.errors.password ? <div style={{ color: 'red' }}>{formik.errors.password}</div> : null}
            <input
                placeholder={'Remember me'}
                type="checkbox"
                {...formik.getFieldProps('remeberMe')}
            />
            <button type={'submit'}>Login</button>
        </form>
    </div>
}
