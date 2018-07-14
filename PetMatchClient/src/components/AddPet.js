import React, { Component } from 'react';
import DatePicker from 'react-date-picker';
import { Alert } from 'reactstrap';

import {inject, observer} from 'mobx-react'

import {PetTypes} from '../config'
import petService from '../services/petService'

@inject("user")
@observer
class AddPet extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: '',
            description: '',
            kind: '1',
            breed: '1',
            phone: '',
            sex: '1',
            birthDate: new Date(),
            lat: '',
            lng: '',
            address: '',
            picture: '',
            pictures: [],
            error: ''
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
        this.autoComplete = new window.google.maps.places.Autocomplete(this.addressRef.current);
        this.listener = this.autoComplete.addListener('place_changed', this.handleAddress);
    }

    componentWillUnmount(){
        window.google.maps.event.removeListener(this.listener);
    }

    handleAddress(){
        var place = this.autoComplete.getPlace();
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
        if (this.state.picture){
            this.setState((prevState) => ({
                picture: '',
                pictures: prevState.pictures.concat([this.state.picture])
            }));
        }
    }

    save(){
        if (!this.state.name || !this.state.description || !this.state.phone || !this.state.pictures.length){
            this.setState({
                error: 'Please fill all the required fields'
            })
            return;
        }

        petService.add(this.state).then(resp =>{
            window.toastr.success('Saved!');
            var pet = {
                id: resp.id,
                name: this.state.name,
                picture: this.state.pictures[0]
            }
            this.props.user.addPet(pet);
            this.props.history.push('/pet/' + resp.id);
        });
    }

    render() {
        let typeOptions = PetTypes.map(t => <option key={t.id} value={t.id}>{t.name}</option>)
        let breeds = PetTypes.find(t => t.id.toString() === this.state.kind).breeds;
        let breedOptions = breeds.map(b => <option key={b.id} value={b.id}>{b.name}</option>)
        let images = this.state.pictures.map(p => <img alt="" className="pet-image" key={p} src={p}/>)
        let error = this.state.error ? 
            <div className="row justify-content-center">
                <div className="col-6">
                    <Alert color="danger">
                        {this.state.error}
                    </Alert>
                </div>
            </div> : '';
        return (
            <form>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-auto">
                            <h1>Add Pet</h1>
                        </div>
                    </div>
                    {error}
                    <div className="row justify-content-center">
                        <div className="col-3">
                            <div className="form-group">
                                <label htmlFor="name">Name*</label>
                                <input type="text" className="form-control" id="name" name="name" placeholder="Name" autoComplete="off"
                                    value={this.state.name} onChange={this.handleChange}/>
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="form-group">
                                <label htmlFor="email">Birth date*</label>
                                <DatePicker
                                    className="form-control"
                                    onChange={this.handleDob}
                                    value={this.state.birthDate}
                                    />
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-6">
                            <div className="form-group">
                                <label htmlFor="description">Description*</label>
                                <textarea type="text" className="form-control" id="description" name="description" placeholder="Type a short desription" autoComplete="off"
                                    value={this.state.description} onChange={this.handleChange}/>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-3">
                            <div className="form-group">
                                <label htmlFor="kind">Kind*</label>
                                <select className="form-control" id="kind" name="kind" placeholder="Select kind.." value={this.state.kind} onChange={this.handleChange}>
                                    {typeOptions}
                                </select>
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="form-group">
                                <label htmlFor="breed">Breed*</label>
                                <select className="form-control" id="breed" name="breed" placeholder="Select breed.." value={this.state.breed} onChange={this.handleChange}>
                                    {breedOptions}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-3">
                            <div className="form-group">
                                <label htmlFor="name">Contact Phone#"*"</label>
                                <input type="text" className="form-control" id="phone" name="phone" placeholder="Phone Number" autoComplete="off"
                                    value={this.state.phone} onChange={this.handleChange}/>
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="form-group">
                                <div><label>Sex*</label></div>
                                <div className="btn-group btn-group-toggle form-group-sex" data-toggle="buttons">
                                    <label className={`btn btn-info ${this.state.sex==='1'?'active':''}`} htmlFor="male">
                                        <input type="radio" name="sex" id="male" autoComplete="off" value="1" checked={this.state.sex==='1'} onChange={this.handleChange}/> Male
                                    </label>
                                    <label className={`btn btn-info ${this.state.sex==='2'?'active':''}`} htmlFor="female">
                                        <input type="radio" name="sex" id="female" autoComplete="off" value="2" checked={this.state.sex==='2'} onChange={this.handleChange}/> Female
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-6">
                            <div className="form-group">
                                <label htmlFor="email">Address*</label>
                                <input ref={this.addressRef} type="text" className="form-control" id="address" name="address" placeholder="Address" autoComplete="off"/>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-6">
                            <div className="form-group">
                                <label htmlFor="email">Pictures*</label>
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control" id="picture" name="picture" placeholder="Type or paste an url.." autoComplete="off"
                                        value={this.state.picture} onChange={this.handleChange}/>
                                    <div className="input-group-append">
                                        <button className="btn btn-outline-secondary" type="button" onClick={this.handlAddPicture}>Add Picture</button>
                                    </div>
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