import './App.css';

import React, { useState } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'


import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

const App = () => {

  const [progress, setProgress] = useState(0);
  const setProgressMethod = () => {
    setProgress(progress);
  }
  return (
    <div>
      <Router>
        <LoadingBar color='#fff' progress={progress} />
        <NavBar />
        <Switch>
          <Route exact path="/">
            <News setProgress={setProgressMethod} key="general" pageSize="6" country="in" category="general" />
          </Route>
          <Route exact path="/business">
            <News setProgress={setProgressMethod} key="business" pageSize="6" country="in" category="business" />
          </Route>
          <Route exact path="/entertainment">
            <News setProgress={setProgressMethod} key="entertainment" pageSize="6" country="in" category="entertainment" />
          </Route>
          <Route exact path="/health">
            <News setProgress={setProgressMethod} key="health" pageSize="6" country="in" category="health" />
          </Route>
          <Route exact path="/science">
            <News setProgress={setProgressMethod} key="science" pageSize="6" country="in" category="science" />
          </Route>
          <Route exact path="/sports">
            <News setProgress={setProgressMethod} key="sports" pageSize="6" country="in" category="sports" />
          </Route>
          <Route exact path="/technology">
            <News setProgress={setProgressMethod} key="technology" pageSize="6" country="in" category="technology" />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}
export default App;


