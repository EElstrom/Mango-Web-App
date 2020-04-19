// logged-in home page with greenhouse data cards

import React from 'react';
import Logo from '../components/Logo';
import Settings from '../components/Settings';
import DataDisplay from '../components/DataDisplay';
import Sensor from '../components/Sensor';
import {ProfilePic} from '../components/SVGs';
import '../App.css';

const header = {
    backgroundColor: '#FFFFFF',
    margin: '30px'
};

const orange_tab = {
	backgroundColor: '#FF8C42',
    minHeight: '25%',
    borderRadius: '10px',
      
    width: '90px',
    height: 'auto',
      
    position: 'fixed',
    top: '15%',
    left: '80%',
    boxShadow: '7px -2px 5px #EEEEEE'
}

const yellow_tab = {
	backgroundColor: '#FFD151',
    minHeight: '25%',
    borderRadius: '10px',
      
    width: '90px',
    height: 'auto',
      
    position: 'fixed',
    top: '15%',
    left: '88%',
    boxShadow: '7px -2px 5px #EEEEEE'
}

const red_tab = {
	backgroundColor: '#FF3C38',
    minHeight: '25%',
    borderRadius: '10px',
      
    width: '90px',
    height: 'auto',
      
    position: 'fixed',
    top: '15%',
    left: '72%',
    boxShadow: '7px -2px 5px #EEEEEE'
}

const profilePic_style = {
    width: '50px',
    height: '50px',
      
    position: 'fixed',
    top: '5%',
    left: '90%'
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
                <div style={header}>
                    <Logo />
                    <div onClick={this.setModeSensor} style={red_tab}></div>
                    <div onClick={this.setModeData} style={orange_tab}></div>
                    <div onClick={this.setModeSettings} style={yellow_tab}></div>
                    <div style={profilePic_style}>
                     <ProfilePic />
                    </div>
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