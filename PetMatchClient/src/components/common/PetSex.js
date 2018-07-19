import React from 'react';

function PetSex(props) {
    return (
        <span>{props.sex === '1' ? 'Male' : 'Female'}</span>
    )
}

export default PetSex;