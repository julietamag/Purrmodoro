import React from "react";
import './NavBar.css';
import angry_cat from './cat_angry.mp3';
import happy_cat from './cat_happy.mp3';
import soft_cat from './cat_soft.mp3';
import multiple_cat from './cat_multiple.mp3';


export const soundArray = [
    {
        name: 'angry cat',
        id: 1,
        src: angry_cat
    },
    {
        name: 'happy cat',
        id: 2,
        src: happy_cat
    },
    {
        name: 'soft cat',
        id: 3,
        src: soft_cat
    },
    {
        name: 'angry cat',
        id: 4,
        src: multiple_cat
    }
]

function NavBar(props) {
    return (
        <div id="navbar">
            <nav className="navbar fixed-top text-end" id="navigation">
                <div className="container-fluid  justify-content-end">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse bg-light " id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="./" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Change Sound
                                </a>
                                <ul class="dropdown-menu text-end mr-2 w-75 float-end">
                                <li className="dropdown-item" 
                                onClick={() => props.changeSound(soundArray[0].src)}
                                >Angry Cat</li>
                                <li className="dropdown-item" onClick={() => props.changeSound(soundArray[1].src)}>Happy Cat</li>
                                <li className="dropdown-item" onClick={() => props.changeSound(soundArray[2].src)}>Soft Cat</li>
                                <li className="dropdown-item" onClick={() => props.changeSound(soundArray[3].src)}>Multiple Cats</li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default NavBar;