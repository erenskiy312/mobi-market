import { Formik } from 'formik';
import React from 'react';
import Background from '../img/mobimarket-background.svg'
import "./auth.scss"
const Register = () => {
    return (
        <div>
            <div className='register-container'>
            <img src={Background} alt="" />
            <Formik
            initialValues={{
                name: '',
                password: ''
            }}
            >
            </Formik>
            </div>
        </div>
    );
};

export default Register;