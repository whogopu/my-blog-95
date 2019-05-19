import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { asyncFetchSinglePost, asyncDeletePost } from '../actions'
import { ToastContainer, toast } from 'react-toastify';

class Post extends Component {
	state = {isError: false};

	componentDidMount() {
		const _id = this.props.match.params.id;
		this.props.asyncFetchSinglePost(_id)
		.catch(err => {
			this.setState({isError: true})
			this.notifyErr(err)
		})
	}

	notifyInfo = (msg) => toast.info(msg);
	notifyErr = (msg) => toast.error(msg);

	onClickRemoveHandler = (event) => {
		this.props.asyncDeletePost(this.props.post._id);
		this.setState({ redirect: true });
	};


	render() {
		if (this.state.redirect) {
			return <Redirect to="/posts" />;
		}

		if(!this.props.post) return null;

		let {title, body, author={}, publishDate, _id} = this.props.post
		let { isError } = this.state

		return (
			<div className="container">
				<div className="card mb-3 mt-3 shadow-sm" style={{"width": "48rem"}}>
					{
						isError
						? (<p className="p-3">Cannot Load Post</p>)
						: (<div className="card-body">
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
				</div>)
					}
				</div>
				<ToastContainer draggable={false} position={toast.POSITION.BOTTOM_RIGHT} />
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
		asyncDeletePost: (_id) => dispatch(asyncDeletePost(_id))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Post);
