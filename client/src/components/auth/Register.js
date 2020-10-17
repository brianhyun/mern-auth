import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import classnames from 'classnames';

function Register(props) {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
        errors: {}
    });

    useEffect(() => {
        // If logged in and user navigates to Register page, should redirect them to dashboard
        if (props.auth.isAuthenticated) {
            props.history.push("/dashboard");
        }
    });

    useEffect(() => {
        if (props.errors) {
            setUser({
                ...user,
                errors: props.errors
            });
        }
    }, [props.errors])

    function onChange(event) {
        // Update User Object
        setUser({
            ...user,
            [event.target.id]: event.target.value,
        });
    }

    function onSubmit(event) {
        console.log('form submitted');
        // Prevent Default Form Behavior
        event.preventDefault();

        // Create New User Object
        const newUser = {
            name: user.name,
            email: user.email,
            password: user.password,
            password2: user.password2,
        };

        props.registerUser(newUser, props.history);
    }

    const { errors } = user;

    return (
        <div className="container">
            <div className="row">
                <div className="col s8 offset-s2">
                    {/* Link Back Home */}
                    <Link to="/" className="btn-flat waves-effect">
                        <i className="material-icons left">
                            keyboard_backspace
                        </i>
                        Back to home
                    </Link>

                    {/* Register Header */}
                    <div
                        className="col s12"
                        style={{ paddingLeft: '11.250px' }}
                    >
                        <h4>
                            <b>Register</b> below
                        </h4>
                        <p className="grey-text text-darken-1">
                            Already have an account?
                            <Link to="/login">Log in</Link>
                        </p>
                    </div>

                    {/* Register Form */}
                    <form noValidate onSubmit={onSubmit}>
                        {/* Name Input */}
                        <div className="input-field col s12">
                            <input
                                onChange={onChange}
                                id="name"
                                value={user.name}
                                error={errors.name}
                                type="text"
                                className={classnames("", {
                                    invalid: errors.name
                                })}
                            />
                            <label htmlFor="name">Name</label>
                            <span className="red-text">{errors.name}</span>
                        </div>

                        {/* Email Input */}
                        <div className="input-field col s12">
                            <input
                                onChange={onChange}
                                value={user.email}
                                error={errors.email}
                                id="email"
                                type="email"
                                className={classnames("", {
                                    invalid: errors.email
                                })}
                            />
                            <label htmlFor="email">Email</label>
                            <span className="red-text">{errors.email}</span>
                        </div>

                        {/* Password Input */}
                        <div className="input-field col s12">
                            <input
                                onChange={onChange}
                                value={user.password}
                                error={errors.password}
                                id="password"
                                type="password"
                                className={classnames("", {
                                    invalid: errors.password
                                })}
                            />
                            <label htmlFor="password">Password</label>
                            <span className="red-text">{errors.password}</span>
                        </div>

                        {/* Password 2 Input */}
                        <div className="input-field col s12">
                            <input
                                onChange={onChange}
                                value={user.password2}
                                error={errors.password2}
                                id="password2"
                                type="password"
                                className={classnames("", {
                                    invalid: errors.password2
                                })}
                            />
                            <label htmlFor="password2">Confirm Password</label>
                            <span className="red-text">{errors.password2}</span>
                        </div>

                        {/* Submit Button */}
                        <div
                            className="col s12"
                            style={{ paddingLeft: '11.250px' }}
                        >
                            <button
                                style={{
                                    width: '150px',
                                    borderRadius: '3px',
                                    letterSpacing: '1.5px',
                                    marginTop: '1rem',
                                }}
                                type="submit"
                                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                            >
                                Sign up
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

/*
    To run typechecking on the props for a component, 
    you can assign the special propTypes property.

    PropTypes exports a range of validators that can be used to 
    make sure the data you receive is valid. In this example, 
    we’re using PropTypes.string. 
    When an invalid value is provided for a prop, 
    a warning will be shown in the JavaScript console. 
    For performance reasons, propTypes is only checked in development mode.
*/ 
Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

/*
    mapStateToProps allows us to grab our state from Redux 
    and map it to props which we can use inside components. 

    This allows us to call props.auth or 
    props.errors within our Register component.
*/
function mapStateToProps(state) {
    return {
        auth: state.auth,
        errors: state.errors
    };
}

export default connect(mapStateToProps, { registerUser })(withRouter(Register));

/*
    What is the withRouter() function?

    The withRouter() function takes in a component and 
    gives the component access to props.history. 

    props.history is an object with properties and functions. 
    It is used for managing session history. 
*/

/*
    What is the connect() function?

    The connect() function connects a React component to a Redux store.
    
    You pass the component you'd like to connect to the Redux store into the connect() function. 
    The function returns a new, connected component class tht wraps the component you passed in. 

    There are four optional parameters you can pass to the connect() function. 

    If a mapStateToProps function is specified, the new wrapper component 
    will subscribe to Redux store updates. This means that any time the store is updated, mapStateToProps will be called.

    The mapStateToProps() function takes in a maximum of two parameters. 
    If your mapStateToProps function is declared as taking one parameter, it will be called whenever the store state changes, and given the store state as the only parameter.
*/