import React, { Component } from 'react';

class MainPage extends Component {
	
	constructor(props){
		super(props);
	}

	render() {
		console.log('Main Page', this.props);
		// const {articles, search, saveArticle} = this.props;
		return (
			<div className="MainPage">
				<div className="row">
					<h2 className="text-center">The NYT Scraper</h2>
					<p className="text-center"><em>A News Finder App </em></p>
				</div>
			</div>
		);

	}
}
export default MainPage;