import React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';

// Redux
import { Provider } from 'react-redux';
import store from './store';

// Components
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import PrivateRoute from './components/private-route/PrivateRoute';
import Dashboard from './components/dashboard/Dashboard';

// Keep the user logged in if a token is present. 
// A token will be absent if the token has expired or the user has logged out. 
if (localStorage.jwtToken) {
    // Set Authorization Header with Token 
        // We store the JWT in localStorage so that we can just check 
        // the storage to see whether or not to keep the user logged in.  
    const token = localStorage.jwtToken;
    setAuthToken(token);

    // Decode Token to Retrieve User Information
    const decoded = jwt_decode(token);
    // Set Current User and Status of isAuthenticated
    store.dispatch(setCurrentUser(decoded));

    // Check For Expired Token
    const currentTime = Date.now() / 1000; // to get in milliseconds
    if (decoded.exp < currentTime) {
      // Logout User
      store.dispatch(logoutUser());
      
      // Redirect to Login
      window.location.href = "./login";
    }
}

function App() {
    return (
        <Provider store={store}>
            <Router>
                <div className="App">
                    <Navbar />
                    <Route exact path="/" component={Landing} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/login" component={Login} />
                    <Switch>
                        <PrivateRoute exact path="/dashboard" component={Dashboard} />
                    </Switch>
                </div>
            </Router>
        </Provider>
    );
}

/* 
    <Provider> provides store data to all components enclosed within its tags. 

    <Router> allows you to create <Route> tags. 
*/

export default App;
