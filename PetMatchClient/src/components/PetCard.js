import React from 'react';
import {Link} from 'react-router-dom';

import PetSex from './common/PetSex'
import PetBreed from './common/PetBreed'

function PetCard(props) {
    let p = props.pet;
    return (
        <div className="col-md-6">
            <div className="card flex-md-row mb-4 box-shadow h-md-250">
            <div className="card-body d-flex flex-column align-items-start">
                <strong className="d-inline-block mb-2 text-primary"><PetBreed typeId={p.kind} breedId={p.breed} /></strong>
                <h3 className="mb-0">
                    <Link className="text-dark" to={'/pet/' + p.id}>{p.name}</Link>
                </h3>
                <div className="mb-1 text-muted"><PetSex sex={p.sex}/></div>
                <p className="card-text mb-auto">{p.description}</p>
                <Link to={'/pet/' + p.id}>See profile</Link>
            </div>
            <img className="card-img-right flex-auto d-none d-md-block" src={p.pictures[0]} alt={p.name} width="200" height="250" />
            </div>
        </div>
    )
}

export default PetCard;