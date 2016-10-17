// Include the axios package for performing HTTP requests (promise based alternative to request)
var axios = require('axios');

var authKey = '900244faae334a15bd2392e92d6eeaf9';
var query 	= '';
var now = new Date();
var startDate 	= 20160101;	//now.setDate(now.getDate()-30);
var endDate		=  20160830; //now.setDate(now.getDate())

var NYTUrl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=' + authKey + '&q=';

var helpers = {

	// Scrape/Get all 'Articles' from the NYT Page
	fetchArticles: function(search){
		console.log('fetchArticles', );
		query = NYTUrl + search;
		query = query + "&begin_date=" + startDate  + '&end_date=' + endDate + '&sort=newest&type=article';

		return axios.get(query)
			.then(function(response){
				console.log(response);
				return response.data.response.docs;
		})

	},
	
	// Drop an 'Article' from the database
	deleteArticle: function(){
		console.log('Send Request to drop Article Collection');
		return axios.get('/api/remove')
			.then(function(response){
				console.log(response);
				return response;
			});
	},
	
	// Get an 'Article' that was saved from the database
	getArticle: function(){
		console.log('getArticle');
		return axios.get('/api/get')
			.then(function(response){
				console.log(response);
				return response;
			});
	},

	// Post 'Articles' to the database
	postArticle: function(article){
		console.log('axios', article);
		return axios.post('/api/post', {article: article})
			.then(function(results){
				console.log("Article saved to Mongo database");
				return(results);
			})
	}

}

module.exports = helpers;
