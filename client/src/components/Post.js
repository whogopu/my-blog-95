import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
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

		if(!this.props.post) return null;

		let {title, body, author={}, publishDate, _id} = this.props.post
		console.log('post2',this.props.post )

		return (
			<div className="container">
				<div className="card mb-3 mt-3 shadow-sm" style={{"width": "48rem"}}>
					<div className="card-body">
							<h5 className="card-title font-weight-bold" style={{ textDecoration: 'none', color: "rgba(0,0,0,0.84)" }}>{title}</h5>
						<span className="card-subtitle mb-2 text-muted">{new Date(publishDate).toLocaleDateString()}</span>
						<span className="m-1">&#183;</span>
						<span className="card-subtitle mb-2 text-muted">{author.name}</span>
						<br/>
						<br/>
						<p className="card-text">{body}</p>

						{this.props.authUser.username === author.username
							? (
									<div className="float-right" role="group" aria-label="Basic example">
										<button className="btn btn-outline-danger mr-2" onClick={this.onClickRemoveHandler}>
											Delete
										</button>
										<Link className="btn btn-outline-primary" to={`/edit/${_id}`}>
												Edit
										</Link>
									</div>
							)
							: null
						}
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
		posts: state.postReducer.posts,
		authUser: state.authReducer.user
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
