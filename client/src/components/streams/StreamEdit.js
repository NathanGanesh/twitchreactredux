import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editStream, fetchStream } from '../../redux/api/apiTypes';
import StreamForm from './StreamForm';
import _ from 'lodash';

class StreamEdit extends Component {
	componentDidMount() {
		this.props.fetchStream(this.props.match.params.id);
	}
	onSubmit = (formValues) => {
		this.props.editStream(this.props.match.params.id, formValues);
	};

	render() {
		console.log(this.props);
		return (
			<div>
				<h3>edit a stream</h3>
				{this.props.stream !== undefined ? (
					<StreamForm
						initialValues={_.pick(this.props.stream, 'title', 'description')}
						onSubmit={this.onSubmit}
					/>
				) : (
					<h4>loading...</h4>
				)}
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { editStream, fetchStream })(StreamEdit);
