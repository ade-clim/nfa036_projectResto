import React from 'react';

export default React.createContext({
    totalCart: [],
    totalPrice: 0,
    updateTotalPrice: (name) => {},
    updateTotalCart: (name) => {}
});