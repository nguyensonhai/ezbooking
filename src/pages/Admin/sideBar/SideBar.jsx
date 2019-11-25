import React from "react";
import "./sidebar.css";

const SideBar = props => {
  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light'>
      <div className='collapse navbar-collapse' id='navbarSupportedContent'>
        <ul className='navbar-nav mr-auto'>
          {props.currentItem === "users" ? (
            <li className='nav-item side-bar active'>
              <i className='fas fa-user'></i>
              <a className='nav-link users' href='/admin'>
                Người dùng
              </a>
            </li>
          ) : (
            <li className='nav-item side-bar'>
              <i className='fas fa-user'></i>
              <a className='nav-link users' href='/admin'>
                Người dùng
              </a>
            </li>
          )}
          {props.currentItem === "customers" ? (
            <li className='nav-item side-bar active'>
              <i className='fas fa-user'></i>
              <a className='nav-link customers' href='/admin/customers'>
                Khách
              </a>
            </li>
          ) : (
            <li className='nav-item side-bar'>
              <i className='fas fa-user'></i>
              <a className='nav-link customers' href='/admin/customers'>
                Khách
              </a>
            </li>
          )}
          {props.currentItem === "booking" ? (
            <li className='nav-item side-bar active'>
              <i className='fas fa-user'></i>
              <a className='nav-link customers' href='/admin/booking'>
                Giao dịch
              </a>
            </li>
          ) : (
            <li className='nav-item side-bar'>
              <i className='fas fa-user'></i>
              <a className='nav-link customers' href='/admin/booking'>
                Giao dịch
              </a>
            </li>
          )}
          {props.currentItem === "rooms" ? (
            <li className='nav-item side-bar active dropdown'>
              <i className='fas fa-home'></i>
              <a
                className='nav-link rooms'
                href='#'
                role='button'
                id='dropdownMenuLink'
                data-toggle='dropdown'
                aria-haspopup='true'
                aria-expanded='false'
              >
                Phòng
              </a>
              <div className='dropdown-menu' aria-labelledby='dropdownMenuLink'>
                <a className='dropdown-item' href='/admin/rooms'>
                  Danh sách phòng
                </a>
                <a className='dropdown-item' href='/admin/create-room'>
                  Tạo phòng mới
                </a>
              </div>
            </li>
          ) : (
            <li className='nav-item side-bar dropdown'>
              <i className='fas fa-home'></i>
              <a
                className='nav-link rooms'
                href='#'
                role='button'
                id='dropdownMenuLink'
                data-toggle='dropdown'
                aria-haspopup='true'
                aria-expanded='false'
              >
                Phòng
              </a>
              <div className='dropdown-menu' aria-labelledby='dropdownMenuLink'>
                <a className='dropdown-item' href='/admin/rooms'>
                  Danh sách phòng
                </a>
                <a className='dropdown-item' href='/admin/create-room'>
                  Tạo phòng mới
                </a>
              </div>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default SideBar;
