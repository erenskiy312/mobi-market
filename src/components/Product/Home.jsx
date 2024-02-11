import React, { useState } from 'react';
import './products.scss'
import { ReactComponent as MobiMarketLogo } from '../img/mobiMarket-logo.svg'
import { ReactComponent as ProfileIcon } from '../img/profile-icon.svg'
import { ReactComponent as AddPhotoIcon } from '../img/addPhoto-icon.svg'
import { ReactComponent as RemoveIcon } from '../img/remove-icon.svg'
import Modal from 'react-modal';
Modal.setAppElement('#root');

const Home = () => {
    const [addProductModalIsOpen, setAddProductModalIsOpen] = useState(false)

    const openAddProductModal = () => {
        setAddProductModalIsOpen(true)
    }
    
    const closeAddProductModal = () => {
        setAddProductModalIsOpen(false)
    }

    return (
        <div>
            <nav>
                <MobiMarketLogo className='mobiMarket-logo'/>
                <button onClick={openAddProductModal}>Подать объявление</button>
                <div>
                <h3>Алеся</h3>
                <p>sergeykrash01</p>
                </div>
                <ProfileIcon className='profile-icon'/>
            </nav>

            <Modal
        isOpen={addProductModalIsOpen}
        onRequestClose={closeAddProductModal}
        contentLabel='Модальное окно для добавления товара'
        className='addProduct-modal'
        >
            <RemoveIcon className='remove-icon' onClick={closeAddProductModal}/>
            <form action="submit">
                <div>
                    <label htmlFor="fileInput">
                        <AddPhotoIcon style={{ cursor: 'pointer'}}/>
                    </label>

                    <input id='fileInput' type="file" style={{ display: 'none'}} />
                    
                </div>
                <input className='input-price' type="text" placeholder='Цена' />
                <input type="text" placeholder='Название' />
                <input type="text" placeholder='Краткое описание' />
                <input type="text" placeholder='Полное описание' />
                <button>Добавить</button>
            </form>
        </Modal>
        </div>
    );
};

export default Home;