import { Formik, useFormik } from 'formik';
import * as yup from 'yup'
import React, { useEffect, useState } from 'react';
import Background from '../img/mobimarket-background.svg'
import { ReactComponent as EyeDisable } from '../img/eye-disable.svg'
import { ReactComponent as EyeActive } from '../img/eye-active.svg'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'
import Modal from 'react-modal';
import { ReactComponent as PhoneIcon } from '../img/phone-icon.svg'
import {ReactComponent as PersonIcon} from '../img/person-icon.svg'
import InputMask from 'react-input-mask';
Modal.setAppElement('#root');

const Login = () => {
    const navigate = useNavigate()

    const [showPassword, setShowPassword] = useState(false)
    const [phoneModalIsOpen, setPhoneModalIsOpen] = useState(false)
    const [codeModalIsOpen, setCodeModalIsOpen] = useState(false)
    const [timer, setTimer] = useState(60)

    const formik = useFormik({
        initialValues: {
           name: '',
           password: '',
           phoneNumber: '',
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
            .matches(/\d/, 'Пароль должен состоять минимум из одной цифры'),

        }),
        onSubmit: (values) => {
            console.log(values);
        }
    },
    )

    const modalFormik = useFormik({
        initialValues: {
            phoneNumber: '',
            code: '',
        },
        validationSchema: yup.object({
            phoneNumber: 
            yup.string()
            .required('Введите номер телефона')
            .min(14, 'Номер телефона должен содержать не менее 10 цифр'),

            // code:
            // yup.string()
            // .required('Введите 4-х значный код')
            // .matches(/^\d{4}$/, 'Код должен состоять из 4-х цифр')
        }),
        onSubmit: (values) => {
            console.log(values);
        }
    })
    
    const handleTogglePassword = () => {
        setShowPassword(!showPassword)
    }

    const loginToastifyMessage = () => {
        toast.error('Неверный логин или пароль', {
        position: toast.POSITION.TOP_CENTER,
        })
    }

    const openPhoneModal = () => {
        setPhoneModalIsOpen(true)
    }

    const closePhoneModal = () => {
        setPhoneModalIsOpen(false)
    }

    const openCodeModal = (e) => {
        e.preventDefault()
        setPhoneModalIsOpen(false)
        setCodeModalIsOpen(true)
    }

    const closeCodeModal = () => {
        setCodeModalIsOpen(false)
        setPhoneModalIsOpen(false)
    }

    useEffect(() => {
        let interval

        if(timer > 0){
            interval = setInterval(() => {
            setTimer(prevTimer => prevTimer - 1)
            }, 1000)
        }

        return () => clearInterval(interval)
    }, [timer])
// функция обратного получения кода 
    const handleResentCode = () => {
        setTimer(60)
    }

    const minutes = Math.floor(timer / 60)
    const seconds = timer % 60

    return (
        <div>
            <div className='login-container'>
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
                        style={(formik.touched.password && formik.errors.password ? 
                        {color: 'red', borderBottom: '1px solid red'} 
                        : 
                        null)}
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
                        
                         <p className='forgot-password'><a onClick={openPhoneModal}>Забыли пароль</a></p>

                         

                        <button
                         disabled={!formik.isValid || formik.values.name === '' || formik.values.password === ''}
                         className={formik.isValid ? 'enabled' : 'disabled'}
                         onClick={loginToastifyMessage}
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
                        <p className='register-link' ><a onClick={() => navigate('/register')}>Зарегистрироваться</a></p>
                    </form>
                            {/* PHONE MODAL */}
                    <Modal
                    isOpen={phoneModalIsOpen}
                    onRequestClose={closePhoneModal}
                    contentLabel='Модальное окно номера телефона'
                    // overlayClassName='modal-overlay'
                    className='phoneNumber-modal'
                    >
                    <h2>Введите номер телефона</h2>
                    <form action="">
                    <PhoneIcon/>
                    <h3>Введите номер телефона</h3>
                    <p>Мы отправим вам СМС c кодом </p>
                    <p>подтверждения</p>
                    <InputMask
                    value={modalFormik.values.phoneNumber}
                    onChange={modalFormik.handleChange}
                    onBlur={modalFormik.handleBlur}
                    name='phoneNumber'
                    mask='0(999) 999 999'
                    placeholder='0(000) 000 000'
                    maskChar={null}      
                    />
                    <button
                    disabled={!modalFormik.isValid || modalFormik.values.phoneNumber === ''}
                    className={modalFormik.isValid ? 'enabled' : 'disabled'}
                    onClick={openCodeModal}
                    >
                    Далее
                    </button>
                    </form>
                    </Modal>
                    {/* CODE MODAL */}
                    <Modal
                    isOpen={codeModalIsOpen}
                    onRequestClose={closeCodeModal}
                    contentLabel='Модальное окно для кода'
                    className='code-modal'
                    >
                    <h2>Сброс пароля</h2>
                    <form action="">
                    <PersonIcon/>
                    <h3>Введите код из СМС</h3>
                    <InputMask
                    value={modalFormik.values.code}
                    onChange={modalFormik.handleChange}
                    onBlur={modalFormik.handleBlur}
                    id='code'
                    name='code'
                    mask='9  9  9  9'
                    placeholder='0  0  0  0'
                    maskChar={null}
                    />
                    {timer > 0 ? 
                    (
                    <div className='timer'>  
                    <p>Повторный запрос</p>
                    <div className='timer-circle'></div>
                    {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                    </div>
                        
                    ) 
                    : 
                    (
                    <p className='send-code-again'><a onClick={handleResentCode}>Отправить код еще раз</a></p>
                    )}
                    </form>
                    </Modal>            
            </div>
        </div>
    );
};

export default Login;