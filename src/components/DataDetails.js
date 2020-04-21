// show info about a greenhouse

import React from 'react';
// import Chart from 'chart.js';
import '../App.css';


const greenhouse_style = {
	height: '177px',
	width: '177px',
	margin: '0px 0px 50px 0px'
}

const name_style = {
    fontFamily: 'Nunito',
    fontSize: '35px',
    padding: '0px 0px 27px 0px',
    color: '#000000',
      
    position: 'fixed',
    top: '30%',
    left: '75%'
}

const temp_style = {
    fontFamily: 'Nunito',
    fontSize: '55px',
    padding: '0px 0px 27px 0px',
    color: '#000000',
      
    position: 'fixed',
    top: '55%',
    left: '65%'
}

const hum_style = {
    fontFamily: 'Nunito',
    fontSize: '55px',
    padding: '0px 0px 27px 0px',
    color: '#000000',
      
    position: 'fixed',
    top: '55%',
    left: '80%'
}

const time_style = {
    fontFamily: 'Nunito',
    fontSize: '35px',
    padding: '0px 0px 27px 0px',
    color: '#000000',
      
    position: 'fixed',
    top: '85%',
    left: '67.5%'
}

const plants_style = {
    fontFamily: 'Nunito',
    fontSize: '35px',
    padding: '0px 0px 27px 0px',
    color: '#000000',
      
    position: 'fixed',
    top: '30%',
    left: '20%'
}

class DataDetails extends React.Component
{
	constructor(props)
    {
        super(props);

        this.state = {
            conditions: [],
        };
            
        console.log(this.props);

        this.getConditions();
	}

	getConditions = async () =>
    {
        // Fetch Devices
        const response = await fetch('api/getConditions', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({deviceID: this.props.deviceID})
        }).then(response => {return response.json()});

        console.log(response);

        this.setState({conditions: response.conditions});
    }

	render()
	{
		return(
            <div class='card'>
                <div style={name_style}>{this.props.deviceName}e</div>
                <div style={plants_style}>
                    plants:
                </div>
                <div style={temp_style}>{(this.state.conditions.length > 0) ? this.state.conditions[0].curTemp : "" /* CONVERT FROM C TO F */}ºC</div>
                <div style={hum_style}>{(this.state.conditions.length > 0) ? this.state.conditions[0].curHumidity : ""}%</div>
                <div style={time_style}>{(this.state.conditions.length > 0) ? this.state.conditions[0].datetime : "" /* CONVERT FROM UTC TO LOCAL */}</div>
			</div>
		);
	}
}

export default DataDetails;