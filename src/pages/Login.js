// Login page ... that's it

import React from 'react';
import Logo from '../components/Logo'
import '../App.css';

const white_box = {
	display: 'flex',
	'flex-direction': 'column',
	'align-content': 'center',

	margin: '10% auto',
	'text-align': 'center',
	'background-color': '#FFFFFF',
	height: '50%',
	width: '50%',
  	// box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	'border-radius': '15px'
};

class Login extends React.Component
{
	render()
	{
		return(
            <div>
				<div style={white_box}>
					<Logo/>
					<Login/>
				</div>
			</div>
		);
	}
}

export default Login;