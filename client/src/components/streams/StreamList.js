import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchStreams } from '../../redux/api/apiTypes';
import { Link } from 'react-router-dom';
function StreamList({ fetchStreams, streams, currentUserId }) {
	useEffect(() => {
		fetchStreams();
	}, []);

	const renderAdmin = (stream) => {
		if (stream.userId === currentUserId) {
			return (
				<div>
					<button>
						<Link to={`/streams/delete/${stream.id}`}>DELETE</Link>
					</button>
					<button>
						<Link to={`/streams/edit/${stream.id}`}>EDIT</Link>
					</button>
				</div>
			);
		}
	};

	return (
		<div>
			{streams.length !== 0 &&
				streams.map((item) => {
					return (
						<div key={item.id}>
							<Link to={`/streams/${item.id}`}>
								<h2>{item.title}</h2>
							</Link>

							<h4>{item.description}</h4>
							<div>{renderAdmin(item)}</div>
						</div>
					);
				})}
		</div>
	);
}

const mapStateToProps = (state) => {
	return { streams: Object.values(state.streams), currentUserId: state.auth.userId };
};

export default connect(mapStateToProps, { fetchStreams })(StreamList);
