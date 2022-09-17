import React, { Component } from 'react'
import PageBg from "pages/HomePage/components/PageBg/PageBg";
import Puzzle from "./components/Puzzle/Puzzle";
import Fireworks from "pages/GamePage/components/Fireworks/Fireworks";
import OpeList from "pages/GamePage/components/OpeList/OpeList";
import ToggleLevel from "pages/GamePage/components/ToggleLevel/ToggleLevel";
import Back from "components/Back/Back";
import "./ComplexPage.less"

export default class ComplexPage extends Component {
  render() {
    return (
      <div id='ComplexPage'>
        <Back />
        <PageBg />
        <div className='logoContainer'>
          <img src={require('assets/images/logo.png')} alt="" />
        </div>
        <Puzzle />
        <OpeList />
        <ToggleLevel />
        <Fireworks />
      </div>
    )
  }
}
