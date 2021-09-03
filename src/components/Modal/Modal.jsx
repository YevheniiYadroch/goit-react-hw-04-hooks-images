import { useEffect } from 'react'
import './Modal.css'

function Modal({ image, onClose }) {

    useEffect(() => {
        window.addEventListener('keydown', handleKeydown);
        return (() => {
            window.removeEventListener('keydown', handleKeydown)
        })
    }, [])

    const handleKeydown = e => {
        if (e.code === 'Escape') {
            onClose();
        }
    }

    const handleBackdropClick = e => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    }

    return (
        <div onClick={handleBackdropClick} className="Overlay">
            <div className="Modal">
                <img className="Modal-image" src={image} alt="" />
            </div>
        </div>
    )
}

export default Modal;