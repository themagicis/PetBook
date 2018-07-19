import React, { Component } from 'react';
import {inject} from 'mobx-react'

@inject("api")
export default class AdminUsers extends Component{
    constructor(props){
        super(props);
        this.state = {
            users: []
        }
        this.adminSvc = this.props.api.admin;
    }

    componentDidMount(){
        this.adminSvc.getUsers().then(resp =>{
            this.setState({users:resp});
        });
    }

    render(){
        let users = this.state.users.map(r => {
            return (
                <tr key={r.id}>
                    <td>{r.id}</td>
                    <td>{r.name}</td>
                    <td>{r.email}</td>
                    <td>
                        <button className="btn btn-sm btn-primary">Deactivate</button>
                    </td>
                </tr>
            )
        })
        return (
            <table className="table mt-3">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users}
                </tbody>
            </table>
        )
    }
}