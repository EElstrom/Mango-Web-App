// everything on Login except logo

import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

class Logo extends React.Component
{
    var loginEmail;
	var loginPassword;

	const [message,setMessage] = useState('');
	
	const [userBox, setUserBox] = useState('large-text-box');
	const [passwordBox, setPasswordBox] = useState('large-text-box');
	
	const [loginError, setLoginError] = useState('');
	const [userError, setUserError] = useState('');
	const [passwordError, setPasswordError] = useState('');


	const doLogin = async event =>
	{
		event.preventDefault();

		const email = loginEmail.value;
		const password = loginPassword.value;

		console.log('api/login');

		const response = await fetch('api/login', {
		  method: 'POST',
		  headers: {'Content-Type': 'application/json'},
		  body: JSON.stringify({email: email, password: password})
		}).then(response => {return response.json()});

		setMessage('');
		setUserBox('large-text-box');
		setPasswordBox('large-text-box');
		setLoginError('');
		setUserError('');
		setPasswordError('');

		if (response.success) {
			// do login magic here
			setMessage('Logged in');
			window.location.replace("/home");
		}
		else if (response.errors === 'bad login') {
			setLoginError(<span>Email or password is incorrect<br /></span>);
		}
		else {
			var errors = response.errors;
			if (errors.email !== undefined) {
				setUserBox('large-error-box');
				setUserError(<span>{errors.email}<br /></span>);
			}
			if (errors.password !== undefined) {
				setPasswordBox('large-error-box');
				setPasswordError(<span>{errors.password}<br /></span>);
			}
		}
		
    };
    
	render()
	{
		return(
            <div id="login">
                <form onSubmit={doLogin}>
                    <input className={userBox} type="text" id="email" placeholder="email" ref={(c) => loginEmail = c}/><br />
                    <input className={passwordBox} type="password" id="loginPassword" placeholder="password" ref={(c) => loginPassword = c}/><br />
                    <input type="submit" id="loginButton" className="buttons" value="Sign In"/>
                </form>
                <p>
                    <Link to="/register">Register a new account</Link><br />
                    <span id="result">{message}</span><br />
                    <span id="errors">{loginError}{userError}{passwordError}</span>

                </p>
            </div>
		);
	}
}

export default Logo;