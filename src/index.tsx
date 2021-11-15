import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import {initStore} from './store'
import './index.css'
import App from './components/App'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={initStore()}>
    <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

