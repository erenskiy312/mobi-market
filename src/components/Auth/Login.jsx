import { Formik } from 'formik';
import * as yup from 'yup'
import React from 'react';
import Background from '../img/mobimarket-background.svg'

const Login = () => {
    const validationSchema = yup.object().shape({
        name: yup.number().typeError('Проверьте заного веденные данные').required('Обязательное поле'),
    })
    return (
        <div>
            <div className='register-container'>
            <img src={Background} alt="" />
            <Formik
            initialValues={{
                name: '',
                password: ''
            }}
            validateOnBlur
            onSubmit={(values) => (console.log(values))}
            validationSchema={validationSchema}
            >
                {({values, errors, touched, handleChange, handleSubmit, handleBlur, dirty, isValid, }) => (
                    <form action="">
                        
                        {/* <label htmlFor="name">Имя пользователя</label> */}
                        <input 
                        className='name-input' 
                        placeholder='Имя пользователя'
                        type="text"
                        name='name'
                        values={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                         />
                         {/* {touched.name && errors.name && <p>{errors.name}</p>} */}

                         {/* <label htmlFor="password">Пароль</label> */}
                        <input
                        placeholder='Пароль' 
                        className='password-input'
                        type="password"
                        name='password'
                        values={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                         />
                         <p className='forgot-password'><a href="#">Забыли пароль</a></p>
                         {/* {touched.password && errors.password && <p>{errors.password}</p>} */}
                        <button
                        disabled={!isValid && !touched}
                        onClick={handleSubmit}
                        type='submit'
                        >
                        Войти
                        </button>
                        <p className='register-link'><a href="#">Зарегистрироваться</a></p>
                    </form>
                )}
            </Formik>
                
            </div>
        </div>
    );
};

export default Login;