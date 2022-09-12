import React, { Component } from 'react'
import Puzzle from "./components/Puzzle/Puzzle";
import Fireworks from "./components/Fireworks/Fireworks";
import OpeList from "./components/OpeList/OpeList";
import "./GamePage.less"

export default class GamePage extends Component {

  render() {
    return (
      <div id='GamePage'>
        <div className='bgImageContainer'>
          <img src={require('assets/images/bg.jpg')} alt="" />
        </div>
        <div className='logoContainer'>
          <img src={require('assets/images/logo.png')} alt="" />
        </div>
        <Puzzle />
        <OpeList />
        <Fireworks />
      </div>
    )
  }
}