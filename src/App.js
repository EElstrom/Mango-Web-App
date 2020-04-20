import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import './App.css';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
// import SettingsPage from './pages/SettingsPage';
// import ResetPasswordPage from './pages/ResetPasswordPage';

// Import our components so they can be used in the application
import Title from './components/Title';
import Login from './components/Login';

// This component is the 'int main()' of our web app: the main entry point
function App(props)
{
	// this.state = {loggedIn = 'false'};

	// update = () =>
	// {
    //     this.setState({loggedIn: 'true'});
	// }
	
	return (
		<Router>
			<Switch>
				<Route style={{position: 'fixed', width: '100vw', height: '100vh'}} path="/" exact>
					{/* {(this.state.loggedIn) ? <HomePage /> : <LoginPage />} */}
					<LoginPage />
				</Route>

				<Route path="/home" exact>
					<HomePage />
				</Route>

				<Route path="/login" exact>
					<LoginPage />
				</Route>

				<Route path="/register" exact>
					<RegisterPage />
				</Route>

				<Redirect to="/" />
			</Switch>
		</Router>
	);
}

export default App;
