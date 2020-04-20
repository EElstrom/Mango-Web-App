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
			message: 'test message'
        };
	}

	register = async event =>
    {
        event.preventDefault();

        // TODO Make API Call Here (See API Specs on GitHub Wiki)

		this.props.update(this.state.name, this.state.email);
    }
	
	render()
	{
		return(
            <div style={login_comps}>
                <form onSubmit={this.register}>
					<link rel='stylesheet' href="https://fonts.googleapis.com/css?family=Zilla+Slab:700"/>
                    <input style={login_field} type='text' placeholder='name' ref={(value) => this.state.name = value}/>
                    <input style={login_field} type='text' placeholder='email' ref={(value) => this.state.email = value}/>
                    <input style={login_field} type='password' placeholder='password' ref={(value) => this.state.password = value}/>
                    <input style={login_field} type='password' placeholder='confirm password' ref={(value) => this.state.password2 = value}/>
					<input style={login_button} type='submit' value='Sign up'/>
                </form>

				<div>
					<span style={link}>already have an account? </span>
					<Link to="/login" style={underline_link}>log in</Link>
				</div>

                {/* <span>{this.state.message}</span> */}
			</div>
			);
	}
}

export default Register;