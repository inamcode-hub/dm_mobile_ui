import React from 'react';

const ChartHeader = () => {
  return (
    <div>
      <div className='left'>
        <div className='show'></div>
        <div className='select-date'>
          {/* date picker */}
          <input type='date' />
        </div>
        <div className='pagination'>
          <button>Previous</button>
          <button>Next</button>
        </div>
      </div>
    </div>
  );
};

export default ChartHeader;
