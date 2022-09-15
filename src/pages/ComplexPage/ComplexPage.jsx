import React, { Component } from 'react'
import PageBg from "pages/HomePage/components/PageBg/PageBg";
import Puzzle from "./components/Puzzle/Puzzle";
import "./ComplexPage.less"

export default class ComplexPage extends Component {
  render() {
    return (
      <div id='ComplexPage'>
        <PageBg />
        <div className='logoContainer'>
          <img src={require('assets/images/logo.png')} alt="" />
        </div>
        <Puzzle />
      </div>
    )
  }
}
