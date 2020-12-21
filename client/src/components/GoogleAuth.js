import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../redux/auth/authTypes';

class GoogleAuth extends React.Component {
	componentDidMount() {
		window.gapi.load('client:auth2', () => {
			window.gapi.client
				.init({
					clientId: '951278972955-qlp9vmm8ecsuprhirqj28233tbsn8vh1.apps.googleusercontent.com',
					scope: 'email'
				})
				.then(() => {
					this.auth = window.gapi.auth2.getAuthInstance();
					this.onAuthChange(this.auth.isSignedIn.get());
					this.auth.isSignedIn.listen(this.onAuthChange);
				});
		});
	}

	onAuthChange = (isSignedIn) => {
		if (isSignedIn) {
			this.props.signIn(this.auth.currentUser.get().getId());
		} else {
			this.props.signOut();
		}
	};

	onLoginClick = () => {
		this.auth.signIn();
	};

	onLogoutClick = () => {
		this.auth.signOut();
	};

	renderAuthButton() {
		if (this.props.isSignedIn === null) {
			return (
				<button className="ui red google button">
					<i className="google icon" />
					Loading...
				</button>
			);
		} else if (this.props.isSignedIn) {
			return (
				<button onClick={this.onLogoutClick} className="ui red google button">
					<i className="google icon" />
					Logout
				</button>
			);
		} else {
			return (
				<button onClick={this.onLoginClick} className="ui red google button">
					<i className="google icon" />
					Login
				</button>
			);
		}
	}

	render() {
		return <div>{this.renderAuthButton()}</div>;
	}
}

const mapStateToProps = (state) => {
	return {
		isSignedIn: state.auth.isSignedIn
	};
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
