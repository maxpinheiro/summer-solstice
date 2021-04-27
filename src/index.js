import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router, Switch, Route} from 'react-router-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

import Home from './components/Home';
import EggCarton from "./components/EggCarton";
import GuestBook from "./components/GuestBook";
import Quizzes from "./components/Quizzes";

ReactDOM.render(
  <React.StrictMode>
      <Router>
          <Switch>
              <Route path="/easter-eggs/:name" component={EggCarton}/>
              <Route path="/quiz/:gender" component={Quizzes}/>
              <Route path="/guestbook" component={GuestBook}/>
              <Route path="/" component={Home}/>
          </Switch>
      </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
