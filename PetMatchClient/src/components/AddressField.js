import React, { Component } from 'react';

class AddressField extends Component{
    constructor(props){
        super(props);
        this.handleAddress = this.handleAddress.bind(this);

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
            this.props.onChange({
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng(),
                address: place.formatted_address
            });
    }

    render(){
        return <input ref={this.addressRef} type="text" className="form-control" id="address" name="address" placeholder="Address" autoComplete="off"/>
    }
}

export default AddressField