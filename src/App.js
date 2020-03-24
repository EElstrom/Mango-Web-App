import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

// This component is the 'int main()' of our web app: the main entry point
function App(props)
{
	// BrowserRouter lets us select a page to display based on the url path. Works like a C switch
	return (
		<BrowserRouter>
			<Switch>

				<Route path='/test' exact>
					<div>Hello World</div>
				</Route>

				<Redirect to='/test' />
				
			</Switch>
		</BrowserRouter>
	);
}

export default App;
