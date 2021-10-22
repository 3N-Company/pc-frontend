import { useState, useEffect } from 'react'
import { Route } from 'react-router-dom'

import { Header } from './components'
import { Browse, Contribute } from './pages'

import HomeIcon from '@mui/icons-material/Delete'
import Login from './pages/auth/Login'

const App = () => {
	const [name, setName] = useState('World')

	useEffect(() => {
		document.title = `Hello, ${ name }`
	})

	return (
		<div className="App">
			<Header/>
			<Route path="/" component={ Browse } exact/>
			<Route path="/browse" component={ Browse } exact/>
			<Route path="/contribute" component={ Contribute } exact/>
			<Route path="/login" component={ Login } exact/>
		</div>
	)
}

export default App
