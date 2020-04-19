// displays information the user's greenhouse(s)

import React from 'react';
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
	render()
	{
		return(
			<div>
				<div style={orange}>
					<div>data page!</div>
				</div>
			</div>
		);
	}
}

export default DataDisplay;