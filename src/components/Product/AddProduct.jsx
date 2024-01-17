import React, { useState } from 'react';
import { ReactComponent as AddPhotoIcon } from '../img/addPhoto-icon.svg'
import { ReactComponent as RemoveIcon } from '../img/remove-icon.svg'
import Modal from 'react-modal';
Modal.setAppElement('#root');

const AddProduct = ({openAddProductModal}) => {
    const [addProductModalIsOpen, setAddProductModalIsOpen] = useState(false)

    const openAddProductModal = () => {
        setAddProductModalIsOpen(true)
    }
    
    const closeAddProductModal = () => {
        setAddProductModalIsOpen(false)
    }
    
    return (
        <Modal
        isOpen={addProductModalIsOpen}
        onRequestClose={closeAddProductModal}
        contentLabel='Модальное окно для добавления товара'
        className='addProduct-modal'
        >
            <RemoveIcon/>
            <form action="submit">
                <div>
        <Home openAddProductModal={openAddProductModal}/>
                </div>
            </form>
        </Modal>
    );
};

export default AddProduct;