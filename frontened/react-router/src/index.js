import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Route, Link, Switch, BrowserRouter as Router} from "react-router-dom";
import Visitor   from "./Visitor";
import User from "./User";
import NotFound from './notFound';


const NotFound1 = () => <h1>404.. This page is not found!</h1>

const routing = (
   <Router>
     <div>
       <ul>
         <li><Link to="/">Home</Link></li>
         <li><Link to="/user">User</Link></li>
         <li><Link to="/visitor">Visitor</Link></li>
       </ul>
     </div>
     <Switch>
            <Route path="/" exact  component={App}/>
            <Route path="/visitor" exact component={Visitor}/>
            <Route path="/user" exact component={User}/>
            <Route component={NotFound}/>
     </Switch> 

   </Router>
)

ReactDOM.render(
  routing,
  document.getElementById('root')
);

