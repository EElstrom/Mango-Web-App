// email auth component for Register

import React from 'react';
// import { Link } from 'react-router-dom';
import '../App.css';

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

const text_style = {
	color: '#6699CC',
	fontSize: '27px',
	fontFamily: 'Zilla Slab',
	margin: '0px 0px 10px 0px'
}

class EmailAuth extends React.Component
{   
    constructor(props)
    {
        super(props);

        this.state = {
            code: '',
			message: ''
        };
	}

    // allow for multiple tries?
	auth = async event =>
    {
        event.preventDefault();

        // TODO Make API Call Here (See API Specs on GitHub Wiki)
		
		const authCode = this.state.code.value;
		var msg = '';
		
		console.log('api/verify');
		const response = await fetch('api/verify', {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				authCode: authCode
			})
		}).then(response => {return response.json()});
		console.log(JSON.stringify(response));
		
		if (response.success)
		{
			msg = 'verified'
			window.location.replace('/home');
		}
		else
		{
			msg = response.errors.email || response.errors || 'unknown error';
		}
		
		this.setState({message: msg});
    }

	render()
	{
		return(
            <div>
                <link rel='stylesheet' href="https://fonts.googleapis.com/css?family=Nunito:900"/>
                <div style={text_style}>Hey {this.props.name}! Please enter the code sent to {this.props.email} below:</div>
				<div>
                <form onSubmit={this.auth}>
					<link rel='stylesheet' href="https://fonts.googleapis.com/css?family=Zilla+Slab:700"/>
                    <input style={login_field} type='text' placeholder='xxxxxx' ref={(value) => this.state.code = value}/>
					<input style={login_button} type='submit' value='Confirm Email'/>
                </form>
				{ <span>{this.state.message}</span> }
				</div>
			</div>
			);
	}
}

export default EmailAuth;