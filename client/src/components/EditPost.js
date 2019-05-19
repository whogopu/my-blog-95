import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { asyncFetchSinglePost } from "../actions";

class EditPost extends Component {
	state = {
		title: "",
		body: "",
		_id: "",
		redirect: false,
		redirectTo: null
	};

	componentDidMount() {
		console.log('path2', this.props.match)
		if(!this.props.authUser.username){
			this.setState({
				redirect: true,
				redirectTo: this.props.match.url
			})
		} else {
			const _id = this.props.match.params.id;
			this.props.asyncFetchSinglePost(_id);
		}

	}

	static getDerivedStateFromProps(props, state) {
		if (props.post._id !== state._id) {
			return props.post;
		} else {
			return null;
		}
	}

	onFormSubmit = (event) => {
		event.preventDefault();

		const updatedData = { post: { ...this.state } };
		this.props.updatePost(updatedData).then((response) => {
			console.log(response.message);
			this.setState({ redirect: true });
		});
	};

	render() {

		let {redirect, redirectTo} = this.state;

		if ( redirect && redirectTo){
			return <Redirect to={`/login?redirect=${redirectTo}`} />;
		}

		if (redirect) {
			return <Redirect to={`/posts/${this.state._id}`} />;
		}

		return (
			<div className="card my-4 mt-5">
				<h3 className="card-header">Edit Post</h3>
				<div className="card-body">
					<form onSubmit={this.onFormSubmit}>
						<div className="form-group">
							<label htmlFor="title">Title</label>
							<input
								type="text"
								id="title"
								className="form-control"
								placeholder="Enter Title"
								value={this.state.title}
								onChange={(e) => this.setState({ title: e.target.value })}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="body">Body</label>
							<textarea
								rows="5"
								type="text"
								id="body"
								className="form-control"
								placeholder="Enter Body"
								value={this.state.body}
								onChange={(e) => this.setState({ body: e.target.value })}
							/>
						</div>

						<button type="submit" className="btn btn-primary">
							Submit
						</button>
					</form>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		post: state.postReducer.post,
		posts: state.postReducer.posts,
		authUser: state.authReducer.user
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		asyncFetchSinglePost: (_id) => dispatch(asyncFetchSinglePost(_id)),
		updatePost: (updatedData) => dispatch(asyncFetchSinglePost(updatedData))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EditPost);
