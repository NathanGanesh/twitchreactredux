import React from 'react';
import ReactDOM from 'react-dom';

const Modal = (props) => {
	console.log(props);
	return ReactDOM.createPortal(
		<div style={{ backgroundColor: 'orange', height: '450px' }} onClick={props.onDismiss}>
			<div onClick={(e) => e.stopPropagation()} style={{ backgroundColor: 'blue', height: '125px' }}>
				<h2>{props.initialValues.title}</h2>
				<h3>{props.initialValues.description}</h3>
				{props.actions}
			</div>
		</div>,
		document.querySelector('#modal')
	);
};

export default Modal;
