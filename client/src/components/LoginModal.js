import React, { Component } from "react";
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';

class LoginModal extends Component {

	render() {
		return (
				<Rodal visible={this.props.visible} onClose={this.props.hideModal}>
						<div>Login Please</div>
				</Rodal>
		);
	}
}

export default LoginModal;
