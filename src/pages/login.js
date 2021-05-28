import { useContext, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import FirebaseContext from '../context/firebase'
import * as ROUTES from '../constants/routes'

const Login = () => {
	const history = useHistory()
	const { firebase } = useContext(FirebaseContext)
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')
	const [loading, setLoading] = useState(false)

	const isInvalid = password === '' || email === ''

	const handleLogin = async (e) => {
		e.preventDefault()
		setLoading(true)
		try {
			await firebase.auth().signInWithEmailAndPassword(email, password)
			history.push(ROUTES.DASHBOARD)
		} catch (err) {
			setLoading(false)
			setError(err.message)
			setPassword('')
		}
	}
	const handleDummyLogin = async (e) => {
		e.preventDefault()
		try {
			await firebase.auth().signInWithEmailAndPassword('jon@test.com', '123456')
			history.push(ROUTES.DASHBOARD)
		} catch (err) {
			setError(err.message)
		}
	}

	useEffect(() => {
		document.title = 'Login - Instagram'
	}, [])

	return (
		<div className='container flex mx-auto max-w-screen-md items-center h-screen'>
			<div className='w-3/5 hidden md:block'>
				<img src='/images/iphone-with-profile.jpg' alt='ihone with profile' />
			</div>
			<div className='flex flex-col w-4/5 sm:w-3/5 md:w-2/5 mx-auto'>
				<div className='flex flex-col items-center bg-white p-4 border border-gray-primary mb-4 rounded'>
					<h1 className='flex justify-center w-full'>
						<img
							className='mt-2 w-6/12 mb-4'
							src='/images/logo.png'
							alt='Instagram'
						/>
					</h1>
					{error && <p className='mb-4 text-xs text-red-primary'>{error}</p>}
					<form method='POST' className='' onSubmit={handleLogin}>
						<input
							type='email'
							aria-label='Enter your email address'
							placeholder='Email Address'
							className='input-field'
							value={email}
							onChange={({ target }) => setEmail(target.value)}
						/>
						<input
							type='password'
							aria-label='Enter your password'
							placeholder='Password'
							className='input-field'
							value={password}
							onChange={({ target }) => setPassword(target.value)}
						/>
						<button
							type='submit'
							disabled={isInvalid}
							className={`bg-blue-medium mt-4 text-white w-full rounded h-8 font-bold 
						${isInvalid && ' opacity-50'}`}
						>
							{loading ? 'Loading...' : 'Log In'}
						</button>
					</form>
				</div>
				<div className='flex justify-center items-center flex-col w-full bg-white p-4 border border-gray-primary rounded'>
					<p className='text-sm'>
						Don't have an account ?{' '}
						<Link to={ROUTES.SIGNUP} className='font-bold text-blue-medium'>
							Signup
						</Link>
					</p>
				</div>
				<form
					className='mt-4 flex justify-center items-center flex-col w-full bg-white p-4 border border-gray-primary rounded'
					onSubmit={handleDummyLogin}
					method='post'
				>
					<p className='text-sm'>Click below to login as a Dummy User</p>
					<button
						className='bg-blue-medium mt-4 text-white px-4 rounded h-8 font-bold '
						type='submit'
					>
						Test User Login
					</button>
				</form>
			</div>
		</div>
	)
}

export default Login