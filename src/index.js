import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import { createForms } from 'react-redux-form';

import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

import Home from './Components/Home'

const rootReducer = combineReducers({
    ...createForms({
	    user: {
	    	general:{firstName:'',lastName:'',birthday:'',gender: {options:['Male', 'Female'], selected:"Female"}  },
	    	local:{
	    		Position:{options:['School', 'Bachelor', 'College', 'Master'], selected:["School"]},
	    		Program:{
	    			options:['Graphic & Web Design', 'Digital Marketing', 'Programming', 'System Administration'], 
	    			selected:['Graphic & Web Design']
	    		}
	    	},
	    	contact:{phone:'', mail:'', address:'', note:''},
	    	hasAccepted:false,
	    	currentIndex:0,
	    	sumitStatus:''
	    },
    }),
});

const store = createStore(rootReducer, applyMiddleware(thunk));

class App extends React.Component {
	render(){
		return (
		<Provider store={store}>
			<BrowserRouter>
			<div>
				<Switch>
				<Route path="/home" component={Home} />
				<Redirect to="/home" component={Home} />
				</Switch>
			</div>
			</BrowserRouter>
		</Provider>
		)
	}
}

store.subscribe(() => {
  var state = store.getState();
  console.log(state)
});


render(<App />, document.getElementById('root'))

