import React, { Component } from 'react';

export default class PetProfile extends Component{
    render(){
        return (
            <h1>{this.props.match.params.id}</h1>
        )
    }
}