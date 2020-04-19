// displays information the user's greenhouse(s)

import React from 'react';
import {Greenhouse} from '../components/SVGs';
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

const greenhouse_style = {
	height: '177px',
	width: '177px',
	margin: '0px 0px 50px 0px'
}

class DataDisplay extends React.Component
{
	render()
	{
		return(
			<div>
				<div style={orange}>
					<div class='card'>
						<div style={greenhouse_style}>
							<Greenhouse />
						</div>
						<div class='mango'>create your first greenhouse!</div>
					</div>
					<div>
						{/* Icons made by <a href="https://www.flaticon.com/authors/smalllikeart" title="smalllikeart">smalllikeart</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> */}
					</div>
				</div>
			</div>
		);
	}
}

export default DataDisplay;