// everything on Register except logo

import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const login_comps = {
	textAlign: 'center'
};

const login_field = {
	color: '#FFFFFF',
	backgroundColor: '#CDDFBC',
	outline: 'none',
	width: '10em',
	height: '2em',
  	margin: '15px',
	borderRadius: '10px',

	borderColor: 'transparent',
	paddingLeft: '20px',
	maxWidth: '70%',
	margin: '10px',

	fontSize: '35px',
	fontFamily: 'Zilla Slab'
}

const login_button = {
	color: '#FFFFFF',
	backgroundColor: '#75A544',
	outline: 'none',
	width: '10em',
	height: '2em',
  	margin: '15px',
	borderRadius: '10px',

	borderColor: 'transparent',
	maxWidth: '70%',
	margin: '10px 10px 20px 10px',


	fontSize: '35px',
	fontFamily: 'Zilla Slab'
}

const link = {
	color: '#6699CC',
	fontSize: '19px',
	fontFamily: 'Zilla Slab'
}

const underline_link = {
	color: '#6699CC',
	fontSize: '19px',
	fontFamily: 'Zilla Slab',
	textDecoration: 'underline'
}

const underline_link_space = {
	color: '#6699CC',
	fontSize: '19px',
	fontFamily: 'Zilla Slab',
	textDecoration: 'underline',
	margin: '8px 0px 8px 210px'
}

class Register extends React.Component
{
	constructor(props)
    {
        super(props);

        this.state = {
            name: '',
            email: '',
            password: '',
            password2: '',
			message: ''
        };
	}

	register = async event =>
    {
        event.preventDefault();

		const email = this.state.email.value;
		const password = this.state.password.value;
		const password2 = this.state.password2.value;
		const name = this.state.name.value;
		var msg = '';
		
		if (password !== password2)
		{
			this.setState({message: 'passwords do not match'});
			return;
		}
		
		console.log('api/register');
		
		const response = await fetch('api/register', {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				email: email,
				password: password,
				name: name
			})
		}).then(response => {return response.json()});
		
		console.log(JSON.stringify(response));
		if (response.success)
		{
			msg = 'registered!';
			this.props.update(this.state.name, this.state.email);
		}
		else if (response.errors.email)
		{
			msg = response.errors.email;
		}
		else if (response.errors.password)
		{
			msg = response.errors.password;
		}
		else
		{
			msg = response.errors || 'Unknown error';
		}
		this.setState({message: msg});
    }
	
	render()
	{
		return(
            <div style={login_comps}>
                <form onSubmit={this.register}>
					<link rel='stylesheet' href="https://fonts.googleapis.com/css?family=Zilla+Slab:700"/>
                    <input style={login_field} type='text' placeholder='name' ref={(value) => this.state.name = value}/><br />
                    <input style={login_field} type='text' placeholder='email' ref={(value) => this.state.email = value}/><br />
                    <input style={login_field} type='password' placeholder='password' ref={(value) => this.state.password = value}/><br />
                    <input style={login_field} type='password' placeholder='confirm password' ref={(value) => this.state.password2 = value}/><br />
					<input style={login_button} type='submit' value='Sign up'/>
                </form>

				<div>
					<span style={link}>already have an account? </span>
					<Link to="/login" style={underline_link}>log in</Link>
				</div>

                { <span>{this.state.message}</span> }
			</div>
			);
	}
}

export default Register;