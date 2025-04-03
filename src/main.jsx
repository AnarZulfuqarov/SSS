import {createRoot} from 'react-dom/client'
import './index.scss'
import App from './App.jsx'
import {Provider} from "react-redux";
import {store} from "./services/store.jsx";

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <App/>
    </Provider>
)