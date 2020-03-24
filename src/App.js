import React from 'react';

// Import our Login Component
import Login from './components/ExampleStatefulComponent';

// ============================================================================================================
//                                                 Styling
// ============================================================================================================

const pageStyle = {
	position: 'fixed',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	height: '100vh',
	width: '100vw',

	backgroundColor: 'white'
};

// ============================================================================================================
//                                                 Components
// ============================================================================================================

// This stateless component 'App' is the int main() of our UI. We need to include our components here if we want
// them to get rendered

function App(props)
{
	return (
		<div style={pageStyle}>
			<Login /> {/* Include our Login component as the only child on the page */}
		</div>
	);
}

export default App;
