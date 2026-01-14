import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import { Provider } from 'react-redux';
import { store } from './core/redux/store';
import { addEditorChangeHandler, getEditor } from "./core/editor";


const root = createRoot(document.getElementById('root')!)
function render() {
    root.render(
        <StrictMode>
            <Provider store={store}>
                <App/>
            </Provider>
        </StrictMode>,
    )
}

addEditorChangeHandler(render)
render()