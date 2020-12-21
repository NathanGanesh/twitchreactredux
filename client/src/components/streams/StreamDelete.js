import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteStream, fetchStream } from '../../redux/api/apiTypes';
import Modal from '../Modal';
import history from '../../history';
import _ from 'lodash';

class StreamDelete extends Component {
	componentDidMount() {
		this.props.fetchStream(this.props.match.params.id);
	}

	renderActions() {
		return (
			<React.Fragment>
				<button onClick={() => this.props.deleteStream(this.props.match.params.id)}>delete</button>
				<button onClick={() => history.push('/')}>cancel</button>
			</React.Fragment>
		);
    }
    
   

	render() {
		return (
			<div>
				{this.props.stream !== undefined ? (
					<Modal
						initialValues={_.pick(this.props.stream, 'title', 'description')}
						actions={this.renderActions()}
						onDismiss={() => history.push('/')}
					/>
				) : (
					<h3>Loading...</h3>
				)}
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { deleteStream, fetchStream })(StreamDelete);
