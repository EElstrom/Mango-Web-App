// add a plant to a greenhouse

import React from 'react';
import {Greenhouse} from '../components/SVGs';
import '../App.css';

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
    
// card to create a new plant
class AddPlant extends React.Component
{
	constructor(props)
    {
        super(props);

        this.state = {
			plantName: '',
			plantSpecies: '',
			message: ''
        };
	}

	// add plant to greenhouse
	addPlant = async event =>
	{
		event.preventDefault();

		// TODO Make API Call Here (See API Specs on GitHub Wiki)
        
		const name = this.state.plantName.value;
		const type = this.state.plantSpecies.value;
		const deviceName = this.props.ghName;
		
		console.log(JSON.stringify({
				name: name,
				type: type,
				deviceName: deviceName
		}));
		
		console.log('api/addPlant');
		const response = await fetch('api/addPlant', {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				name: name,
				type: type,
				deviceName: deviceName
			})
		}).then(response => {return response.json()});
		console.log(JSON.stringify(response));
		
		var msg = '';
		if (response.success)
		{
			this.props.update();
		}
		else
		{
			msg = response.errors.name || response.errors || 'unknown error';
		}
		this.setState({message: msg});
	}
	
	render()
	{
		return(
			<div class='card'>
				<form onSubmit={this.addPlant}>
					<link rel='stylesheet' href="https://fonts.googleapis.com/css?family=Nunito:900"/>
					<link rel='stylesheet' href="https://fonts.googleapis.com/css?family=Zilla+Slab:700"/>
					<div class='mango'>nice! now add your first plant:</div>
					<input style={login_field} type='text' id='plantName' placeholder='Name (e.g. geranium #2)' ref={(value) => this.state.plantName = value}/><br />
					<input style={login_field} type='text' id='plantType' placeholder='Species (e.g. Geranium)' ref={(value) => this.state.plantSpecies = value}/><br />
					<input style={login_button} type='submit' id='addPlant' value='Add to greenhouse' />
					<span> {this.state.message} </span>
				</form>
			</div>
		);
	}
}

// addPlant endpt
// name : req.body.name,
// notes : pnotes,
// deviceName : dName,
// type : pType,
// temperatureTolerance : tempTol,
// lightTolerance : lightTol,
// phTolerance : phTol,
// humidityTolerance : humTol

export default AddPlant;