import React from 'react';

const DataDisplayComponent = ({ data }) => {
  return (
    <div style={{ position: 'absolute', right: '20px', top: '20px', backgroundColor: 'white', padding: '20px', border: '1px solid black', maxWidth: '300px', maxHeight: '400px', overflowY: 'auto' }}>
      {data ? (
        <div>
          <h3>Data for {data.id}</h3>
          {/* Display your data here. This is just an example. */}
          <p>{JSON.stringify(data, null, 2)}</p>
        </div>
      ) : (
        <p>No data selected</p>
      )}
    </div>
  );
};

export default DataDisplayComponent;