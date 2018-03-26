import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Header } from './components/Header/Header';
import DeliveryList from './components/DeliveryList/DeliveryList';
import UpdateDelivery from './components/UpdateDelivery/UpdateDelivery';
import AddDelivery from './components/AddDelivery/AddDelivery';
import DeleteDelivery from './components/DeleteDelivery/DeleteDelivery';

class App extends Component {
  render() {
    return (
        <Router>
            <div className="container">
                <Header/>
                <Route exact path="/" component={DeliveryList} />
                <Route path="/create" component={AddDelivery} />
                <Route path="/update" component={UpdateDelivery} />
                <Route path="/delete" component={DeleteDelivery} />
            </div>
        </Router>
    );
  }
}

export default App;
