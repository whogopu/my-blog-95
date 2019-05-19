import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { asyncFetchSinglePost, asyncUpdatePost } from "../actions";
import { ToastContainer, toast } from 'react-toastify';

class EditPost extends Component {
	state = {
		title: "",
		body: "",
		_id: "",
		redirect: false,
		isError: false
	};

	componentDidMount() {
		const _id = this.props.match.params.id;
		this.props.asyncFetchSinglePost(_id)
		.then(data => {
			if(data.post){
				if(data.post.author.username === this.props.authUser.username) {
					this.setState({
						title: data.post.title,
						body: data.post.body,
						_id: data.post._id
					})
				} else {
					this.setState({
						redirect: true,
						_id: data.post._id
					})
				}

			}
		})
		.catch(err => {
			this.setState({isError: true})
			this.notifyErr(err)
		})
	}

	notifyInfo = (msg) => toast.info(msg);
	notifyErr = (msg) => toast.error(msg);

	onFormSubmit = (event) => {
		event.preventDefault();
		let { title, body, _id } = this.state;
		const updatedData = { title, body };
		this.props.asyncUpdatePost(_id, updatedData)
		.then((response) => {
			this.setState({ redirect: true });
		})
		.catch(err => {
			this.notifyErr(err)
		})
	};

	render() {

		let {redirect, isError} = this.state;

		if (redirect) {
			return <Redirect to={`/posts/${this.state._id}`} />;
		}

		return (
			<div className="container" >
				<div className="card my-4 mt-5 shadow-sm">
					{
						isError
						? (<p className="p-3">Cannot Load Post</p>)
						: (
							<div>
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

										<div className="float-right mb-3">
											<button type="submit" className="btn btn-primary">
												Submit
											</button>
										</div>
									</form>
								</div>
							</div>
						)
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
		asyncUpdatePost: (id, updatedData) => dispatch(asyncUpdatePost(id, updatedData))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EditPost);
