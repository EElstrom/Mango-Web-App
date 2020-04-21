// logged-in home page with greenhouse data cards

import React from 'react';
import Logo from '../components/Logo';
import Settings from '../components/Settings';
import DataDisplay from '../components/DataDisplay';
import Add from '../components/Add';
import {Plus, Leaf, Gear, Logout} from '../components/SVGs';
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
    top: '10%',
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
    top: '10%',
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
    top: '10%',
    left: '72%',
    boxShadow: '7px -2px 5px #EEEEEE'
}

const icon_style = {
    height: '45px',
    width: '45px',
    margin: '10px 20px 0px 20px'
}

const logout_style = {  
    position: 'fixed',
    top: '4%',
    left: '94%',

    height: '45px',
    width: '45px',
    margin: '10px 20px 0px 20px'
}

class HomePage extends React.Component
{
    constructor(props)
    {
        super(props);

        // modes: create, data, settings
        this.state = {
			mode: 'data'
        };
    }

    setModeAdd = async event =>
    {
        event.preventDefault();
        this.setState({mode: 'add'});
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

    logout = async event => {
        event.preventDefault();

        // TODO: call to API
    }

	render()
	{
		return(
			<div>
                <div style={header}>
                    <Logo/>
                    <div onClick={this.setModeAdd} style={red_tab}>
                        <div style={icon_style}>
                            <Plus/>
                        </div>
                    </div>
                    <div onClick={this.setModeData} style={orange_tab}>
                        <div style={icon_style}>
                            <Leaf/> 
                        </div>
                    </div>
                    <div onClick={this.setModeSettings} style={yellow_tab}>
                        <div style={icon_style}>
                            <Gear/>
                        </div>
                    </div>
                    {/* <div style={profilePic_style}>
                     <ProfilePic/>
                    </div> */}
                    <div onClick={this.logout} style={logout_style}>
                        <Logout/>
                    </div>
                </div>
                <div>
                    {(this.state.mode === 'add') ? <Add/> : <div />}
					{(this.state.mode === 'data') ? <DataDisplay/> : <div />}
					{(this.state.mode === 'settings') ? <Settings/> : <div />}
                </div>
			</div>
		);
	}
}

export default HomePage;