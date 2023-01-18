import { createRoot } from 'react-dom/client';
import { createPortal } from 'react-dom';
import Modal from './Modal';
const Portal = () => {
    const container = document.getElementById('portal')
    const root = createRoot(container)
    root.render(<Modal />)
}

export default Portal