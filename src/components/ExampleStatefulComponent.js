import React from 'react';

// import our Title component so it can be used in the Login form 
import Title from './ExampleStatelessComponent';

// ============================================================================================================
//                                                 Styling
// ============================================================================================================

// Here are some styling objects. They are included in the Component Object Below

const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
	justifyContent: 'center',
	height: '75vh', // 75% viewport height
    width: '50vh', // 50% viewport height (keeps a fixed ratio of width to height)
    borderRadius: '10px',

    backgroundColor: 'red'
};

const formStyle = {
    textAlign: 'center',
    margin: '10% 0% 0% 0%',
    width: '80%',

    backgroundColor: 'yellow'
};

const inputStyle = {
    borderRadius: '5px',
    margin: '2%',

    width: '90%'
};

const buttonStyle = {
    borderRadius: '15px',
    width: '20%'
};

// ============================================================================================================
//                                                 Components
// ============================================================================================================

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

class Login extends React.Component
{
    constructor(props)
    {
        super(props); // super-class constructor must be called here

        // initialize object state
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
        event.preventDefault(); // Prevent page from refreshing

        // attempt to login the user by making an API call here (see API Documentation in GitHub Wiki)
        //...

        // Update state. This changes the message and re-renders the component
        this.setState({message: 'email: "' + this.state.email.value + '", password: "' + this.state.password.value + '"'})
    }

    render()
    {
        return(
            <div style={containerStyle}>

                {/* Our Title component */}
			    <Title title='Generic Login' icon='/mango.png'/> {/* we pass in title props here */}

                {/* A login form */}
                <form onSubmit={this.login} style={formStyle}> {/* call the login method on form submit */}
                    <input type='text' placeholder='email' style={inputStyle} ref={(value) => this.state.email = value}/> <br /> {/* Lambda function 'ref' used to update state with current values */}
                    <input type='password' placeholder='password' style={inputStyle} ref={(value) =>  this.state.password = value}/> <br /> {/* Lambda function 'ref' used to update state with current values */}
                    <input type="submit" value="Sign In" style={buttonStyle}/>
                </form>

                {/* A span with a state-controlled message */}
                <span> {this.state.message} </span> {/* we have a little message here to demonstrate state */}

            </div>
        );
    }
}

// This makes our Login component "importable", so we can import and use it in other files
export default Login;