import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router, Switch, Route, Link} from 'react-router-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

import Home from './components/Home';
import EggCarton from "./components/EggCarton";
import GuestBook from "./components/GuestBook";
import Quizzes from "./components/Quizzes";
import Error404 from "./components/404";
import List from "./components/List";

const FourOhFour = () => <div className="text-center"><Error404/><Link to="/">Home</Link></div>

ReactDOM.render(
  <React.StrictMode>
      <Router>
          <Switch>
              <Route exact path="/easter-egg/:name" component={EggCarton}/>
              <Route exact path="/quiz/:gender" component={Quizzes}/>
              <Route exact path="/guestbook" component={GuestBook}/>
              <Route exact path="/list" component={List}/>
              <Route exact path="/" component={Home}/>
              <Route component={FourOhFour}/>
          </Switch>
      </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
