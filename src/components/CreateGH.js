import React from 'react';
import {Greenhouse} from '../components/SVGs';
import '../App.css';

const greenhouse_style = {
	height: '177px',
	width: '177px',
	margin: '0px 0px 50px 0px'
}

// card prompting creation of a gh
class Create_gh_prompt extends React.Component
{
	render()
	{
		return(
			<div class='card'>
				<div style={greenhouse_style}><Greenhouse /></div>
				<div class='mango'>create your first greenhouse!</div>
			</div>
		);
	}
}

// card to create a new gh
class Create_gh extends React.Component
{
	render()
	{
		return(
			<div>
                <div class='card'>
                    create new greenhouse page!
                </div>
			</div>
		);
	}
}

export {Create_gh_prompt, Create_gh};