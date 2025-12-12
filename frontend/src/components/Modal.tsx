import React from 'react'
import ReactDOM from 'react-dom';
type Props = {
    isOpen:boolean,
    onClose:()=>void,
    children:React.ReactNode,
    title:string
}

const Modal = ({isOpen,onClose,children,title}: Props) => {
    if(!isOpen){
        return null
    }
    const modalRoot = document.getElementById('modal-root')
  const modalContent=(
    <div className="fixed inset-0 bg-gray-800/50 flex items-center justify-center z-50"
      onClick={onClose}>
        <div 
        className="bg-white p-6 rounded-lg shadow-2xl max-w-lg w-full"
        onClick={(e) => e.stopPropagation()}
      >
            {/* Header/Close Button */}
            <div className="flex justify-between items-center border-b pb-3 mb-4">
            <h2 className="text-xl font-bold">{title || 'Modal Title'}</h2>
            <button 
                className="text-gray-500 hover:text-gray-800 text-2xl"
                onClick={onClose}
                aria-label="Close"
            >
                &times;
            </button>
            </div>

            {/* Modal Body Content */}
            <div>{children}</div>
        </div>
      </div>
  )
  return ReactDOM.createPortal(modalContent, modalRoot!);
}

export default Modal