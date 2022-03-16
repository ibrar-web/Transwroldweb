import React from 'react';
import { HashRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import Rout from './Rout';
function Example() {
    return (
        <HashRouter>
            <div>
                <Rout />
            </div >
        </HashRouter>
    );
}

export default Example;

if (document.getElementById('example')) {
    ReactDOM.render(<Example />, document.getElementById('example'));
}
