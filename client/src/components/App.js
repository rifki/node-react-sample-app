import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import SurveyNew from './surveys/SurveyNew';

class App extends Component {
	componentDidMount() {
		this.props.fetchUser();
	}
	render() {
		return (
			<div className="">
				<BrowserRouter>
					<div className="">
						<Header />
						<div className="container" style={{ marginTop:'20px' }}>
							<Route path="/" exact component={Landing} />
							<Route path="/surveys" component={Dashboard} />
							<Route path="/surveys/new" exact component={SurveyNew} />
						</div>
					</div>
				</BrowserRouter>
			</div>
		);
	}
}

export default connect(null, actions)(App);
