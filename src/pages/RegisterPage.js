// Register page ... that's it

import React from 'react';
import Logo from '../components/Logo';
import Register from '../components/Register';
import EmailAuth from '../components/EmailAuth';
import '../App.css';

const background = {
	background: 'linear-gradient(129.34deg, rgba(246, 205, 90, 0.76) 2.04%, #FF8C42 49.36%, #EB4F4C 94.41%)',
	 
	 minHeight: '100%',
	 minWidth: '1024px',
	   
	 width: '100%',
	 height: 'auto',
	   
	 position: 'fixed',
	 top: '0',
	 left: '0'
}

const white_box = {
	display: 'flex',
	flexDirection: 'column',
	alignContent: 'center',
	textAlign: 'center',

	margin: '5% auto',
	backgroundColor: '#FFFFFF',
	height: '50%',
	width: '50%',
	borderRadius: '15px',
	padding: '39px'
};

class RegisterPage extends React.Component
{
	constructor(props)
    {
        super(props);

        this.state = {
			name: '',
			email: '',
			registered: false
        };
	}

	update = (n, e) =>
	{
        this.setState({name: n.value, email: e.value, registered: 'true'});
    }

	render()
	{
		return(
			<div style={background}>
				<div style={white_box}>
					<Logo/>
					{(this.state.registered) ? <EmailAuth name={this.state.name} email={this.state.email}/> 
											 : <Register update={this.update}/>}
				</div>
			</div>
		);
	}
}

export default RegisterPage;