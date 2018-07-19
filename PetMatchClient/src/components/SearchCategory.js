import React, { Component } from 'react';
import {inject} from 'mobx-react'

import {PetTypes} from '../config'

import PetCard from './PetCard'

@inject("api")
export default class SearchCategory extends Component{
    constructor(props){
        super(props);
        this.state = {
            breeds: [],
            pets: [],

            currentBreed: '0',
            selectedBreed: '0',
            currentSex: '0',
            selectedSex: '0'
        }

        this.petsSvc = this.props.api.pets;

        this.handleBreed = this.handleBreed.bind(this);
        this.handleSex = this.handleSex.bind(this);
        this.filter = this.filter.bind(this);
    }

    componentDidMount(){
        this.fetchPets();
    }

    componentDidUpdate(prevProps){
        if (prevProps.match.params.category !== this.props.match.params.category){
            this.fetchPets();
        }
    }

    fetchPets(){
        let type = PetTypes.find(t => t.name === this.props.match.params.category);
        this.setState({
            breeds: type.breeds
        })
        this.petsSvc.getByCategory(type.id).then(resp =>{
            this.setState({
                pets: resp
            })
        })
    }

    handleBreed(ev){
        this.setState({
            selectedBreed: ev.target.value
        })
    }

    handleSex(ev){
        this.setState({
            selectedSex: ev.target.value
        })
    }

    filter(){
        this.setState({
            currentSex: this.state.selectedSex,
            currentBreed: this.state.selectedBreed
        })
    }

    render(){
        let breeds = (this.state.breeds || []).map(b => {
            return (
                <option key={b.id} value={b.id}>{b.name}</option>
            )
        })
        let filtered = this.state.pets.filter(p => (this.state.currentBreed === '0' || p.breed === this.state.currentBreed) && (this.state.currentSex === '0' || p.sex === this.state.currentSex))
        let pets = filtered.length > 0 ?
            filtered.map(p => <PetCard key={p.id} pet={p} />) :
            <div className="col-md-6">
                <h3>Sorry, no pets matched your criteria.</h3>
            </div>
        return (
            <div className="container">
                <form>
                    <div className="form-row align-items-center mb-2">
                        <div className="col-auto">
                            <label className="sr-only" htmlFor="breedInput">Breed</label>
                            <select type="text" className="form-control mb-2" id="breedInput" placeholder="Breed" value={this.state.selectedBreed} onChange={this.handleBreed}>
                                <option value='' disabled>Choose Breed..</option>
                                <option value="0">All</option>
                                {breeds}
                            </select>
                        </div>
                        <div className="col-auto">
                            <div className="form-check mb-2">
                                <input className="form-check-input" type="radio" id="maleCheck" name="sex" value="1"
                                    checked={this.state.selectedSex==='1'} onChange={this.handleSex}/>
                                <label className="form-check-label" htmlFor="maleCheck"> Male </label>
                            </div>
                        </div>
                        <div className="col-auto">
                            <div className="form-check mb-2">
                                <input className="form-check-input" type="radio" id="femaleCheck" name="sex" value="2"
                                 checked={this.state.selectedSex==='2'} onChange={this.handleSex}/>
                                <label className="form-check-label" htmlFor="femaleCheck"> Female </label>
                            </div>
                        </div>
                        <div className="col-auto">
                            <div className="form-check mb-2">
                                <input className="form-check-input" type="radio" id="bothCheck" name="sex" value="0"
                                    checked={this.state.selectedSex==='0'} onChange={this.handleSex} />
                                <label className="form-check-label" htmlFor="bothCheck"> Both </label>
                            </div>
                        </div>
                        <div className="col-auto">
                            <button type="button" className="btn btn-primary mb-2" onClick={this.filter}>Filter</button>
                        </div>
                    </div>
                </form>
                <div className="row mb-2">
                {pets} 
                </div>
            </div>
        )
    }
}