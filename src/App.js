import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import './App.css';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Settings from './pages/Settings';

function App()
{
	return (
		<Router>
			<Switch>
				<Route style={{position: 'fixed', width: '100vw', height: '100vh'}} path="/" exact>
					<Home />
				</Route>

				<Route path="/login" exact>
					<Login />
				</Route>

				<Route path="/register" exact>
					<Register />
				</Route>

				<Route path="/settings" exact>
					<Settings />
				</Route>

				<Redirect to="/" />
			</Switch>
		</Router>
	);
}

export default App;
