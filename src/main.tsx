import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import {addEditorChangeHandler, getEditor} from "./core/editor";


const root = createRoot(document.getElementById('root')!)
function render() {
    root.render(
        <StrictMode>
            <App editor={getEditor()}/>
        </StrictMode>,
    )
}

addEditorChangeHandler(render)
render()