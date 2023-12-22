// Modal.js
import React from 'react'; // Ensure React is imported

const Modal = ({ isVisible, onClose, cubeData }) => {
    if (!isVisible || !cubeData) return null;
    console.log(cubeData);
    return (
      <div style={{ position: 'fixed', top: 0, right: 0, width: '30%', height: '100%', backgroundColor: 'white', zIndex: 1000 }}>
        <div style={{ padding: 20 }}>
          <button onClick={onClose}>Close</button>
          {/* <h1>{cubeData.Exhibitor_Name}</h1>
          <p>{cubeData.Catalog_Brief}</p> */}
          <h1>{cubeData?.id || 'No Name'}</h1>
            <p>{cubeData?.Catalog_Brief || 'No Description'}</p>
          {/* Render other cube information here */}
        </div>
      </div>
    );
};

export default Modal; // Export the Modal component
