import React, { useEffect } from 'react';

const Cards = () => {
  useEffect(() => {
    console.log('Cards');
  }, []);
  return <div>Cards</div>;
};

export default Cards;
