import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class StreamForm extends Component {
	renderError = ({ error, touched }) => {
		if (touched && error) {
			return <div>{error}</div>;
		}
	};

	renderInput = ({ input, label, meta }) => {
		return (
			<div>
				<label>{label}</label>
				<input {...input} />
				{this.renderError(meta)}
			</div>
		);
	};
	onSubmit = (formValues) => {
		this.props.onSubmit(formValues);
	};

	render() {
		return (
			<form onSubmit={this.props.handleSubmit(this.onSubmit)}>
				<Field name="title" label="enter title" component={this.renderInput} />
				<Field name="description" label="enter description" component={this.renderInput} />
				<button>submit</button>
			</form>
		);
	}
}

const validate = (formValues) => {
	const errors = {};
	if (!formValues.title) {
		errors.title = 'your must enter a title';
	}

	if (!formValues.description) {
		errors.description = 'no description';
	}

	return errors;
};

export default reduxForm({ form: 'streamForm', validate })(StreamForm);
