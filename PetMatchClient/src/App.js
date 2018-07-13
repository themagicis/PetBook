import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Provider} from 'mobx-react'

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Header from './components/Header';
import Footer from './components/Footer';
import MainMenu from './components/MainMenu';

import Home from './components/Home';
import AddPet from './components/AddPet'
import PetProfile from './components/PetProfile'

import UserStore from './stores/userStore';
let userStore = new UserStore();

class App extends Component {
  render() {
    return (
      <Provider user={userStore}>
        <Router>
          <div>
            <div className="container">
              <Header />
              <MainMenu />
            </div>
            
            <Route exact path="/" component={Home} />
            <Route path="/pet/add" component={AddPet} />
            <Route path="/pet/profile/:id" component={PetProfile} />

            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
