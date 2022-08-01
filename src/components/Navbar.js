import React from 'react'
import {Link} from "react-router-dom"

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
            <button className="navbar-brand md:text-lg">Appointment Scheduler</button>
            <button className="navbar-toggler md:text-lg" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                Login User
            </button>
            <div className="collapse navbar-collapse" id="navbarColor01">
            <ul className="navbar-nav me-auto">
                <li className="nav-item active">
                    <Link className="nav-link" to="/home">Home
                        <span className="visually-hidden">(current)</span>
                    </Link>
                </li>
            </ul>
            <form className="d-flex">
                <button className="btn btn-secondary my-2 my-sm-0 text-white" type="Button"><Link to="/">Change User</Link></button>
            </form>
            </div>
        </div>
    </nav>
    )
}

export default Navbar