import React from 'react';
import ReactDOM from 'react-dom';
import './UserModal.css'; // Add modal styles here

const UserModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
        {children}
      </div>
    </div>,
    document.getElementById('modal-root') // Ensure this exists in your HTML file
  );
};

export default UserModal;