import React, { Component } from "react";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import AddPost from "../components/AddPost";
import EditPost from "../components/EditPost";
import Post from "../components/Post";
import PostList from "../components/PostList";
import Header from "../components/Header";
import Login from "../components/Login";
import NotFoundPage from "../components/NotFoundPage";
import setAuthToken from "../config/setAuthToken";
import jwt from "jsonwebtoken";
import { Redirect } from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
			console.log('hello', props )
      let token = localStorage.getItem("token");
      let decoded = jwt.decode(token);
      if (token && decoded) {
        setAuthToken(token);
        return <Component {...props} />;
      } else {
        return <Redirect to={{
					pathname: "/login",
					state: { from: props.location }
				}} />;
      }
    }}
  />
);

class AppRouter extends Component {
	render() {
		return (
			<BrowserRouter>
				<div className="pt-5 p-4 mt-2">
					<Header/>
					<Switch>
						<Route path="/" component={PostList} exact={true} />
						<Route path="/login" component={Login} />
						<Route path="/posts" component={PostList} exact={true} />
						<Route path="/posts/:id" component={Post} />
						<PrivateRoute path="/add" component={AddPost} />
						<PrivateRoute path="/edit/:id" component={EditPost} />
						<Route component={NotFoundPage} />
					</Switch>
				</div>
			</BrowserRouter>
		);
	}
}

export default AppRouter;
