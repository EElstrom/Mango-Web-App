// displays information the user's greenhouse(s)

import React from 'react';
import {Create_gh_prompt, Create_gh} from '../components/CreateGH';
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
				<Create_gh_prompt/>
				<div>
					{/* Icons made by <a href="https://www.flaticon.com/authors/smalllikeart" title="smalllikeart">smalllikeart</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> */}
				</div>
				</div>
			</div>
		);
	}
}

export default DataDisplay;