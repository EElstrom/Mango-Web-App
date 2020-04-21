// displays information about the user's greenhouse(s)

import React from 'react';
import {Create_gh_prompt, Create_gh} from '../components/CreateGH';
import DataDetails from '../components/DataDetails';
import '../App.css';

const orange = {
    backgroundColor: '#FF8C42',
    minHeight: '80%',
    minWidth: '1024px',
      
    width: '100%',
    height: 'auto',
      
    position: 'fixed',
    top: '20%',
    left: '0'
};

class DataDisplay extends React.Component
{
	constructor(props)
    {
        super(props);

        this.state = {
			// mode can be prompt, create, or data
			mode: 'data'
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
			<div>
				<div style={orange}>
				{(this.state.mode === 'prompt') ? <Create_gh_prompt update={this.setCreate}/> : <div />}
				{(this.state.mode === 'create') ? <Create_gh/> : <div />}
				{(this.state.mode === 'data') ? <DataDetails/> : <div />}
				<div>
					{/* Icons made by <a href="https://www.flaticon.com/authors/smalllikeart" title="smalllikeart">smalllikeart</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> */}
				</div>
				</div>
			</div>
		);
	}
}

export default DataDisplay;