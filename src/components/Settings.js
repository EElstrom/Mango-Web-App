// settings page for adjusting polling frequency, account, etc

import React from 'react';
import '../App.css';

const yellow = {
    backgroundColor: '#FFD151',
    minHeight: '80%',
    minWidth: '1024px',
      
    width: '100%',
    height: 'auto',
      
    position: 'fixed',
    top: '20%',
    left: '0'
};

const name_style = {
    fontFamily: 'Nunito',
    fontSize: '35px',
    padding: '0px 0px 27px 0px',
    color: '#000000',
      
    position: 'fixed',
    top: '25%',
    left: '15%',
}

const email_style = {
    fontFamily: 'Nunito',
    fontSize: '35px',
    padding: '0px 0px 27px 0px',
    color: '#000000',
      
    position: 'fixed',
    top: '40%',
    left: '15%',
}

const password_style = {
    fontFamily: 'Nunito',
    fontSize: '35px',
    padding: '0px 0px 27px 0px',
    color: '#000000',
      
    position: 'fixed',
    top: '55%',
    left: '15%',
}

const pollFreq_style = {
    fontFamily: 'Nunito',
    fontSize: '35px',
    padding: '0px 0px 27px 0px',
    color: '#000000',
      
    position: 'fixed',
    top: '70%',
    left: '15%',
}

const login_field = {
	color: '#FFFFFF',
	backgroundColor: '#CDDFBC',
	outline: 'none',
	width: '5em',
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

const button_style = {
	position: 'fixed',
    top: '85%',
    left: '15%'
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


	fontSize: '25px',
	fontFamily: 'Zilla Slab'
	
}

class Settings extends React.Component
{
	
	constructor(props)
	{
		super(props);
		this.state = {
            name: '',
			email: '',
            password: '',
            password2: '',
            message: '',
			freq: ''
        };
	}
	update = async event =>
    {
        event.preventDefault();
		
		const name = this.state.name.value;
		const email = this.state.email.value;
		const password = this.state.password.value;
		const password2 = this.state.password2.value;
		
		if (password !== password2)
		{
			this.setState({message: 'passwords do not match'});
			return;
		}
		
		console.log('api/editUser');
		const response = await fetch('api/editUser', {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				name: name,
				email: email,
				password: password
			})
		}).then(response => {return response.json()});
		console.log(JSON.stringify(response));
		
		var msg = '';
		if (response.success)
		{
			msg = 'updated successfully';
		}
		else
		{
			msg = response.errors || 'unknown error';
		}
		this.setState({message: msg});
	}
	
	render()
	{
		return(
			<div style={yellow}>
				<link rel='stylesheet' href="https://fonts.googleapis.com/css?family=Zilla+Slab:700"/>
				<div class='card'>
				<form onSubmit={this.update}>
					<div style={name_style}>
						name: 
						<input style={login_field} type='text' placeholder='name' ref={(value) => this.state.name = value}/><br />
					</div>
					<div style={email_style}>
						email: 
						<input style={login_field} type='text' placeholder='email' ref={(value) => this.state.email = value}/><br />
					</div>
					<div style={password_style}>
						password: 
						<input style={login_field} type='password' placeholder='confirm password' ref={(value) => this.state.password2 = value}/><br />
					</div>
					<div style={password_style}>
						password: 
						<input style={login_field} type='password' placeholder='password' ref={(value) => this.state.password = value}/><br />
					</div>
					<div style={pollFreq_style}>
						polling frequency: 
						<input style={login_field} type='text' placeholder='x' ref={(value) => this.state.freq = value}/>
						times per
						<input style={login_field} type='text' placeholder='y' ref={(value) => this.state.freq = value}/>
						hour(s)
						<br />
					</div>
					<div style={button_style}>
						<input style={login_button} type='submit' value='Update'/>
						<span>{ this.state.message }</span>
					</div>
					
				</form>
				</div>
			</div>
		);
	}
}

export default Settings;