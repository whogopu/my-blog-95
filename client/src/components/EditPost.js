import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { asyncFetchSinglePost } from "../actions";

class EditPost extends Component {
	state = {
		title: "",
		body: "",
		_id: "",
		redirect: false
	};

	componentDidMount() {
		const _id = this.props.match.params.id;
		this.props.asyncFetchSinglePost(_id)
		.then(data => {
			if(data.post){
				this.setState({
					title: data.post.title,
					body: data.post.body,
					_id: data.post._id
				})
			}
		})

	}

	onFormSubmit = (event) => {
		event.preventDefault();

		const updatedData = { post: { ...this.state } };
		this.props.updatePost(updatedData).then((response) => {
			this.setState({ redirect: true });
		});
	};

	render() {

		let {redirect} = this.state;

		if (redirect) {
			return <Redirect to={`/posts/${this.state._id}`} />;
		}

		return (
			<div className="container" >
				<div className="card my-4 mt-5 shadow-sm">
					<h3 className="card-header text-center">EDIT POST</h3>
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

							<div className="float-right">
								<button type="submit" className="btn btn-primary">
									Submit
								</button>
							</div>
						</form>
					</div>
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
