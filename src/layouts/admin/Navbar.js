import React from 'react';
import { Link, useHistory } from 'react-router-dom';


const Navbar = () => {
    const currentUser = localStorage.getItem('auth_name');
    const history = useHistory();
    const logoutSubmit = (e) => {
        e.preventDefault();

        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_name');
        history.push('/login');

    }

    return (
        <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
            <div className='container-fluid'>
                <Link className="navbar-brand ps-3" to="/admin">Website Book</Link>
                <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
                    <li className="nav-item dropdown">
                        <Link to="/#" className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            {currentUser}<i className="fas fa-user fa-fw"></i>
                        </Link>
                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                            <li className="dropdown-item" onClick={logoutSubmit}>Logout</li>
                        </ul>
                    </li>
                </ul>
            </div>

        </nav>
    );

}

export default Navbar;
