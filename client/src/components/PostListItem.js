import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

// import { deletePost } from "../actions/postActions";
import { asyncFetchAllPosts } from "../actions";

class PostListItem extends Component {
	onClickRemoveHandler = (event) => {
		this.props.deletePost(this.props._id);
	};

	render() {
		return (
			<div className="card my-4">
				<Link  to={`/posts/${this.props._id}`}>
					<h3 className="card-header">{this.props.title}</h3>
				</Link>

				<p className="ml-2">by {this.props.author.name}</p>
				<div className="card-body">
					<p className="card-text">{this.props.body}</p>
					{this.props.authUser.username === this.props.author.username
						? (
								<div className="btn-group" role="group" aria-label="Basic example">
									<Link className="btn btn-danger" onClick={this.onClickRemoveHandler}>
										Delete
									</Link>
									<Link className="btn btn-success" to={`/edit/${this.props._id}`}>
										Edit
									</Link>

								</div>
						)
						: null
					}
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
		deletePost: (_id) => dispatch(asyncFetchAllPosts(_id))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PostListItem);
