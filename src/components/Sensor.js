// set up sensor(s) on this page

import React from 'react';
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

class Sensor extends React.Component
{
	render()
	{
		return(
			<div style={red}>
				<div>
					<div class='card'>

					</div>
				</div>
			</div>
		);
	}
}

export default Sensor