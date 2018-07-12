import React from 'react';
import {Link} from 'react-router-dom';

let petTypes = [
    { id: 1, name: "Cats" },
    { id: 2, name: "Dogs" },
    { id: 3, name: "Aquatic" },
    { id: 4, name: "Rodents" },
    { id: 5, name: "Birds" },
    { id: 6, name: "Lizards" },
    { id: 7, name: "Arthropods" },
    { id: 8, name: "Other" },
]

function MainMenu(props) {
    return (
        <div className="nav-scroller py-1 mb-2">
            <nav className="nav d-flex justify-content-between">
                { petTypes.map(p => <Link className="p-2 text-muted" to={'/category/' + p.name} key={p.id.toString()}>{p.name}</Link>) }
            </nav>
        </div>
    )
}

export default MainMenu