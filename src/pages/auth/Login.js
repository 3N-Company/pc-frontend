import { useIsAuthenticated, useSignIn } from 'react-auth-kit'
import { Redirect, useHistory } from 'react-router-dom'
import axios from 'axios'
import Box from '@mui/material/Box'
import { TextField } from '@mui/material'
import Button from '@mui/material/Button'

const Login = () => {
	const isAuthenticated = useIsAuthenticated()
	const signIn = useSignIn()
	const history = useHistory()

	const handleSubmit = event => {
		event.preventDefault()
		const data = new FormData(event.currentTarget)
		loginHandler(data.get('login'), data.get('password'))
	}

	const loginHandler = (login, password) => {

		const authData = {
			username: login,
			password: password
		}

		const handleLogin = () => axios.post(
			`http://0.0.0.0:8080/login`,
			{},
			{
				auth: authData
			}
		).then(
			({ data: { value } }) => signIn({
				token: value,
				tokenType: 'string',
				authState: { login: login },
				expiresIn: 9999999
			})
		).then(
			isSignedIn => {
				if (isSignedIn) {
					console.log('Signed in')
					history.push('/')
				} else {
					alert('error')
				}
			}
		).catch(
			({ response }) => {
				if (response.status === 404) {
					alert('User does not exist')
				} else {
					alert('Unhandled error.')
				}
			}
		)

		axios.post(
			`http://0.0.0.0:8080/register`,
			authData
		).catch(
			({ response }) => {
				if (response.status !== 409) {
					alert('Unhandled error by user registration.')
				}
			}
		).then(
			() => handleLogin()
		)
	}

	if (isAuthenticated()) {
		return <Redirect to={ '/' }/>
	} else {
		return <LoginView handleSubmit={ handleSubmit }/>
	}
}

const LoginView = ({ handleSubmit }) => (
	<Box component="form" onSubmit={ handleSubmit } noValidate sx={ { width: '300px', mt: 1, mx: 'auto' } }>
		<TextField
			margin="normal"
			required
			fullWidth
			id="email"
			label="Login"
			name="login"
			autoFocus
		/>
		<TextField
			margin="normal"
			required
			fullWidth
			name="password"
			label="Password"
			type="password"
			id="password"
			autoComplete="current-password"
		/>
		<Button
			type="submit"
			fullWidth
			variant="contained"
			sx={ { mt: 3, mb: 2 } }
		>
			Sign In
		</Button>
	</Box>
)

export default Login