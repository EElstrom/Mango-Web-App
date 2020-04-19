// settings page for adjusting polling frequency, account, etc

import React from 'react';
import '../App.css';

const yellow = {
    backgroundColor: '#FFD151',
    minHeight: '80%',
    minWidth: '1024px',
      
    width: '100%',
    height: 'auto',
      
    position: 'fixed',
    top: '20%',
    left: '0'
};

class Settings extends React.Component
{
	render()
	{
		return(
			<div style={yellow}>
				<div>
					<div>settings page!</div>
				</div>
			</div>
		);
	}
}

export default Settings;