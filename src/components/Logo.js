// global logo and name

import React from 'react';
import '../App.css';

const mango_icon_style = {
	width: '43px',
	height: '43px',
	padding: '13px 0px 0px 10px'
};

const header_style = {
	display: 'flex',
};

class Logo extends React.Component
{
	render()
	{
		return(
            <div style={header_style}>
				<link rel='stylesheet' href="https://fonts.googleapis.com/css?family=Nunito:900"/>
				<div class='mango'>mango</div>
				<div>
					<img src='/mango2.png' alt='mango icon' style={mango_icon_style}/>
				</div>
			</div>
			);
	}
}

export default Logo;