import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'

import './css/index.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import App from './App'
import reportWebVitals from './reportWebVitals'

import store from './redux/store'
import { AuthProvider } from 'react-auth-kit'

ReactDOM.render(
	<React.StrictMode>
		<AuthProvider authType={ 'cookie' } authName={ 'JSESSIONID' } cookieDomain={ window.location.hostname }>
			<Router>
				<Provider store={ store }>
					<App/>
				</Provider>
			</Router>
		</AuthProvider>
	</React.StrictMode>,
	document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
