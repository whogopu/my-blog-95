import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

// import { changeSelectedPost, deletePost } from "../actions/postActions";
import { asyncFetchSinglePost } from '../actions'

class Post extends Component {
	state = {};

	componentDidMount() {
		const _id = this.props.match.params.id;
		this.props.asyncFetchSinglePost(_id);
	}

	onClickRemoveHandler = (event) => {
		this.props.deletePost(this.props.post._id);
		this.setState({ redirect: true });
	};

	render() {
		if (this.state.redirect) {
			return <Redirect to="/posts" />;
		}

		console.log('post', this.props.post)

		return (
			<div className="card my-4 mt-5">
				<h3 className="card-header">{this.props.post.title}</h3>
				<div className="card-body">
					<h6>ID {this.props.post._id}</h6>
					<p className="ml-2">by {this.props.post.author ? this.props.post.author.name : ""}</p>
					<p>{this.props.post.body}</p>

					<div className="btn-group" role="group" aria-label="Basic example">
						<button className="btn btn-danger" onClick={this.onClickRemoveHandler}>
							Delete
						</button>
						<Link className="btn btn-success" to={`/edit/${this.props.post._id}`}>
							Edit
						</Link>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	console.log(state.postReducer)
	return {
		post: state.postReducer.post,
		posts: state.postReducer.posts
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		asyncFetchSinglePost: (_id) => dispatch(asyncFetchSinglePost(_id)),
		deletePost: (_id) => dispatch(asyncFetchSinglePost(_id))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Post);
