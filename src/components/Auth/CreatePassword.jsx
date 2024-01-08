import React, { useState } from 'react';
import "./auth.scss"
import * as yup from 'yup'
import Background from '../img/mobimarket-background.svg'
import { ReactComponent as ArrowBack } from '../img/arrow-back.svg'
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { ReactComponent as EyeDisable } from '../img/eye-disable.svg'
import { ReactComponent as EyeActive } from '../img/eye-active.svg'
import { ReactComponent as PasswordIcon } from '../img/password-icon.svg'

const CreatePassword = () => {
    const navigate = useNavigate()

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const createPasswordFormik = useFormik({
        initialValues: {
            password: '',
            confirmPassword: ''

        },
        validationSchema: yup.object({
            password: yup.string()
            .required('Введите пароль')
            .matches(/[a-zA-Z]+/, 'Пароль должен состоять только из латинских букв')
            .matches(/[A-Z]/, 'Пароль должен состоять из одной заглавной буквы')
            .min(8, 'Пароль должен состоять минимум из 8 символов')
            .matches(/\d/, 'Пароль должен состоять минимум из одной цифры'),

            confirmPassword: yup.string()
            .oneOf([yup.ref('password'), null], 'Пароли не совпадают')
            .required('Повторите новый пароль')
        }),
        onSubmit: (values) => {
            console.log(values);
        }
    })

    const handleTogglePassword = () => {
        setShowPassword(!showPassword)
    }

    const handleToggleConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword)
    }


    return (
        <div>
        <div className='register-container'>
        <img src={Background} alt="" />
                <nav>
                    <ArrowBack onClick={() => navigate('/login')} className='arrow-back'/>
                    <p>Назад</p>
                    <h3>Регистрация</h3>
                </nav>
                    <form className='createPassword-form' action="">
                    <PasswordIcon className='password-icon'/>
                    <h3>Придумайте пароль</h3>
                    <p className='first-descr'>Минимальная длина — 8 символов.</p>
                    <p className='second-descr'>Для надежности пароль должен</p>
                    <p className='third-descr'>содержать буквы и цифры</p>
                    <input
                    style={(createPasswordFormik.touched.password && createPasswordFormik.errors.password ? 
                        {color: 'red', borderBottom: '1px solid red'}
                        :
                        null)}
                        className='createdPassword-input'
                        type={showPassword ? 'text' : 'password'} 
                        placeholder='Пароль'
                        name='password'
                        values={createPasswordFormik.values.password}
                        onChange={createPasswordFormik.handleChange}
                        onBlur={createPasswordFormik.handleBlur}
                        />
                    {showPassword ?
                    <EyeActive onClick={handleTogglePassword} className='eye-active-new'/>
                    :
                    <EyeDisable onClick={handleTogglePassword} className='eye-disable-new'/>
                }

                    <input
                    style={(createPasswordFormik.touched.confirmPassword && createPasswordFormik.errors.confirmPassword ? 
                        {color: 'red', borderBottom: '1px solid red'}
                        :
                        null)}
                        className='confirmPassword-input' 
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder='Повторите пароль'
                        name='confirmPassword'
                        values={createPasswordFormik.values.confirmPassword}
                        onChange={createPasswordFormik.handleChange}
                        onBlur={createPasswordFormik.handleBlur} 
                        />
                    {showConfirmPassword ?
                    <EyeActive onClick={handleToggleConfirmPassword} className='eye-active-confirm'/>
                    :
                    <EyeDisable onClick={handleToggleConfirmPassword} className='eye-disable-confirm'/>
                }
                    { createPasswordFormik.touched.password && createPasswordFormik.errors.password ||createPasswordFormik.touched.confirmPassword && createPasswordFormik.errors.confirmPassword ?
                    <p className='error-createdPassword'>{ createPasswordFormik.errors.password || createPasswordFormik.errors.confirmPassword}</p>
                    :
                    null
                }

                    <button
                    disabled={
                        !createPasswordFormik.isValid 
                        || 
                        createPasswordFormik.values.password === '' 
                        || 
                        createPasswordFormik.values.confirmPassword === ''
                    }
                    className={createPasswordFormik.isValid ? 'enabled' : 'disabled'}>
                    Далее
                    </button>
                    </form>
                
        </div>
    </div>
    );
};

export default CreatePassword;