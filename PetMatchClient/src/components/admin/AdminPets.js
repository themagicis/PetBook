import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {inject} from 'mobx-react'

@inject("api")
export default class AdminPets extends Component{
    constructor(props){
        super(props);
        this.state = {
            pets: []
        }
    }

    componentDidMount(){
        this.props.api.admin.getPets().then(resp =>{
            this.setState({pets:resp});
        });
    }

    render(){
        let pets = this.state.pets.map(r => {
            return (
                <tr key={r.id}>
                    <td>{r.id}</td>
                    <td>{r.name}</td>
                    <td><Link to={'/pet/' + r.id}>View profile</Link></td>
                    <td>
                        <button className="btn btn-sm btn-primary">Lock</button>
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
                        <th scope="col">Profile</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {pets}
                </tbody>
            </table>
        )
    }
}