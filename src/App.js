import { Provider } from 'react-redux'
import './App.css'
import Checkout from './JS/Checkout'
import store from './store'

function App() {
    return (
        <Provider store={store}>
            <Checkout />
        </Provider>
    )
}

export default App
