// global logo and name

import React from 'react';
import '../App.css';

const mango_icon_style = {
	width: '43px',
	height: '43px',
	padding: '0px 0px 0px 10px'
};

class Logo extends React.Component
{
	render()
	{
		return(
            <div class='mango'>
				<link rel='stylesheet' href="https://fonts.googleapis.com/css?family=Nunito:900"/>
				<span>mango</span>
				<img src='/mango2.png' alt='mango icon' style={mango_icon_style}/>
			</div>
			);
	}
}

export default Logo;