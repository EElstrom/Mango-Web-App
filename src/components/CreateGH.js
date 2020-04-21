import React from 'react';
import {Greenhouse} from '../components/SVGs';
import AddPlant from '../components/AddPlant';
import '../App.css';

const greenhouse_style = {
	height: '177px',
	width: '177px',
	margin: '0px 0px 50px 0px'
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
	width: '10em',
	height: '2em',
	borderRadius: '10px',

	borderColor: 'transparent',
	maxWidth: '70%',
	margin: '15px 10px 20px 10px',


	fontSize: '35px',
	fontFamily: 'Zilla Slab'
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
	constructor(props)
    {
        super(props);

		// mode can be create_gh, add_plant, or success
        this.state = {
			mode: 'create_gh',
			ghName: '',
        };
	}

	// createDevice with inputted name
	createGH = async event =>
    {
        event.preventDefault();

		// TODO Make API Call Here (See API Specs on GitHub Wiki)
		
		this.setState({mode: 'add_plant'});
	}

    setModeSuccess = () =>
    {
        // event.preventDefault();
        this.setState({mode: 'success'});
	}
	
	Gh_success = () => {
		return (
			<div>
				<div class='mango'>Greenhouse successfully added!</div>
				<div class='mango'>click the leaf to see all of your greenhouses</div>
			</div>
		);
	}

	CreateGH_comp = () => {
		return (
			<div>
			<form onSubmit={this.createGH}>
				<link rel='stylesheet' href="https://fonts.googleapis.com/css?family=Nunito:900"/>
				<link rel='stylesheet' href="https://fonts.googleapis.com/css?family=Zilla+Slab:700"/>
				<div class='mango'>name your greenhouse:</div>
				<input style={login_field} type='text' id='ghName' placeholder='My greenhouse' ref={(value) => this.state.ghName = value}/><br />
				<input style={login_button} type='submit' id='createGH' value='Create'/>
			</form>
			</div>
		);
	}
	
	render()
	{
		return(
			<div class='card'>
				{(this.state.mode === 'create_gh') ? this.CreateGH_comp() : <div />}
				{(this.state.mode === 'add_plant') ? <AddPlant update={this.setModeSuccess}/> : <div />}
				{(this.state.mode === 'success') ? this.Gh_success() : <div />}
			</div>
		);
	}
}

export {Create_gh_prompt, Create_gh};