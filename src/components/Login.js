// everything on Login except logo

import React from 'react';
import '../App.css';

const header_style = {
	display: 'flex',
};

class Login extends React.Component
{
	render()
	{
		return(
            <div style={header_style}>hello mango world!</div>
			);
	}
}

export default Login;