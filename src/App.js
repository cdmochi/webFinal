import logo from './logo.svg';
import './App.css';
import firebase from "firebase"

//bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

import Icon from '@material-ui/core/Icon';
import { useState } from 'react'
import ParkRequest from './ParkingRequest'


import {
  HashRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
//my imports
import MyTable from './MyTable'


function App() {
    return (
      <Router basename="">
        <Switch>
          <Route path="/MyTable" component={ MyTable } />
            <Route path="" component={ ParkRequest } />
        </Switch>
      </Router>
    );
}

export default App;
