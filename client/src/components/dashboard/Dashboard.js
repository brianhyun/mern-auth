import React from "react";

import PropTypes from "prop-types";
// To set the types for each property. 

import { connect } from "react-redux";
// Connects React components to Redux store. 

import { logoutUser } from "../../actions/authActions";
// Import logoutUser() action. 

function Dashboard(props) {
	function onLogoutClick(event) {
		// Prevent Default Behavior for Form
		event.preventDefault();
		
		// Call logoutUser() action. 
		props.logoutUser();
	}

	// Object Destructure User Property from Auth 
	const { user } = props.auth; 

	const buttonStyle = {
		width: "150px",
		borderRadius: "3px",
		letterSpacing: "1.5px",
		marginTop: "1rem"
	};

	return (
		<div style={{ height: "75vh" }} className="container valign-wrapper">
		  <div className="row">
			<div className="col s12 center-align">
				{/* Header */}
				<h4>
					{/* Grab User's First Name */}
					<b>Hey there,</b> {user.name.split(" ")[0]} 
					<p className="flow-text grey-text text-darken-1">
						You are logged into a full-stack <span style={{ fontFamily: "monospace" }}>MERN</span> app 👏
					</p>
				</h4>

				{/* Logout Button */}
				<button
					style={buttonStyle}
					onClick={onLogoutClick}
					className="btn btn-large waves-effect waves-light hoverable blue accent-3"
				>
					Logout
				</button>
			</div>
		  </div>
		</div>
	);
}

// Establish Types for Props
Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

// Connect State to Props 
const mapStateToProps = state => ({
  auth: state.auth
});

// Connect Dashboard Component to Redux Store 
// Pair Store Data to Prop Name and Import Appropriate Actions 
export default connect(mapStateToProps, { logoutUser })(Dashboard);