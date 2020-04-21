// show info about a greenhouse

import React from 'react';
// import Chart from 'chart.js';
import '../App.css';

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
	// constructor(props)
    // {
    //     super(props);

    //     this.state = {
    //         email: '',
    //         password: '',
    //         message: 'test message'
    //     };
	// }

	// login = async event =>
    // {
    //     event.preventDefault();

    //     // TODO Make API Call Here (See API Specs on GitHub Wiki)

    //     this.setState({message: this.state.email.value + ' ' + this.state.password.value});
    // }

	render()
	{
		return(
            <div class='card'>
                <div style={name_style}>My greenhouse</div>
                <div style={plants_style}>
                    plants:
                </div>
                <div style={temp_style}>22ºC</div>
                <div style={hum_style}>45%</div>
                <div style={time_style}>last polled 15 mins ago</div>
			</div>
			);
	}
}

export default DataDetails;