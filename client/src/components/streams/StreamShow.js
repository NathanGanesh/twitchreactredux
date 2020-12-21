import { render } from '@testing-library/react';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchStream } from '../../redux/api/apiTypes';
class StreamShow extends Component {
	componentDidMount() {
		this.props.fetchStream(this.props.match.params.id);
	}

	render() {
		return (
			<div>
				{this.props.stream !== undefined ? (
					<div>
						<h1>{this.props.stream.title}</h1>
						<h5>{this.props.stream.description}</h5>
					</div>
				) : (
					<h2>loading...</h2>
				)}
			</div>
		);
	}
}
const mapStateToProps = (state, ownProps) => {
	return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream })(StreamShow);
