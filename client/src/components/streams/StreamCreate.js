import React, { Component } from 'react';

import { connect } from 'react-redux';
import { createStream } from '../../redux/api/apiTypes';
import StreamForm from './StreamForm';

class StreamCreate extends Component {
	onSubmit = (formProps) => {
		this.props.createStream(formProps);
	};

	render() {
		return (
			<div>
				<h3>Create a Stream</h3>
				<StreamForm onSubmit={this.onSubmit} />
			</div>
		);
	}
}

export default connect(null, { createStream })(StreamCreate);
