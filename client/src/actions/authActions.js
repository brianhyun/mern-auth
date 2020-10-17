import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import {
  GET_ERRORS,
  SET_CURRENT_USER,
  USER_LOADING
} from "./types";

// Register User
export function registerUser(userData, history) {
	return function(dispatch) {
		axios
			.post("/api/users/register", userData)
			.then(res => history.push("/login")) // re-direct to login on successful register
			.catch(err =>
				dispatch({
					type: GET_ERRORS,
					payload: err.response.data
				})
			);
	}
}

// Login - Get User Token 
export function loginUser(userData) {
	return function(dispatch) {
		axios
			.post("/api/users/login", userData) // Returns a JSON Object with JWT
			.then(res => {
				// Save JWT to localStorage
				const { token } = res.data;
				localStorage.setItem("jwtToken", token);

				// Set token to Auth Header
				setAuthToken(token);

				// Decode Token to Get User Data
				const decoded = jwt_decode(token);

				// Set Current User 
				dispatch(setCurrentUser(decoded));4
			})
			.catch(err =>
				dispatch({
					type: GET_ERRORS,
					payload: err.response.data
				})
			);
	}
}

// Set logged in user
export const setCurrentUser = decoded => {
	return {
		type: SET_CURRENT_USER,
		payload: decoded
	};
};

// User loading
export const setUserLoading = () => {
	return {
		type: USER_LOADING
	};
};

// Log User Out
export function logoutUser() {
	return function(dispatch) {
		// Remove JWT Token from Local Storage
		localStorage.removeItem("jwtToken");

		// Remove Auth Header for Future Requests
		setAuthToken(false);

		// Set current user to empty object {} which will set isAuthenticated to false
		dispatch(setCurrentUser({}));
	}
}