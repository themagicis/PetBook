import React, { Component } from 'react';
import DatePicker from 'react-date-picker';

import {PetTypes} from '../config'

import petService from '../services/petService'

class AddPet extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: '',
            kind: '1',
            breed: '1',
            sex: '1',
            birthDate: new Date(),
            lat: '',
            lng: '',
            address: '',
            picture: '',
            pictures: []
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleDob = this.handleDob.bind(this);
        this.handlAddPicture = this.handlAddPicture.bind(this);
        this.handleAddress = this.handleAddress.bind(this);
        this.save = this.save.bind(this);

        this.addressRef = React.createRef();
        this.autoComplete = null;
        this.listener = null;
    }

    componentDidMount(){
        this.autocomplete = new window.google.maps.places.Autocomplete(this.addressRef.current);
        this.listener = this.autocomplete.addListener('place_changed', this.handleAddress);
    }

    componentWillUnmount(){
        window.google.maps.event.removeListener(this.listener);
    }

    handleAddress(){
        var place = this.autocomplete.getPlace();
            if (!place.geometry) {
              // User entered the name of a Place that was not suggested and
              // pressed the Enter key, or the Place Details request failed.
              window.alert("No details available for input: '" + place.name + "'");
              return;
            }
            this.setState({
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng(),
                address: place.formatted_address
            });
    }

    handleChange(event) {
        let obj = {};
        obj[event.target.name] = event.target.value;
        this.setState(obj);
    }

    handleDob(event) {
        let obj = {birthDate:event};
        this.setState(obj);
    }

    handlAddPicture(event) {
        this.setState((prevState) => ({
            picture: '',
            pictures: prevState.pictures.concat([this.state.picture])
        }));
    }

    save(){
        petService.add(this.state).then(resp =>{
            debugger;
        });
    }

    render() {
        let typeOptions = PetTypes.map(t => <option key={t.id} value={t.id}>{t.name}</option>)
        let breeds = PetTypes.find(t => t.id.toString() === this.state.kind).breeds;
        let breedOptions = breeds.map(b => <option key={b.id} value={b.id}>{b.name}</option>)
        let images = this.state.pictures.map(p => <img alt="" className="pet-image" key={p} src={p}/>)
        return (
            <form>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-auto">
                            <h1>Add Pet</h1>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-3">
                            <div className="form-group">
                                <label htmlFor="email">Name</label>
                                <input type="text" className="form-control" id="name" name="name" placeholder="Name" autoComplete="off"
                                    value={this.state.name} onChange={this.handleChange}/>
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="form-group">
                                <label htmlFor="email">Birth date</label>
                                <DatePicker
                                    className="form-control"
                                    onChange={this.handleDob}
                                    value={this.state.birthDate}
                                    />
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-3">
                            <div className="form-group">
                                <label htmlFor="email">Kind</label>
                                <select className="form-control" id="kind" name="kind" placeholder="Select kind.." value={this.state.kind} onChange={this.handleChange}>
                                    {typeOptions}
                                </select>
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="form-group">
                                <label htmlFor="email">Breed</label>
                                <select className="form-control" id="breed" name="breed" placeholder="Select breed.." value={this.state.breed} onChange={this.handleChange}>
                                    {breedOptions}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-6">
                            <div className="form-group">
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="sex" id="sexMale" value="1" checked={this.state.sex==='1'} onChange={this.handleChange}/>
                                    <label className="form-check-label" htmlFor="sexMale">Male</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="sex" id="sexFemale" value="2" checked={this.state.sex==='2'} onChange={this.handleChange}/>
                                    <label className="form-check-label" htmlFor="sexFemale">Female</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-6">
                            <div className="form-group">
                                <label htmlFor="email">Address</label>
                                <input ref={this.addressRef} type="text" className="form-control" id="address" name="address" placeholder="Address" autoComplete="off"/>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-6">
                            <div className="input-group mb-3">
                               <input type="text" className="form-control" id="picture" name="picture" placeholder="Type or paste an url.." autoComplete="off"
                                   value={this.state.picture} onChange={this.handleChange}/>
                                <div className="input-group-append">
                                    <button className="btn btn-outline-secondary" type="button" onClick={this.handlAddPicture}>Add Picture</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-left">
                        <div className="col-3"></div>
                        <div className="col-6">
                            {images}
                        </div>
                    </div>
                    <div className="row justify-content-center mb-3">
                        <div className="col-6 text-center">
                            <button type="button" className="btn btn-primary" onClick={this.save}>Save</button>
                        </div>
                    </div>
                </div>
            </form>
        )
    }
}

export default AddPet