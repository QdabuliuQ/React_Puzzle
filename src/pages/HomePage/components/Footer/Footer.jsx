import React, { Component } from 'react'
import { Popover } from 'antd-mobile'
import "animate.css";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import "./Footer.less"

export default class Footer extends Component {
  content = (
    <div className='popoverContent'>
      <div className='title'>开源项目 <img src={require('assets/images/github.png')} alt="" /></div>
      <a href="https://github.com/QdabuliuQ/React_Puzzle">https://github.com/QdabuliuQ/React_Puzzle</a>
      <ReactCSSTransitionGroup
        className='logo'
        transitionEnter={true}
        transitionLeave={true}
        transitionEnterTimeout={2500}
        transitionLeaveTimeout={1500}
        transitionName="animated"
      >
        <div className="animate__animated animate__rubberBand animate__infinite " >
          <p className='tip'>点个star再走吧</p>
        </div>
      </ReactCSSTransitionGroup>

    </div>
  )

  render() {
    return (
      <div id='Footer'>
        <img className='element' src={require('assets/images/homeElement.png')} alt="" />
        <Popover
          mode='dark'
          trigger='click'
          content={
            this.content
          }
          placement='left'>
          <div className='coderBox'>
            <img className='coder' src={require('assets/images/coder.jpg')} alt="" />
          </div>
        </Popover>
      </div>
    )
  }
}
