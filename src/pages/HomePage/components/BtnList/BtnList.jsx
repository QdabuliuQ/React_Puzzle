import React, { Component } from 'react'
import PubSub from 'pubsub-js'
import { Navigate } from "react-router-dom";
import "animate.css";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import "./BtnList.less"

export default class BtnList extends Component {
  
  state = {
    isClick: false,
    toggle: null
  }

  selectMode = (path) => {
    PubSub.publish('clickItem')
    this.setState({
      isClick: true
    }, () => {
      setTimeout(() => {
        this.setState({
          toggle: path
        })
      }, 700);
    })
  }

  // 动画结束回调
  transitionEndEvent = (path) => {
    console.log(path);
    this.setState({
      toggle: path
    })
  }

  render() {
    let {isClick, toggle} = this.state

    return (
      <div id='BtnList'>
        {
          toggle && <Navigate to={toggle} />
        }
        <ReactCSSTransitionGroup
            transitionEnter={true}
            transitionLeave={true}
            transitionEnterTimeout={2500}
            transitionLeaveTimeout={1500}
            transitionName="animated"
          >
            <div className="animate__animated animate__flipInY animate__slow" >
              <img className='title' src={require('assets/images/title.png')} alt="" />
            </div>
          </ReactCSSTransitionGroup>
        <div className={[isClick?'activeBtnItem':'', 'btnItem', 'easyBtn'].join(' ')}>
          <ReactCSSTransitionGroup
            transitionEnter={true}
            transitionLeave={true}
            transitionEnterTimeout={2500}
            transitionLeaveTimeout={1500}
            transitionName="animated"
          >
            <div className="animate__animated animate__bounceInLeft animate__slow" >
              <img onClick={() => this.selectMode('/GamePage')} src={require('assets/images/easy.png')} alt="" />
            </div>
          </ReactCSSTransitionGroup>
        </div>
        <div className={[isClick?'activeBtnItem':'', 'btnItem', 'easyBtn'].join(' ')}>
          <ReactCSSTransitionGroup
            transitionEnter={true}
            transitionLeave={true}
            transitionEnterTimeout={2500}
            transitionLeaveTimeout={1500}
            transitionName="animated"
          >
            <div className="animate__animated animate__bounceInRight animate__slow" >
              <img onClick={() => this.selectMode('/ComplexPage')} src={require('assets/images/complex.png')} alt="" />
            </div>
          </ReactCSSTransitionGroup>
        </div>
      </div>
    )
  }
}
