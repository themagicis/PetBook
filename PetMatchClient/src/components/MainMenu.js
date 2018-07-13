import React from 'react';
import {Link} from 'react-router-dom';

import {PetTypes} from '../config'

function MainMenu(props) {
    return (
        <div className="nav-scroller py-1 mb-2">
            <nav className="nav d-flex justify-content-between">
                { PetTypes.map(p => <Link className="p-2 text-muted" to={'/category/' + p.name} key={p.id.toString()}>{p.name}</Link>) }
            </nav>
        </div>
    )
}

export default MainMenu