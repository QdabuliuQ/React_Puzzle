import React, { Component } from 'react'
import "animate.css";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import PageBg from "./components/PageBg/PageBg";
import BtnList from "./components/BtnList/BtnList";
import Footer from "./components/Footer/Footer";
import "./HomePage.less";

export default class HomePage extends Component {
  render() {
    return (
      <div id='HomePage'>
        <PageBg />
        <ReactCSSTransitionGroup
          className='logo'
          transitionEnter={true}
          transitionLeave={true}
          transitionEnterTimeout={2500}
          transitionLeaveTimeout={1500}
          transitionName="animated"
        >
          <div className="animate__animated animate__bounceInDown animate__delay-0.5s animate__slow" >
            <img src={require('assets/images/logo.png')} alt="" />
          </div>
        </ReactCSSTransitionGroup>
        <BtnList />
        <Footer />
      </div>
    )
  }
}
