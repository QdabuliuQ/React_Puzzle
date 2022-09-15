import React, { Component } from 'react'
import "./PageBg.less"

export default class PageBg extends Component {
  render() {
    return (
      <div id='PageBg'>
        <img src={require('assets/images/bg.jpg')} alt="" />
      </div>
    )
  }
}
