import React, { Component } from "react";
import Rodal from 'rodal';
import { connect } from "react-redux";
import PostListItem from "./PostListItem";
import { asyncFetchAllPosts } from '../actions';
import { LoginModal } from './LoginModal';
import 'rodal/lib/rodal.css';

class PostList extends Component {


	componentDidMount() {
		this.props.asyncFetchAllPosts();
	}

	render() {
		return (
			<div className="mb-0 mt-5">
				{this.props.posts.map((post) => {
					return <PostListItem key={post._id} {...post} />;
				})}
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
