import { Formik, useFormik } from 'formik';
import * as yup from 'yup'
import React, { useState } from 'react';
import Background from '../img/mobimarket-background.svg'
import { ReactComponent as EyeDisable } from  '../img/eye-disable.svg'
import { ReactComponent as EyeActive } from  '../img/eye-active.svg'
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const navigate = useNavigate()

    const [showPassword, setShowPassword] = useState(false)

    const formik = useFormik({
        initialValues: {
           name: '',
           password: ''
        },
        validationSchema: yup.object({
            name: 
            yup.string()
            .required('Введите свое Имя'),

            password: 
            yup.string()
            .required('Введите пароль')
            .matches(/[a-zA-Z]+/, 'Пароль должен состоять только из латинских букв')
            .matches(/[A-Z]/, 'Пароль должен состоять из одной заглавной буквы')
            .min(8, 'Пароль должен состоять минимум из 8 символов')
            .matches(/\d/, 'Пароль должен состоять минимум из одной цифры')
            
        }),
        onSubmit: (values) => {
            console.log(values);
        }
    },
    )
    
    const handleTogglePassword = () => {
        setShowPassword(!showPassword)
    }

    return (
        <div>
            <div className='register-container'>
            <img src={Background} alt="" />
           
                    <form onSubmit={formik.handleSubmit}>
                        
                        {/* <label htmlFor="name">Имя пользователя</label> */}
                        <input
                        style={(formik.touched.name && formik.errors.name ? 
                        {color: 'red', borderBottom: '1px solid red'} 
                        : 
                        {color: 'black', borderBottom: '1px solid #e0e0e0' })} 
                        className='name-input' 
                        placeholder='Имя пользователя'
                        type='text'
                        name='name'
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                         />
                         {formik.touched.name && formik.errors.name ? <p className='login-error-name'>{formik.errors.name}</p> : null}

                         {/* <label htmlFor="password">Пароль</label> */}
                        
                        <input
                        style={(formik.touched.password && formik.errors.password ? 
                        {color: 'red', borderBottom: '1px solid red'} 
                        : 
                        {color: 'black', borderBottom: '1px solid #e0e0e0' })}
                        placeholder='Пароль' 
                        className='password-input'
                        type={showPassword ? 'text' : 'password'}
                        name='password'
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                         />
                        
                        { showPassword ? 
                         <EyeActive onClick={handleTogglePassword} className='eye-active'/>
                         :
                         <EyeDisable onClick={handleTogglePassword} className='eye-disable'/>
                        }
                        
                        {formik.touched.password && formik.errors.password ? 
                         <p className='login-error-password'>
                        {formik.errors.password}
                        </p> 
                        :
                        null}
                        
                         <p className='forgot-password'><a href="#">Забыли пароль</a></p>

                         

                        <button
                        disabled={!formik.isValid || formik.values.name === '' || formik.values.password === ''}
                        className={formik.isValid ? 'enabled' : 'disabled'}
                        onClick={() => navigate('/')}
                        style=
                        {(formik.touched.name && formik.errors.name
                        ||
                        formik.touched.password && formik.errors.password ?
                        {background: '#bababa', transition: '0.2s', cursor: 'default'}
                        :
                        null
                        )}
                        >
                        Войти
                        </button>
                        <p className='register-link' onClick={ navigate('/register')}><a href="">Зарегистрироваться</a></p>
                    </form>                
            </div>
        </div>
    );
};

export default Login;