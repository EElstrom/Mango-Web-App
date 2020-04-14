// Login page ... that's it

import React from 'react';
import Logo from '../components/Logo'
import Login from '../components/Login'
import '../App.css';

const white_box = {
	display: 'flex',
	flexDirection: 'column',
	alignContent: 'center',
	textAlign: 'center',

	margin: '10% auto',
	backgroundColor: '#FFFDE7',
	height: '50%',
	width: '50%',
  	// box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	borderRadius: '15px',
	padding: '39px'
};

class LoginPage extends React.Component
{
	render()
	{
		return(
            <div style={white_box}>
				<Logo/>
				<Login/>
			</div>
		);
	}
}

export default LoginPage;