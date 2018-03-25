import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Header } from './components/Header/Header';
import DeliveryList from './components/DeliveryList/DeliveryList'
import './App.css';

class App extends Component {
  render() {
    return (

        <Router>
            <div className="container">
                <Header/>
                <Route exact path="/" component={DeliveryList} />
                <Route path="/create" component={DeliveryList} />
                <Route path="/update" component={DeliveryList} />
                <Route path="/delete" component={DeliveryList} />
            </div>
        </Router>
    );
  }
}

export default App;
