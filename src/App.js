import "./App.css";
import { BrowserRouter } from "react-router-dom/cjs/react-router-dom.min";
import { Switch, Route, Redirect } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Content/Home/Home";
import Login from "./Content/Login/Login";
import Register from "./Content/Register/Register";
import List from "./Content/List/List";
import Detail from "./Content/Detail/Detail";
import Blog from "./Content/Blog/Blog";
import React, { Component } from 'react';
import Footer from "./Components/Footer/Footer";
import Profile from "./Content/Profile/Profile";
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLogged: false,
      accessToken: null,
      userID: null,
    };
  }

  componentDidMount = () => {
    let userID = window.localStorage.getItem('userID');
    if (userID!==null){
      this.setState({
        isLogged: !this.state.isLogged,
        userID: window.localStorage.getItem('userID'),
        accessToken: window.localStorage.getItem('accessToken'),
      });
    }
  }

  chooseNavbarItem = (index) => {
    let items = document.querySelectorAll('.dino__navbar__item');
    for (let i=0;i<items.length;i++){
      items[i].classList.remove('active');
    }
    items[index].classList.add('active');
  }

  manageLogged = (accessToken1, userID1) => {
    this.setState({
      isLogged: !this.state.isLogged,
      accessToken: accessToken1,
      userID: userID1
    });
  }

  saveTokenToStorage = (userID, accessToken) => {
    window.localStorage.setItem('userID',userID);
    window.localStorage.setItem('accessToken',accessToken);
  }

  removeTokenStorage = () => {
    window.localStorage.removeItem('userID');
    window.localStorage.removeItem('accessToken');
  }

  changBackground = (ch) => {
    let item = document.querySelector('.main');
    if (ch){
      item.classList.add('background__active');
    }else{
      item.classList.remove('background__active');
    }
  }

  render(){
    return (
      <div className="main">
        <BrowserRouter>
          <Navbar choose={(index)=>{this.chooseNavbarItem(index)}} logged={this.state.isLogged}></Navbar>
          <div className="main__board container">
            <Switch>
              <Route exact path="/" render={(props) => <Home background={() => {this.changBackground(false)}}  accessToken={this.state.accessToken} userID={this.state.userID} choose={(index) => {this.chooseNavbarItem(index)}} {...props}/>}></Route>
              <Route exact path="/login" render={(props) => <Login background={() => {this.changBackground(true)}} save={(userID,accessToken) => {this.saveTokenToStorage(userID,accessToken)}} logged={(accessToken,userID)=>{this.manageLogged(accessToken,userID)}} choose={(index) => {this.chooseNavbarItem(index)}} {...props}/>}></Route>
              <Route exact path="/register" render={(props) => <Register background={() => {this.changBackground(true)}} save={(userID,accessToken) => {this.saveTokenToStorage(userID,accessToken)}} logged={(accessToken,userID)=>{this.manageLogged(accessToken,userID)}} choose={(index) => {this.chooseNavbarItem(index)}} {...props}/>}></Route>
              <Route exact path="/profile" render={(props) => <Profile background={() => {this.changBackground(true)}}  remove={() => {this.removeTokenStorage()}} logged={(accessToken,userID)=>{this.manageLogged(accessToken,userID)}} accessToken={this.state.accessToken}  userID={this.state.userID}  choose={(index) => {this.chooseNavbarItem(index)}} {...props}/>}></Route>
              <Route exact path="/list" render={(props) => <List background={() => {this.changBackground(false)}}  accessToken={this.state.accessToken}  userID={this.state.userID}  choose={(index) => {this.chooseNavbarItem(index)}} {...props}/>}></Route>
              <Route exact path="/blog" render={(props) => <Blog background={() => {this.changBackground(true)}}   accessToken={this.state.accessToken} userID={this.state.userID}  choose={(index) => {this.chooseNavbarItem(index)}} {...props}/>}></Route>
              <Route exact path="/detail/:name/:id" render={(props) => <Detail background={() => {this.changBackground(false)}}  accessToken={this.state.accessToken} userID={this.state.userID}  choose={(index) => {this.chooseNavbarItem(index)}} {...props}/>}></Route>
              <Redirect to="/"></Redirect>
            </Switch> 
          </div>
        </BrowserRouter>
        <Footer></Footer>
      </div>
    );
  }
}

export default App;
