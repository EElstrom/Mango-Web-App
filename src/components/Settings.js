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
    top: '30%',
    left: '15%',
}

const email_style = {
    fontFamily: 'Nunito',
    fontSize: '35px',
    padding: '0px 0px 27px 0px',
    color: '#000000',
      
    position: 'fixed',
    top: '45%',
    left: '15%',
}

const password_style = {
    fontFamily: 'Nunito',
    fontSize: '35px',
    padding: '0px 0px 27px 0px',
    color: '#000000',
      
    position: 'fixed',
    top: '60%',
    left: '15%',
}

const pollFreq_style = {
    fontFamily: 'Nunito',
    fontSize: '35px',
    padding: '0px 0px 27px 0px',
    color: '#000000',
      
    position: 'fixed',
    top: '75%',
    left: '15%',
}

const login_field = {
	color: '#FFFFFF',
	backgroundColor: '#CDDFBC',
	outline: 'none',
	width: '15em',
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
	width: '8em',
	height: '2em',
	borderRadius: '10px',

	borderColor: 'transparent',
	maxWidth: '70%',
	margin: '15px 10px 20px 10px',


	fontSize: '30px',
	fontFamily: 'Zilla Slab'
}

const settings_card = {
    backgroundColor: '#FFFFFF',
    minHeight: '60%',
    minWidth: '85%',
        
    width: 'auto',
    height: 'auto',
        
    position: 'fixed',
    top: '25%',
    left: '4.5%',

    borderRadius: '15px',
    padding: '39px'
}

class Settings extends React.Component
{
	constructor(props)
    {
        super(props);

        this.state = {
			nameEdit: 'false',
			emailEdit: 'false',
			passEdit: 'false',
			pollEdit: 'false'
        };
	}

	submitEdit = async event => {
		// API call here
	}

	Edit_form = (ph) => {
		return (
			<form onSubmit={this.submitEdit}>
				<link rel='stylesheet' href="https://fonts.googleapis.com/css?family=Zilla+Slab:700"/>
				<input style={login_field} type='text' placeholder={ph} ref={(value) => this.state.email = value}/>
				<input style={login_button} type='submit' value='Save'/>
			</form>
		);
	}

	startNameEdit = async event => {
		event.preventDefault();
		this.setState({nameEdit: 'true'})
	}

	startEmailEdit = async event => {
		event.preventDefault();
		this.setState({emailEdit: 'true'})
	}

	startPassEdit = async event => {
		event.preventDefault();
		this.setState({passEdit: 'true'})
	}

	startPollEdit = async event => {
		event.preventDefault();
		this.setState({pollEdit: 'true'})
	}

	render()
	{
		return(
			<div style={yellow}>
				<div style={settings_card}>
					<div>
						{(this.state.nameEdit === 'false') ? 
						<div style={name_style}>
							name: name here
							<form onSubmit={this.startNameEdit}>
								<link rel='stylesheet' href="https://fonts.googleapis.com/css?family=Zilla+Slab:700"/>
								<input style={login_button} type='submit' value='Edit'/>
							</form>
						</div> : this.Edit_form('new name')}
					</div>
					<div>
						{(this.state.emailEdit === 'false') ? 
						<div style={email_style}>
							email: email here
							<form onSubmit={this.startEmailEdit}>
								<link rel='stylesheet' href="https://fonts.googleapis.com/css?family=Zilla+Slab:700"/>
								<input style={login_button} type='submit' value='Edit'/>
							</form>
						</div> : this.Edit_form('new email')}
					</div>
					<div>
						{(this.state.passEdit === 'false') ? 
						<div style={password_style}>
							password: password here
							<form onSubmit={this.startPassEdit}>
								<link rel='stylesheet' href="https://fonts.googleapis.com/css?family=Zilla+Slab:700"/>
								<input style={login_button} type='submit' value='Edit'/>
							</form>
						</div> : this.Edit_form('new password')}
					</div>
					<div>
						{(this.state.pollEdit === 'false') ? 
						<div style={pollFreq_style}>
							polling frequency: polling frequency here
							<form onSubmit={this.startPollEdit}>
								<link rel='stylesheet' href="https://fonts.googleapis.com/css?family=Zilla+Slab:700"/>
								<input style={login_button} type='submit' value='Edit'/>
							</form>
						</div> : this.Edit_form('new polling frequency')}
					</div>
				</div>
			</div>
		);
	}
}

export default Settings;