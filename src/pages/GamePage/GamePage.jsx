import React, { Component } from 'react'
import Puzzle from "./components/Puzzle/Puzzle";
import Fireworks from "./components/Fireworks/Fireworks";
import OpeList from "./components/OpeList/OpeList";
import ToggleLevel from "./components/ToggleLevel/ToggleLevel";
import Back from "components/Back/Back";
import "./GamePage.less"

export default class GamePage extends Component {
  state = {
    end: false
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        end: true
      })
    }, 100);
  }

  render() {
    const {end} = this.state
    return (
      <div id='GamePage'>
        <div className='bgImageContainer'>
          <img src={require('assets/images/bg.jpg')} alt="" />
        </div>
        <div className='logoContainer'>
          <img src={require('assets/images/logo.png')} alt="" />
        </div>
        <Back />
        <Puzzle />
        <OpeList />
        <ToggleLevel />
        <Fireworks />
      </div>
    )
  }
}