import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { truncate } from 'lodash';
import { asyncDeletePost } from "../actions";

class PostListItem extends Component {

	onClickRemoveHandler = (event) => {
		this.props.asyncDeletePost(this.props._id)
		.catch(err => {
			this.props.notifyErr(err)
		})
	};

	render() {
		let {title, body, _id, publishDate, author={}, authUser} = this.props;

		title = truncate(title, {'length': 70})
		body = truncate(body, {'length': 150})

		return (
			<div className="card mb-3 shadow-sm" style={{"width": "48rem"}}>
				<div className="card-body">
					<Link  to={`/posts/${_id}`} style={{ textDecoration: 'none', color: "rgba(0,0,0,0.84)" }}>
						<h5 className="card-title font-weight-bold">{title}</h5>
					</Link>
					<p className="card-text">{body}</p>
					<span className="card-subtitle mb-2 text-muted">{new Date(publishDate).toLocaleDateString()}</span>
					<span className="m-1">&#183;</span>
					<span className="card-subtitle mb-2 text-muted">{author.name}</span>
					<br/>
					{authUser.username === author.username
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
		asyncDeletePost: (_id) => dispatch(asyncDeletePost(_id))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PostListItem);
