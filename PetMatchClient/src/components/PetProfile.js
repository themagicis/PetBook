import React, { Component } from 'react';
import {inject} from 'mobx-react'

import {PetTypes} from '../config'

import CircleImage from './common/CircleImage'
import PetSex from './common/PetSex'
import PetBreed from './common/PetBreed'

@inject("api")
export default class PetProfile extends Component{
    map = null;

    constructor(props){
        super(props);
        this.state = {
            id: '',
            name: '',
            description: '',
            birthDate: '',
            address: '',
            sex: 1,
            kind: '0',
            breed: '0',
            pictures: [],
            owner: {
                name: '',
                picture: ''
            },
            error: ''
        };

        this.petsSvc = this.props.api.pets;

        this.report = this.report.bind(this);
        this.mapRef = React.createRef();
    }

    componentDidMount(){
        this.map = new window.google.maps.Map(document.getElementById("map"), {
            center: {lat: -34.397, lng: 150.644},
            zoom: 10
          });
        this.fetchPet();
    }

    componentDidUpdate(prevProps){
        if (prevProps.match.params.id !== this.props.match.params.id){
            this.fetchPet();
        }
    }

    fetchPet(){
        this.petsSvc.getById(this.props.match.params.id).then(resp =>{
            if (resp.success){
                this.setState({...resp.pet});
                this.setState({error: ''});
                if (resp.pet.lat && resp.pet.lng){
                    var pos = {
                        lat: resp.pet.lat,
                        lng: resp.pet.lng
                    };
                    this.map.setCenter(pos);
                }
            } else {
                this.setState({error: 'This pet does not exist. Please contact the support.' });
            }
        }, err =>{
            debugger;
        })
    }

    getPetBreed(typeId, breedId){
        typeId = parseInt(typeId, 10);
        breedId = parseInt(breedId, 10);
        var type = PetTypes.find(t => t.id === typeId);
        if (type){
            var breed = type.breeds.find(b => b.id === breedId);
            if (breed){
                return breed.name;
            }
        }
        return '';
    }

    report(){
        this.petsSvc.report(this.state.id).then(reps => {
            window.toastr.success('Thank you for your feedback!');
        });
    }

    render(){
        let pictures = this.state.pictures.map(p => {
            return <img key={p} className="float-left" src={p} alt="" width="200" height="200" />
        });
        return (
            <div className="container">
                <div className="row">
                    <div className="col-8">
                        <div className="card">
                            <div className="card-header">
                                Main Information
                            </div>
                            <div className="card-block">
                                <div className="row">
                                    <div className="col-12">
                                        <h1>
                                            <CircleImage url={this.state.pictures[0]} size={150} />
                                            &nbsp;&nbsp;&nbsp;&nbsp;
                                            {this.state.name}
                                        </h1>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <h2>{this.state.description}</h2>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-4">
                                        <h4>Sex:</h4>
                                    </div>
                                    <div className="col-8">
                                        <h4><PetSex sex={this.state.sex}/></h4>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-4">
                                        <h4>Breed:</h4>
                                    </div>
                                    <div className="col-8">
                                        <h4><PetBreed typeId={this.state.kind} breedId={this.state.breed} /></h4>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-4">
                                        <h4>Birth Date:</h4>
                                    </div>
                                    <div className="col-8">
                                        <h4>{this.state.birthDate && new Intl.DateTimeFormat('en-GB', { 
                                                    year: 'numeric', 
                                                    month: 'long', 
                                                    day: '2-digit' 
                                                    }).format(new Date(this.state.birthDate))}</h4>
                                    </div>
                                </div>
                            </div>    
                        </div>
                        <br />
                        <div className="card">
                            <div className="card-header">
                                Contact
                            </div>
                            <div className="card-block">
                            <   div className="row">
                                    <div className="col-4">
                                        <h4>Address:</h4>
                                    </div>
                                    <div className="col-8">
                                        <h4>{this.state.address}</h4>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-4">
                                        <h4>Phone:</h4>
                                    </div>
                                    <div className="col-8">
                                        <h4>{this.state.phone}</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br />
                        <div className="card">
                            <div className="card-header">
                                Gallery
                            </div>
                            <div className="card-block">
                                <div className="row">
                                    <div className="col-12">
                                        {pictures}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br />
                    </div>
                    <div className="col-4">
                        <div className="card">
                            <div className="card-header">
                                Owner
                            </div>
                            <div className="card-block">
                                <div className="row">
                                    <div className="col-12">
                                        <h2>
                                            <CircleImage url={this.state.owner.picture} size={75} />
                                            &nbsp;&nbsp;&nbsp;&nbsp;
                                            {this.state.owner.name}
                                        </h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br />
                        <div className="card">
                            <div className="card-header">
                                Location
                            </div>
                            <div className="card-block">
                                <div className="row">
                                    <div className="col-12">
                                        <div id="map" ref={this.mapRef}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br />
                        <div className="card">
                            <div className="card-header">
                                Actions
                            </div>
                            <div className="card-block">
                                <div className="row">
                                    <div className="col-12">
                                        <button className="btn btn-outline-danger" onClick={this.report}>Report</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br />
                    </div>
                </div>
            </div>
        )
    }
}