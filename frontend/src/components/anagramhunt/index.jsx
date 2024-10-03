import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter} from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <App />
    </BrowserRouter>

)


// when linking from main website path will be something like this <a href="/games/anagram/src/index.html" /a>