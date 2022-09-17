import React, { Component } from 'react'
import { Navigate } from "react-router-dom";
import "animate.css";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import "./BtnList.less"

export default class BtnList extends Component {
  
  state = {
    isClick: false,
    toggle: null
  }

  selectMode = () => {
    this.setState({
      isClick: true
    })
  }

  // 动画结束回调
  transitionEndEvent = (path) => {
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
        <div onTransitionEnd={() => this.transitionEndEvent('/GamePage')} className={[isClick?'activeBtnItem':'', 'btnItem', 'easyBtn'].join(' ')}>
          <ReactCSSTransitionGroup
            transitionEnter={true}
            transitionLeave={true}
            transitionEnterTimeout={2500}
            transitionLeaveTimeout={1500}
            transitionName="animated"
          >
            <div className="animate__animated animate__bounceInLeft animate__slow" >
              <img onClick={this.selectMode} src={require('assets/images/easy.png')} alt="" />
            </div>
          </ReactCSSTransitionGroup>
        </div>
        <div onTransitionEnd={() => this.transitionEndEvent('/ComplexPage')} className={[isClick?'activeBtnItem':'', 'btnItem', 'easyBtn'].join(' ')}>
          <ReactCSSTransitionGroup
            transitionEnter={true}
            transitionLeave={true}
            transitionEnterTimeout={2500}
            transitionLeaveTimeout={1500}
            transitionName="animated"
          >
            <div className="animate__animated animate__bounceInRight animate__slow" >
              <img onClick={this.selectMode} src={require('assets/images/complex.png')} alt="" />
            </div>
          </ReactCSSTransitionGroup>
        </div>
      </div>
    )
  }
}
