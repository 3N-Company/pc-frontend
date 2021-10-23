import React from 'react'
import { Route } from 'react-router-dom'
import Login from './pages/auth/Login'
import { Header, Picker } from './components'
import { Browse, Contribute, Visualize } from './pages'
import { PrivateRoute } from 'react-auth-kit'

const App = () => {
	return (
		<div className="App">
			<Header/>
			<Route path="/" component={ Browse } exact/>
			<Route path="/browse" component={ Browse } exact/>
			<PrivateRoute loginPath={"/login"} path="/contribute/:photoIdUrl?" component={Contribute}/>
			<Route path="/login" component={ Login } exact/>
			<Route path="/v" component={ Visualize } exact/>
			<Route path="/p" component={ Picker } exact/>
		</div>
	)
}
export default App;
