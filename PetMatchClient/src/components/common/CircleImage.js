import React, { Component } from 'react';
import {inject} from 'mobx-react'

@inject("user")
class CircleImage extends Component {
    render(){
        let url =  this.props.url || "http://smk.org.uk/wp-content/uploads/avatar.jpg";
        let size = this.props.size || 50;
        let styles = {
            borderRadius:size/2,
            width:size,
            height:size
        }
        return (
            <img src={url} alt="" style={styles} />
        )
    }
  }

  export default CircleImage