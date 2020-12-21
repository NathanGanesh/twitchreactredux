import { render } from '@testing-library/react';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchStream } from '../../redux/api/apiTypes';
import flv from 'flv.js';
class StreamShow extends Component {
	constructor(props) {
		super(props);

		this.videoRef = React.createRef();
	}

	componentDidMount() {
		this.props.fetchStream(this.props.match.params.id);
		this.builderPlayer();
	}

	componentDidUpdate() {
		this.builderPlayer();
	}

	componentWillUnmount() {
		this.player.destroy();
	}

	builderPlayer() {
		if (this.player || !this.props.stream) {
			return;
		}
		this.player = flv.createPlayer({
			type: 'flv',
			url: `http://localhost:8000/live/${this.props.match.params.id}.flv`
		});
		this.player.attachMediaElement(this.videoRef.current);
		this.player.load();
	}

	render() {
		return (
			<div>
				{this.props.stream !== undefined ? (
					<div>
						<h1>{this.props.stream.title}</h1>
						<h5>{this.props.stream.description}</h5>
						<video ref={this.videoRef} style={{ width: '100%' }} controls={true} />
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
