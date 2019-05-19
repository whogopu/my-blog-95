import React, { Component } from "react";
import { connect } from "react-redux";
import PostListItem from "./PostListItem";
import { asyncFetchAllPosts } from '../actions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

class PostList extends Component {
	state = {isError: false}
	componentDidMount() {
		this.props.asyncFetchAllPosts()
		.catch(err => {
			this.setState({isError: true})
			this.notifyErr(err)
		})
	}

	notifyInfo = (msg) => toast.info(msg);
	notifyErr = (msg) => toast.error(msg);

	render() {
		let {isError} = this.state;
		return (
			<div className="container mb-0 mt-5">
				<ToastContainer draggable={false} position={toast.POSITION.BOTTOM_RIGHT} />
				{
					isError
					? (<p>Cannot Load Posts</p>)
					: (this.props.posts.map((post) => {
						return <PostListItem notifyErr={this.notifyErr} key={post._id} {...post} />;
					}))
				}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		post: state.postReducer.post,
		posts: state.postReducer.posts
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		asyncFetchAllPosts: () => dispatch(asyncFetchAllPosts())
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PostList);
