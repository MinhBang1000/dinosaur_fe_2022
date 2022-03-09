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
class App extends Component {
  constructor(props){
    super(props);
  }

  chooseNavbarItem = (index) => {
    let items = document.querySelectorAll('.dino__navbar__item');
    for (let i=0;i<items.length;i++){
      items[i].classList.remove('active');
    }
    items[index].classList.add('active');
  }

  render(){
    return (
      <div className="main">
        <BrowserRouter>
          <Navbar choose={(index)=>{this.chooseNavbarItem(index)}}></Navbar>
          <div className="main__board container">
            <Switch>
              <Route exact path="/" component={Home}></Route>
              <Route exact path="/login" component={Login}></Route>
              <Route exact path="/register" component={Register}></Route>
              <Route exact path="/list" component={List}></Route>
              <Route exact path="/blog" component={Blog}></Route>
              <Route exact path="/detail/:name/:id" component={Detail}></Route>
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
