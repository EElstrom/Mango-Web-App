// logged-in home page with greenhouse data cards

import React from 'react';
import Logo from '../components/Logo';
import Settings from '../components/Settings';
import DataDisplay from '../components/DataDisplay';
import Sensor from '../components/Sensor';
import '../App.css';

const top = {
    backgroundColor: '#FFFFFF',
    margin: '30px'
};

const gh_card = {
	// display: 'flex',
	// flexDirection: 'column',
	// alignContent: 'center',
	// textAlign: 'center',

	// margin: '5% auto',
	backgroundColor: '#FFFFFF',
    minHeight: '50%',
    minWidth: '70%',
      
    width: 'auto',
    height: 'auto',
      
    position: 'fixed',
    // top: '20%',
    // left: '12.5%',

	borderRadius: '15px',
	padding: '39px'
};

const orange_tab = {
	backgroundColor: '#FF8C42',
    minHeight: '25%',
    borderRadius: '10px',
      
    width: '90px',
    height: 'auto',
      
    position: 'fixed',
    top: '15%',
    left: '80%'
}

const yellow_tab = {
	backgroundColor: '#FFD151',
    minHeight: '25%',
    borderRadius: '10px',
      
    width: '90px',
    height: 'auto',
      
    position: 'fixed',
    top: '15%',
    left: '88%'
}

const red_tab = {
	backgroundColor: '#FF3C38',
    minHeight: '25%',
    borderRadius: '10px',
      
    width: '90px',
    height: 'auto',
      
    position: 'fixed',
    top: '15%',
    left: '72%'
}

class HomePage extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
			mode: 'data'
        };
    }

    setModeSensor = async event =>
    {
        event.preventDefault();
        this.setState({mode: 'sensor'});
    }
    
    setModeData = async event =>
    {
        event.preventDefault();
        this.setState({mode: 'data'});
    }

    setModeSettings = async event =>
    {
        event.preventDefault();
        this.setState({mode: 'settings'});
    }

	render()
	{
		return(
			<div>
                <div style={top}>
                    <Logo />
                    <div onClick={this.setModeSensor} style={red_tab}></div>
                    <div onClick={this.setModeData} style={orange_tab}></div>
                    <div onClick={this.setModeSettings} style={yellow_tab}></div>
                </div>
                <div>
                    {(this.state.mode === 'sensor') ? <Sensor/> : <div />}
					{(this.state.mode === 'data') ? <DataDisplay/> : <div />}
					{(this.state.mode === 'settings') ? <Settings/> : <div />}
                </div>
			</div>
		);
	}
}

export default HomePage;