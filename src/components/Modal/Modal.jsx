import { Component } from 'react';
import './Modal.css'

class Modal extends Component {
    componentDidMount() {
     window.addEventListener('keydown', this.handleKeydown)
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeydown)
    }
    
    handleKeydown = e => {
        if (e.code === 'Escape') {
          this.props.onClose();
        }
    }

    handleBackdropClick = e => {
        if (e.target === e.currentTarget) {
            this.props.onClose();
        }
    }

    render() {
        return (
            <div onClick={this.handleBackdropClick} className="Overlay">
                <div className="Modal">
                    <img className="Modal-image" src={this.props.image} alt="" />
                </div>
            </div>
        )
    }
}

export default Modal;