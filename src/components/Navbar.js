import React from 'react' 
import PropTypes from 'prop-types'
import {NavLink} from 'react-router-dom'

const Navbar = ({title, icon}) => {
    return (
        <div className="navbar bg-primary">
            <h1>
                <i className={icon}></i> {title}
            </h1>
            <ul>
                <li>
                    <NavLink to='/'>Home</NavLink>
                </li> 
                <li>
                    <NavLink to='/about'>About</NavLink>
                </li>
                <li>
                    <NavLink to='/contacts/new'>Add New Contact</NavLink>
                </li>
            </ul>
        </div>
    )
}

Navbar.propTypes = {
    title: PropTypes.string.isRequired, 
    icon: PropTypes.string,
}

Navbar.defaultProps = {
    title: 'Quick Connect', 
    icon: 'fas fa-address-book'
}

export default Navbar 