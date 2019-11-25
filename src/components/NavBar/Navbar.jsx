import React, { Fragment } from "react";
import "./NavBar.css";
import logo from "../../logo.png";
const Navbar = props => {
  return (
    <nav className='navbar navbar-expand-lg navbar-dark info-color'>
      <div className='container'>
        <a className='navbar-brand' href='/'>
          <img src={logo} />
        </a>
        <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarSupportedContent-4'
          aria-controls='navbarSupportedContent-4'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='fas fa-align-justify' />
        </button>
        <div className='collapse navbar-collapse' id='navbarSupportedContent-4'>
          <ul className='navbar-nav ml-auto'>
            <li className='nav-item'>
              <a style={{ color: "#f04677" }} className='nav-link' href='#'>
                <i
                  style={{ color: "#f04677" }}
                  className='fas fa-phone-alt'
                ></i>{" "}
                Hotline: 0766701009
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' href='#'>
                <i className='fas fa-map-marker-alt'></i> Browse All
              </a>
            </li>
            {props.currentUser ? (
              <li className='nav-item dropdown'>
                <a
                  className='nav-link dropdown-toggle'
                  id='navbarDropdownMenuLink-4'
                  data-toggle='dropdown'
                  aria-haspopup='true'
                  aria-expanded='false'
                >
                  <i className='fas fa-user' /> Profile{" "}
                </a>
                <div
                  className='dropdown-menu dropdown-menu-right dropdown-info'
                  aria-labelledby='navbarDropdownMenuLink-4'
                >
                  <a className='dropdown-item' href='/editprofile'>
                    My account
                  </a>
                  <a className='dropdown-item' href='/history'>
                    Booking History
                  </a>
                  <a
                    onClick={props.handleLogout}
                    className='dropdown-item'
                    href='#'
                  >
                    Log out
                  </a>
                </div>
              </li>
            ) : (
              <Fragment>
                <li className='nav-item'>
                  <a className='nav-link' href='/register'>
                    {" "}
                    Register
                  </a>
                </li>
                <li className='nav-item'>
                  <a className='nav-link' href='/login'>
                    {" "}
                    Login
                  </a>
                </li>
              </Fragment>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
