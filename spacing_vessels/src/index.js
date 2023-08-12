import ReactDOM from 'react-dom/client'
import './assets/styles/index.scss'
import {BrowserRouter} from 'react-router-dom'
import {App} from './App'

const workareaContent = document.getElementById('workarea-content')
const element = document.getElementById('spacing-vessels')

workareaContent.classList.add('workarea-content-custom')
element.parentNode.classList.add('parent-root')

const root = ReactDOM.createRoot(element)

root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
)
