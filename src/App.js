import React from 'react';
import {BrowserRouter as Router,Route, Switch} from 'react-router-dom'
import './App.css';
import Form from './Form.js'
import Success from './Success.js'

function App() {
  return(
  <Router>
    <Switch>
    <Route exact path="/" component={Form}/>
    <Route exact path="/log" component={Success}/>
    </Switch>
  </Router>
  )
}

export default App;
