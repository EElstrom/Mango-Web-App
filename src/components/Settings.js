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

const name_style = {
    fontFamily: 'Nunito',
    fontSize: '35px',
    padding: '0px 0px 27px 0px',
    color: '#000000',
      
    position: 'fixed',
    top: '30%',
    left: '75%',
}

class Settings extends React.Component
{
	render()
	{
		return(
			<div style={yellow}>
				<div class='card'>
					<div style={name_style}>name</div>
					<div>email</div>
					<div>password</div>
					<div>polling frequency</div>
				</div>
			</div>
		);
	}
}

export default Settings;