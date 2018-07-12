import React, { Component } from 'react';
import {withRouter, Link} from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Alert } from 'reactstrap';

import logo from '../logo.png'
import {inject, observer} from 'mobx-react'

import authService from '../services/authService'

import CircleImage from './common/CircleImage'

@inject("user")
@observer
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
          modal: false
        };
    
        this.toggle = this.toggle.bind(this);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            email: '',
            password: '',
            error: ''
        }
      }
    
    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    handleChange(event) {
        let obj = {};
        obj[event.target.name] = event.target.value;
        this.setState(obj);
    }

    login(){
        this.setState({error:''});
        authService.login(this.state.email, this.state.password).then(resp =>{
            if (resp.success){
                this.toggle();
                this.props.user.setInfo({
                    ...resp.user,
                    token: resp.token,
                })
            } else{
                this.setState({error:resp.message});
            }
        });
    }

    logout(){
        this.props.user.clearInfo();
        this.props.history.push('/');
    }

    render(){
        var isAuthenticated = this.props.user.isAuthenticated;
        let btnAction = isAuthenticated ? 
            <Button outline color="secondary" onClick={this.logout}>Log out</Button> :
            <Button outline color="success" onClick={this.toggle}>Log in</Button>
        let btnRegister = isAuthenticated ? '' : 
            <Link to={'/register/'}>
                <Button outline color="info" onClick={this.register}>Register</Button>
            </Link>;
        let rightContent = isAuthenticated ? <CircleImage url={this.props.user.url} size={50} /> : '' ;
        let pets = isAuthenticated ? this.props.user.info.pets.map(p => 
            <Link key={p.id} to={'/mypet/' + p.id}>
                <CircleImage url={p.picture} size={50} /> &nbsp;
            </Link>) : '';
        let addPetBtn = isAuthenticated ? 
            <Link to={'/addpet/'}>
                <CircleImage url={'https://frpnet.net/wp-content/uploads/2017/05/roots-of-insanity-6.png'} size={50} />
            </Link> : '' ;
        let error = this.state.error ? 
            <div className="row justify-content-center">
                <div className="col-auto">
                    <Alert color="danger">
                        {this.state.error}
                    </Alert>
                </div>
            </div> : '';

        return (
            <header className="blog-header py-2">
                <div className="row flex-nowrap justify-content-between align-items-center">
                    <div className="col-4">
                        {pets}
                        {addPetBtn}
                    </div>
                    <div className="col-4 text-center">
                        <a className="blog-header-logo text-dark" href="/">
                            <img src={logo} alt="Logo" width="50" height="50"/>
                            <span className="blog-header-title">PetBook</span>
                        </a>
                    </div>
                    <div className="col-4 d-flex justify-content-end align-items-center">
                        {rightContent}{btnRegister}
                        &nbsp;&nbsp;&nbsp;
                        {btnAction}
                    </div>
                </div>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Log in to PetBook</ModalHeader>
                    <ModalBody>
                        {error}
                        <div className="row justify-content-center">
                            <div className="col-auto">
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <input type="text" className="form-control" id="email" name="email" placeholder="Email" autoComplete="off"
                                            value={this.state.email} onChange={this.handleChange}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <input type="password" className="form-control" id="password" name="password" placeholder="Password" autoComplete="off"
                                            value={this.state.password} onChange={this.handleChange}/>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.login}>Login</Button>
                        {' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>

            </header>
        )
    }
  }

  export default withRouter(Header)