import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './Components/Application';
import MainPage from './Pages/MainPage';
import SearchPage from './Pages/SearchPage';
import SavedPage from './Pages/SavedPage';

export default (
	<Route component={App}>
		<Route path="/" component={MainPage}></Route>
		<Route path="search" component={SearchPage}></Route>
		<Route path="saved" component={SavedPage}></Route>
    <IndexRoute component={MainPage}/>    
	</Route>
);