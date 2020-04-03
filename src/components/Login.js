import React from 'react';

// Stateful components in React are classes with lifecycle methods. Here are the important ones:
//
//    render() -> returns JSX/HTML code representing the final layout, much like the stateless "functional" component
//    constructor(props) -> a constructor for the object. Lets you initialize state and props
//
// Components in React have two key data fields:
//    - props: static data (not changed after component creation)
//    - state: dynamic data (changed after component creation)
//
// Stateful Components use both props and state to support dynamic UI.
//
// In order to use state to make components dynamic, the state field should be initialized in the constructor.
// you can change the state and force the component to update by calling this.setState(new_state_object).

// Stateful Component
class Login extends React.Component
{
    constructor(props)
    {
        super(props); // super-class constructor must be called here

        // initialize state object
        this.state = {
            email: '',
            password: '',
            message: ''
        };
    }


    // We can add 'extra' class methods to support our use case.
    // This method is 'async', meaning that it runs on it's own thread (UI does not wait for it)
    login = async event =>
    {
        event.preventDefault();

        // TODO Make API Call Here (See API Specs on GitHub Wiki)

        // Update the component state and re-render the component
        this.setState({message: this.state.email.value + ' ' + this.state.password.value});
    }

    render()
    {
        return(
            <div>

                <form onSubmit={this.login}> {/* call the login async function on submit */}
                    <input type='text' placeholder='email' ref={(value) => this.state.email = value}/>
                    <input type='password' placeholder='password' ref={(value) => this.state.password = value}/>
                    <input type='submit' value='Sign In'/>
                </form>

                {/* A span with a state-controlled message */}
                <span>{this.state.message}</span>

            </div>
        );
    }
}

// This makes our Login component "importable", so we can import and use it in other files
export default Login;