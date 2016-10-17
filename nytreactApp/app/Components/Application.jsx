import React, { Component, cloneElement } from 'react';
import helpers from '../helpers';
import {Link} from 'react-router';
import ArticleList from './ArticleList';
import History from './History';
 
class Application extends Component {

	constructor(props){
		super(props);

		this.saveArticle = this.saveArticle.bind(this);
		this.setSearch = this.setSearch.bind(this);

		this.state = {
			search: '',

			article: '',

			savedArticles: [],

			articles: []
		}
	}

	setSearch(search){
		this.setState({search:search})
	}
	
	deleteArticle() {
		helpers.deleteArticle()
			.then(function(response) {
				console.log('from server: ', response);
				this.setState({search:''});
			}.bind(this))
	}
	saveArticle(article) {
		console.log('saveArticle', article);
		console.log('saveArticle - Application');
		helpers.postArticle(article)
			.then(function(data){
				console.log('after mongodb')
				helpers.getArticle()
					.then(function(response){
						if (response !== this.state.savedArticles){
							console.log ("saveArticle-getArticle", response.data);
							this.setState({	savedArticles: response.data })
						}
					}.bind(this))
			}.bind(this))
	}

	componentDidUpdate(prevProps, prevState) {
		if(prevState.search != this.state.search){
			helpers.fetchArticles(this.state.search)
				.then(function(data){
					if (data !== this.state.articles){
						console.log('componentDidUpdate - Application');
						this.setState({ articles: data })		
					}
					this.setState({search:''})
				}.bind(this))
			
		}
	}

	componentDidMount() {
		// Update with saved 'Articles'
		console.log('componentDidMount');
		helpers.getArticle()
			.then(function(response){
					console.log ("savedArticles - componentDidMount", response.data);
					this.setState({ savedArticles: response.data })
		}.bind(this))
	}

	render() {
		const { children } = this.props;
		const { articles, savedArticles } = this.state;

		return (
				<div className="Application">
					<br/>
					<div className="menu well text-center">
							<h1 className="text-center">N Y T React</h1>
							<Link to="/" activeClassName="active"> Home </Link>
							<Link to="/search" activeClassName="active"> Search </Link>
							<Link to="/saved" activeClassName="active"> Saved </Link>
							<br/><br/>
							<button className="btn btn-danger" onClick={this.deleteArticle}> *Delete Saved Articles Forever* </button>
					</div>
					<div className="content well">
						{
							cloneElement(children, {
								articles: articles,
								savedArticles: savedArticles,
								setSearch: this.setSearch,
								saveArticle: this.saveArticle
							})
						}
						<ArticleList articles={articles} saveArticle={this.saveArticle}/>
					</div>
				</div>
		);

	}
}

export default Application;
