import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {inject} from 'mobx-react'

@inject("api")
class Home extends Component{
    constructor(props){
        super(props);
        this.updateCarrousel = this.updateCarrousel.bind(this);
        this.state = {
            currentIndex: 0,
            pets: []
        }
        this.petsSvc = this.props.api.pets;
    }

    componentDidMount(){
        this.petsSvc.getTop().then(resp =>{
            this.setState({
                pets: resp
            })
        })
    }
    updateCarrousel(step){
        if (this.state.pets.length > 0){
            let newIndex = this.state.currentIndex + step;
            if (newIndex < 0){
                newIndex = this.state.pets.length - 1
            } else if (newIndex >= this.state.pets.length){
                newIndex = 0;
            }

            this.setState({
                currentIndex: newIndex
            })
        }
    }

    setCarrousel(newIndex){
        this.setState({
            currentIndex: newIndex
        })
    }

    render(){
        let indicators = this.state.pets.map((p, index) => {
            return (
                <li key={index} onClick={() => this.setCarrousel(index)} className={this.state.currentIndex === index ? 'active':''}></li>
            )
        })
        let currentPet = this.state.pets.length > 0 ?
             <div className="carousel-item active">
                <img className="d-block w-100" src={this.state.pets[this.state.currentIndex].picture} alt="First slide"/>
                <div className="carousel-caption d-none d-md-block">
                    <h3><Link to={'/pet/' + this.state.pets[this.state.currentIndex].id}>{this.state.pets[this.state.currentIndex].name}</Link></h3>
                    <p>{this.state.pets[this.state.currentIndex].description}</p>
                </div>
            </div> : ''
        return (
            <div className="container">
                <h3 className="text-center">Meet with our top rated pets</h3>
                <div className="col-12 bg-light mb-3 rounded">
                    <div id="carouselExampleIndicators" className="carousel slide">
                        <ol className="carousel-indicators">
                            {indicators}
                        </ol>
                        <div className="carousel-inner">
                            {currentPet}
                        </div>
                        <a className="carousel-control-prev" href={null} onClick={() => this.updateCarrousel(-1)}>
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="sr-only">Previous</span>
                        </a>
                        <a className="carousel-control-next" href={null} onClick={() => this.updateCarrousel(1)}>
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="sr-only">Next</span>
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home