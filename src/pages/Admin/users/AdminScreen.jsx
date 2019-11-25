import React, { Component } from "react";
import "./admin.css";
import SideBar from "../sideBar/SideBar";
import UsersComponent from "./UsersComponent";
import { Redirect } from "react-router-dom";

class AdminScreen extends Component {
  state = {
    currentItem: "users",
    currentUser: ""
  };

  UNSAFE_componentWillMount() {
    const currentUser = window.localStorage.getItem("email");
    this.setState({
      currentUser: currentUser
    });
  }

  render() {
    return this.state.currentUser === "admin@gmail.com" ? (
      <div className='row admin'>
        <div className='col-2 sidebar-container'>
          <SideBar currentItem={this.state.currentItem} />
        </div>

        <div className='col-10 content-container'>
          <div className='table-content-container'>{<UsersComponent />}</div>
          <div className='paging-container'></div>
        </div>
      </div>
    ) : this.state.currentUser ? (
      <Redirect to='/' />
    ) : (
      <Redirect to='/login' />
    );
  }
}

export default AdminScreen;
