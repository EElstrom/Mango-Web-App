import React from 'react';
import {Greenhouse} from '../components/SVGs';
import '../App.css';

const greenhouse_style = {
	height: '177px',
	width: '177px',
	margin: '0px 0px 50px 0px'
}

// card prompting creation of a gh
class Create_gh_prompt extends React.Component
{
	render()
	{
		return(
			<div class='card' onClick={this.props.update}>
				<div style={greenhouse_style}><Greenhouse /></div>
				<div class='mango'>create your first greenhouse!</div>
			</div>
		);
	}
}

// card to create a new gh
class Create_gh extends React.Component
{
	createGH = async event =>
    {
        event.preventDefault();

        // TODO Make API Call Here (See API Specs on GitHub Wiki)

        // this.setState({message: this.state.email.value + ' ' + this.state.password.value});
	}
	
	render()
	{
		return(
			<div>
                <div class='card'>
					<form onSubmit={this.createGH}>
						gh create page
						{/* <link rel='stylesheet' href="https://fonts.googleapis.com/css?family=Zilla+Slab:700"/>
						<input style={login_field} type='text' placeholder='email' ref={(value) => this.state.email = value}/>
						<input style={login_field} type='password' placeholder='password' ref={(value) => this.state.password = value}/>
						<Link to="/reset-password" style={underline_link_space}>forgot password?</Link>
						<input style={login_button} type='submit' value='Log In'/> */}
					</form>
                </div>
			</div>
		);
	}
}

export {Create_gh_prompt, Create_gh};