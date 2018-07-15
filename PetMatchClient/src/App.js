import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Provider} from 'mobx-react'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'toastr/build/toastr.min.css';
import './App.css';

import PrivateRoute from './components/common/PrivateRoute'
import AdminRoute from './components/common/AdminRoute'

import Header from './components/Header';
import Footer from './components/Footer';
import MainMenu from './components/MainMenu';

import Home from './components/Home';
import AddPet from './components/AddPet'
import PetProfile from './components/PetProfile'
import SearchCategory from './components/SearchCategory'
import AdminPanel from './components/AdminPanel'
import Register from './components/Register'

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
              <div className="jumbotron p-3 p-md-5 text-white rounded bg-dark">
                    <div className="col-md-6 px-0">
                        <h1 className="display-4 font-italic">PetBook!</h1>
                        <p className="lead my-3">The social netowork for your percious animals.</p>
                    </div>
                </div>
            </div>
            
            <Route exact path="/" component={Home} />
            <Route path="/category/:category" component={SearchCategory} />
            <Route path="/register" component={Register} />

            <PrivateRoute path="/pet/add" component={AddPet} user={userStore} />
            <PrivateRoute path="/pet/:id(\d+)" component={PetProfile} user={userStore}  />
            
            <AdminRoute path="/admin" component={AdminPanel} user={userStore} />

            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
