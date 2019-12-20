import  React from 'react';
import ReactDom from 'react-dom';
require('../css/app.css');

const App = () => {
    return(
        <h1>Test</h1>
    )
}
const rootElement = document.querySelector('#app');
ReactDom.render(<App />, rootElement);
