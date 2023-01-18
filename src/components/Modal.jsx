const Modal = ({ open, children, onClose }) => {
    return root.render(() => {
        return <div className='modal'>
            {children}
        </div>
    })
}

export default Modal

/* <div className='modal'>
            {children}
        </div>, */