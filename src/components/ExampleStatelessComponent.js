import React from 'react';

// ============================================================================================================
//                                                 Styling
// ============================================================================================================

const containerStyle = {
    textAlign: 'center',
    backgroundColor: 'blue'
};

const titleStyle = {
    display: 'inline-block',
    fontFamily: 'Nunito',
    fontWeight: 'bold',
    fontSize: '30pt'
};

const iconStyle = {
    display: 'inline-block',
    height: '30px'
};

// ============================================================================================================
//                                                  Components
// ============================================================================================================

// Stateless components in react are functions that return JSX/HTML code. These are also called "funtional" components
//
// Components in React have two key data fields:
//    - props: static data (not changed after component creation)
//    - state: dynamic data (changed after component creation)
//
// Stateless components only deal with props. We can pass the title and icon into the function as props.

function Title(props) // props here should contain "title" and "icon" fields. These become our component props
{
    // Set our title to a default value if one is not defined
    if (!props.title)
        props.title = 'missing_title';

    // Set our icon to a default value if one is not defined
    if (!props.icon)
        props.icon = '';

    // Return some JSX/HTML containing the title and icon in props
    return (
        <div style={containerStyle}>
            <span style={titleStyle}> {props.title} </span>
            <img src={props.icon} alt='missing_icon' style={iconStyle}/> {/* images can be found in the /public/ folder of the project */}
        </div>
    );
}

// This makes our Title component "importable", so we can import and use it in other files
export default Title;