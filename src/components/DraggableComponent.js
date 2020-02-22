import React from 'react';

// A react component that can be dragged and placed
class DraggableComponent extends React.Component
{
	constructor(props)
	{
		super(props);

		// Set initial state to a CSS style that is easy to manipulate
		// We need the top and left fields to be numeric types
		// so the motion calculations will work
		this.state = {
			position: 'absolute',
			top: document.documentElement.clientHeight / 2,   // Half the page height
			left: document.documentElement.clientWidth / 2   // Half the page width
		};

		// Bind methods to react component
		this.startFollowCursor = this.startFollowCursor.bind(this);
		this.stopFollowCursor = this.stopFollowCursor.bind(this);
		this.followCursor = this.followCursor.bind(this);

		if (this.props.alwaysfollow)
		{
			this.offsetX = 0;
			this.offsetY = 0;

			document.onmousemove = this.followCursor;
		}
	}

	// Enable/Disable Cursor Tracking
	startFollowCursor(e)
	{
		if (this.props.alwaysfollow)
			return;

		// Get the position of the mouse relative to the node.
		// Useful for motion calculations
		if (e)
		{
			this.offsetX = e.pageX - this.state.left;
			this.offsetY = e.pageY - this.state.top;
		}

		document.onmousemove = this.followCursor;
	}

	stopFollowCursor(e)
	{
		if (this.props.alwaysfollow)
			return;

		document.onmousemove = undefined;
	}

	// Track the cursor. This function is a callback to document.onmousemove
	followCursor(e)
	{
		this.setState({top: e.pageY - this.offsetY, left: e.pageX - this.offsetX});

		if(e.pageY < 0 || e.pageX < 0 || e.pageY > document.documentElement.clientHeight || e.pageX > document.documentElement.clientWidth)
			this.stopFollowCursor();
	}

	render()
	{
		return(
			<div style={this.state} onMouseDown={(e) => this.startFollowCursor(e)} onMouseUp={(e) => this.stopFollowCursor(e)}>
				{this.props.children}
			</div>
		);
	}
}

export default DraggableComponent;
