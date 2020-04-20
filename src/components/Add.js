// displays information about the user's greenhouse(s)

import React from 'react';
import {Create_gh} from '../components/CreateGH';
import '../App.css';

const red = {
    backgroundColor: '#FF3C38',
    minHeight: '80%',
    minWidth: '1024px',
      
    width: '100%',
    height: 'auto',
      
    position: 'fixed',
    top: '20%',
    left: '0'
};

class Add extends React.Component
{
	constructor(props)
    {
        super(props);

        this.state = {
        };
	}

	setCreate = async event =>
    {
        event.preventDefault();
        this.setState({mode: 'create'});
    }
	
	render()
	{
		return(
            <div style={red}>
                <Create_gh/>
            </div>
		);
	}
}

export default Add;