import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import classnames from 'classnames';

function Login(props) {
    const [user, setUser] = useState({
        email: '',
        password: '',
        errors: {},
    });

    // On Component Mount
    useEffect(() => {
        // If logged in and user navigates to Register page, should redirect them to dashboard
        if (props.auth.isAuthenticated) {
            props.history.push("/dashboard");
        }
    });

    useEffect(() => {
        if (props.auth.isAuthenticated) {
            props.history.push("/dashboard");
        }

        if (props.errors) {
            setUser({
                ...user,
                errors: props.errors
            });
        }
    }, [props])
    
    function onChange(event) {
        setUser({
            ...user,
            [event.target.id]: event.target.value,
        });
    }

    function onSubmit(event) {
        event.preventDefault();

        const userData = {
            email: user.email,
            password: user.password,
        };

        props.loginUser(userData); 
    }

    const { errors } = user; 

    return (
        <div className="container">
            <div style={{ marginTop: '4rem' }} className="row">
                <div className="col s8 offset-s2">
                    {/* Link Back Home */}
                    <Link to="/" className="btn-flat waves-effect">
                        <i className="material-icons left">
                            keyboard_backspace
                        </i>
                        Back to home
                    </Link>

                    {/* Login Header */}
                    <div
                        className="col s12"
                        style={{ paddingLeft: '11.250px' }}
                    >
                        <h4>
                            <b>Login</b> below
                        </h4>
                        <p className="grey-text text-darken-1">
                            Don't have an account?
                            <Link to="/register">Register</Link>
                        </p>
                    </div>

                    {/* Login Form */}
                    <form noValidate onSubmit={onSubmit}>
                        {/* Email Input */}
                        <div className="input-field col s12">
                            <input
                                onChange={onChange}
                                value={user.email}
                                error={errors.email}
                                id="email"
                                type="email"
                                className={classnames("", {
                                    invalid: errors.email || errors.emailnotfound
                                })}
                            />
                            <label htmlFor="email">Email</label>
                            <span className="red-text">
                                {errors.email}
                                {errors.emailnotfound}
                            </span>
                        </div>

                        {/* Password Input */}
                        <div className="input-field col s12">
                            <input
                                onChange={onChange}
                                value={user.password}
                                id="password"
                                type="password"
                                className={classnames("", {
                                    invalid: errors.password || errors.passwordincorrect
                                })}
                            />
                            <label htmlFor="password">Password</label>
                            <span className="red-text">
                                {errors.password}
                                {errors.passwordincorrect}
                            </span>
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
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired, 
    auth: PropTypes.object.isRequired, 
    errors: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        auth: state.auth, 
        errors: state.errors   
    };
};

export default connect(mapStateToProps, { loginUser })(Login);