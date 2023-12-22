import { Formik, useFormik } from 'formik';
import * as yup from  'yup'
import React from 'react';
import Background from '../img/mobimarket-background.svg'
import "./auth.scss"
import { useNavigate } from 'react-router-dom';
const Register = () => {
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            name: '',
            email: ''
        },
        validationSchema: yup.object({
            name: yup.string()
            .required('Введите свое Имя'),

            email: yup.string()
            .email('Неправильная почта')
            .required('Введите свою почту')
            .matches(/@/, 'Почта должна содержать контент @')
        }),
        onSubmit: (values) => {
            console.log(values);
        }
    })
    return (
        <div>
            <div className='register-container'>
            <img src={Background} alt="" />
                    <form onSubmit={formik.handleSubmit}>
                        <input
                        style={(formik.touched.name && formik.errors.name ? 
                            {color: 'red', borderBottom: '1px solid red'} 
                            : 
                            null)} 
                            className='name-input' 
                            placeholder='Имя пользователя'
                            type='text'
                            name='name'
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            />
                        {/* <label htmlFor="name">Имя пользователя</label> */}
                         {formik.touched.name && formik.errors.name ? 
                         <p className='login-error-name'>{formik.errors.name}</p>
                          : 
                          null}

                         {/* <label htmlFor="password">Пароль</label> */}
                        
                        <input
                        style={(formik.touched.email && formik.errors.email ? 
                        {color: 'red', borderBottom: '1px solid red'} 
                        : 
                        null)}
                        placeholder='Почта' 
                        className='email-input'
                        type='text'
                        name='email'
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                         />

                        
                        {formik.touched.email && formik.errors.email ? 
                         <p className='register-error-email'>
                        {formik.errors.email}
                        </p> 
                        :
                        null}         

                        <button
                        disabled={!formik.isValid || formik.values.name === '' || formik.values.email === ''}
                        className={formik.isValid ? 'enabled' : 'disabled'}
                        onClick={() => navigate('/')}
                        style=
                        {(formik.touched.name && formik.errors.name
                        ||
                        formik.touched.email && formik.errors.email ?
                        {background: '#bababa', transition: '0.2s', cursor: 'default'}
                        :
                        null
                        )}
                        >
                        Далее
                        </button>
                    </form>                
            </div>
        </div>
    );
};

export default Register;