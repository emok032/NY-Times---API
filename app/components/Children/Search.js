// Include React 
var React = require('react');

// This is the form component. 
var Form = React.createClass({

	// Here we set a generic state associated with the text being searched for
	getInitialState: function(){
		return {
			term: ""
		}
	},

	// This function will respond to the user input 
	handleChange: function(event){

    	// Here we create syntax to capture any change in text to the query terms (pre-search).
    	// See this Stack Overflow answer for more details: 
    	// http://stackoverflow.com/questions/21029999/react-js-identifying-different-inputs-with-one-onchange-handler
    	var newState = {};
    	newState[event.target.id] = event.target.value;
    	this.setState(newState);

	},

	// When a user submits... 
	handleClick: function(){

		console.log("CLICK");
		console.log(this.state.term);
		
		// Set the parent to have the search term
		this.props.setTerm(this.state.term);

	},

	// Here we render the function
	render: function(){

		return(

			<div class="row">
				<div class="col-sm-12">
				<br>
					<div class="panel panel-primary">
						<div class="panel-heading">
							<h3 class="panel-title"><strong><i class="fa  fa-list-alt"></i>Search Parameters</strong></h3>
						</div>
						<div class="panel-body">

							<form role="form">

							  <div class="form-group">
							    <label for="search">Topic:</label>
							  </div>

							  <div class="form-group">
							    <label for="pwd">Start Year:</label>
								<select class="form-control" id="numRecordsSelect">
									<option value=1>1</option>
									<option value=5 selected>5</option>
									<option value=10>10</option>
								</select>			  
							  </div>

							  <div class="form-group">
							    <label for="startYear">End Year:</label>
							    <input type="text" class="form-control" id="startYear">
							  </div>
							<input type="text" className="form-control text-center" id="term" onChange= {this.handleChange} required/>
							<button type="button" className="btn btn-primary" onClick={this.handleClick}>Submit</button>
		  					  <button type="button" class="btn btn-default" id="clearAll"><i class="fa fa-trash"></i>Clear Results</button>

							</form>
						</div>
					</div>
				</div>
			</div>
		)
	}
});

// Export the component back for use in other files
module.exports = Form;