import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import './App.css';

import MangoIcon from './components/MangoIcon';
import Login from './pages/Login';

function App()
{
	return (
		<Router>
			<Switch>
				<Route style={{position: 'fixed', width: '100vw', height: '100vh'}} path="/" exact>
					<MangoIcon />
				</Route>
				<Route path="/login" exact>
					<Login />
				</Route>
				<Redirect to="/" />
			</Switch>
		</Router>
	);
}

export default App;
