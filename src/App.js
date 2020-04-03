import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

// App.css is included in all components, because this file is the root of the project
import './App.css'

// Import our components so they can be used in the application
import Title from './components/Title';
import Login from './components/Login';

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

				<Route path='/title' exact>
					<Title text='mango' icon='/mango.png'/>
				</Route>

				<Route path='/login' exact>
					<Login />
				</Route>

				<Redirect to='/test' />
				
			</Switch>
		</BrowserRouter>
	);
}

export default App;
