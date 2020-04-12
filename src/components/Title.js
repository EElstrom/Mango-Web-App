import React from 'react';

// Style object used by the component below
const iconStlye = {
    width: '30px'
};

// Stateless components in react are functions that return JSX/HTML code. These are also called "funtional" components
//
// Components in React have two key data fields:
//    - props: static data (not changed after component creation)
//    - state: dynamic data (changed after component creation)
//
// Stateless components only deal with props. We can pass the title and icon into the function as props.

// Stateless 'functional' component
function Title(props)
{
    // Set our title to a default value if one is not defined
    if (!props.text)
        props.text = 'missing text';

    // Set our icon to a default value if one is not defined
    if (!props.icon)
        props.icon = '';

    // Return some JSX/HTML containing the title and icon in props
    return(
        <div>
            <span> {props.text} </span>
            <img src={props.icon} alt='missing_img' style={iconStlye}/>
        </div>
    );
}

// This makes our Title component "importable", so we can import and use it in other files
export default Title;