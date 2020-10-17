import React from 'react';
import { Link } from 'react-router-dom';

function Landing() {
    const linkStyles = {
        width: '140px',
        borderRadius: '3px',
        letterSpacing: '1.5px',
    };

    return (
        <div style={{ height: '75vh' }} className="container valign-wrapper">
            <div className="row">
                <div className="col s12 center-align">
                    <h4>
                        <b>Build</b> a login/auth app with the MERN stack from scratch
                    </h4>
                    <p className="flow-text grey-text text-darken-1">
                        Create a (minimal) full-stack app with user authentication via passport and JWTs
                    </p>
                    <br />
                    
                    {/* Register Link */}
                    <div className="col s6">
                        <Link
                            to="/register"
                            style={linkStyles}
                            className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                        >
                            Register
                        </Link>
                    </div>

                    {/* Login Link */}
                    <div className="col s6">
                        <Link
                            to="/login"
                            style={linkStyles}
                            className="btn btn-large btn-flat waves-effect white black-text"
                        >
                            Log In
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Landing;
