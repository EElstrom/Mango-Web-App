import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import './App.css';

import MangoIcon from './components/MangoIcon';
// import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
// import RegisterPage from './pages/RegisterPage';
// import SettingsPage from './pages/SettingsPage';
// import ResetPasswordPage from './pages/ResetPasswordPage';

function App()
{
	return (
		<Router>
			<Switch>
				<Route style={{position: 'fixed', width: '100vw', height: '100vh'}} path="/" exact>
					<MangoIcon />
				</Route>

				<Route path="/login" exact>
					<LoginPage />
				</Route>

				<Redirect to="/" />
			</Switch>
		</Router>
	);
}

export default App;
