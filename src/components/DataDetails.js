// show info about a greenhouse

import React from 'react';
import '../App.css';

const greenhouse_style = {
	height: '177px',
	width: '177px',
	margin: '0px 0px 50px 0px'
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
                {this.props.deviceName} <br/>
                {(this.state.conditions.length > 0) ? this.state.conditions[0].datetime : "" /* CONVERT FROM UTC TO LOCAL */} <br/>
                {(this.state.conditions.length > 0) ? this.state.conditions[0].curTemp : "" /* CONVERT FROM C TO F */} <br/>
                {(this.state.conditions.length > 0) ? this.state.conditions[0].curHumidity : ""} <br/>
			</div>
		);
	}
}

export default DataDetails;