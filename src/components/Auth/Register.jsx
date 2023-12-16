import React from 'react';
import Background from '../img/mobimarket-background.svg'
import "./auth.scss"
const Register = () => {
    return (
        <div>
            <div className='register-container'>
            <img src={Background} alt="" />
            <form action="">
                <input type="text" />
                <input type="text" />
                <button>add</button>
            </form>
            </div>
        </div>
    );
};

export default Register;