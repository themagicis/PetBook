import React from 'react';

import {PetTypes} from '../../config'

function PetBreed(props) {
    var type = PetTypes.find(t => t.id.toString() === props.typeId);
    if (type){
        var breed = type.breeds.find(b => b.id.toString() === props.breedId);
        if (breed){
            return <span>{breed.name}</span>;
        }
    }

    return <span>N/A</span>;
}

export default PetBreed;