// everything on Login except logo

import React from 'react';
// import { Link } from 'react-router-dom';
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
	paddingLeft: '20px',
	maxWidth: '70%',
	margin: '10px',

	fontSize: '35px',
	fontFamily: 'Zilla Slab'
}

const password_link = {
	color: '#6699CC',
	fontSize: '19px',
	fontFamily: 'Zilla Slab',
	margin: '8px 0px 8px 210px'
}

const register_link = {
	color: '#6699CC',
	fontSize: '19px',
	fontFamily: 'Zilla Slab',
	margin: '8px 0px 8px 158px'
}

class Login extends React.Component
{
	constructor(props)
    {
        super(props);

        this.state = {
            email: '',
            password: '',
            message: 'test message'
        };
	}

	login = async event =>
    {
        event.preventDefault();

        // TODO Make API Call Here (See API Specs on GitHub Wiki)

        this.setState({message: this.state.email.value + ' ' + this.state.password.value});
    }
	
	render()
	{
		return(
            <div style={login_comps}>
                <form onSubmit={this.login}>
					<link rel='stylesheet' href="https://fonts.googleapis.com/css?family=Zilla+Slab:700"/>
                    <input style={login_field} type='text' placeholder='email' ref={(value) => this.state.email = value}/>
                    <input style={login_field} type='password' placeholder='password' ref={(value) => this.state.password = value}/>
                    <div style={password_link}>forgot password?</div>
					<input style={login_button} type='submit' value='Log In'/>
                </form>

				<div style={register_link}>new to mango? sign up</div>

                {/* <span>{this.state.message}</span> */}
			</div>
			);
	}
}

export default Login;