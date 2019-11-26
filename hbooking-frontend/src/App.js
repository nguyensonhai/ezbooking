import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import RegisterScreen from "./pages/User/RegisterScreen";
import LoginScreen from "./pages/User/LoginScreen";
import AdminScreen from "./pages/Admin/users/AdminScreen";
import CreateRoomScreen from "./pages/Admin/createRoom/CreateRoomScreen";
import CustomerScreen from "./pages/Admin/customers/CustomersComponent";
import RoomScreen from "./pages/Admin/roomDetail/RoomsComponent";
import DetailPost from "./pages/Detail/DetailPostScreen";
import BookDetailScreen from "./pages/BookDetail/BookDetailScreen";
import BookingComponent from "./pages/Admin/booking/BookingComponent";
import HomeScreen from "./pages/HomepageScreen";
import NavBar from "./components/NavBar/Navbar";
import Footer from "./components/Footer/Footer";
import SearchScreen from "./pages/SearchScreen";
import BookingHistory from "./pages/User/BookingHistory";
import UserEditProfile from "./pages/User/UserEditProfile";

class App extends Component {
  state = {
    searchData: [],
    currentUser: ""
  };

  componentDidMount() {
    if (localStorage.getItem("email")) {
      this.setState({
        currentUser: localStorage.getItem("email")
      });
    }
  }

  handleLogout = async () => {
    const data = await fetch("http://localhost:3001/users/logout", {
      method: "GET",
      credentials: "include"
    }).then(res => {
      return res.json();
    });
    if (data.success) {
      localStorage.removeItem("email");
      this.setState({
        currentUser: ""
      });
      window.location.href = "/";
    }
  };

  getSearchData = data => {
    this.setState(
      {
        searchData: data
      },
      () => {
        console.log(this.state.searchData);
      }
    );
  };
  render() {
    return (
      <div>
        <NavBar
          handleLogout={this.handleLogout}
          currentUser={this.state.currentUser}
        ></NavBar>
        <BrowserRouter>
          <Switch>
            <Route
              path='/register'
              component={RegisterScreen}
              exact={true}
            ></Route>
            <Route
              render={props => (
                <HomeScreen {...props} getSearchData={this.getSearchData} />
              )}
              path='/'
              exact={true}
            ></Route>
            <Route
              render={props => (
                <SearchScreen {...props} data={this.state.searchData} />
              )}
              path='/search'
              exact={true}
            ></Route>
            <Route
              path='/register'
              component={RegisterScreen}
              exact={true}
            ></Route>
            <Route
              path='/login'
              exact={true}
              render={props => (
                <LoginScreen {...props} currentUser={this.state.currentUser} />
              )}
            ></Route>
            <Route path='/admin' component={AdminScreen} exact={true}></Route>
            <Route
              path='/admin/customers'
              component={CustomerScreen}
              exact={true}
            ></Route>
            <Route
              path='/admin/rooms'
              component={RoomScreen}
              exact={true}
            ></Route>
            <Route
              path='/admin/create-room'
              component={CreateRoomScreen}
              exact={true}
            ></Route>
            <Route
              path='/room/:roomId'
              component={DetailPost}
              exact={true}
            ></Route>
            <Route
              path='/room/detail/:roomId'
              component={BookDetailScreen}
              exact={true}
            ></Route>
            <Route
              path='/admin/booking'
              component={BookingComponent}
              exact={true}
            ></Route>
            <Route
              path='/editProfile'
              component={UserEditProfile}
              exact={true}
            />
            <Route path='/history' component={BookingHistory} exact={true} />
          </Switch>
        </BrowserRouter>
        <Footer></Footer>
      </div>
    );
  }
}

export default App;