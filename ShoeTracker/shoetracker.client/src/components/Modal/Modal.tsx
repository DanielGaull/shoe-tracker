import React, { ReactNode } from 'react';

import './Modal.css';

interface ModalProps {
    open?: boolean;
    children?: ReactNode;
    onClose?: () => void;
}

const Modal = ({ 
    open = false, 
    children,
    onClose = () => {},
}: ModalProps) => {
    return (
        <div className={`modal ${open ? 'open' : ''}`}>
            <button className="x-button i-button" onClick={onClose}>
                X
            </button>
            {children}
        </div>
    );
}

export default Modal;
