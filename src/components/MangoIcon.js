import React from 'react';

import DraggableComponent from './DraggableComponent';

class MangoIcon extends React.Component
{
	render()
	{
		return(
			<DraggableComponent alwaysfollow={true}>
				<img src='/mango.png' alt='Mango'/>
			</DraggableComponent>
		);
	}
}

export default MangoIcon;
