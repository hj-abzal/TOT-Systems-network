import React from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { AppStateType } from '../../../App/store';
import { LogIn } from './loginReducer';
import { PATH } from '../../../components/routes/Pages';


export const Login = () => {
    const isLoggedIn = useSelector<AppStateType, boolean>(state => state.login.isLoggedIn)
    const loginValidation = useSelector<AppStateType, string>(state => state.login.validation)
    const dispatch = useDispatch();

    type FormErrorType = {
        email?: string
        password?: string
    }
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
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
            let { email, password } = values;
            formik.resetForm()
            dispatch(LogIn(email, password))
        },
    })

    if (isLoggedIn) {
        return <Redirect to={PATH.PROFILE} />
    }
    return <div>
        <form onSubmit={formik.handleSubmit}>
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

            <button type={'submit'}>Login</button>
            {
                loginValidation && <div style={{ color: 'red' }}>
                    {loginValidation}
                </div>
            }
        </form>
    </div>
}
