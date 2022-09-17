import React, { Component } from 'react'
import { Navigate } from "react-router-dom";
import "./Back.less"

export default class Back extends Component {
  state = {
    back: false
  }

  render() {
    const {back} = this.state

    return (
      <div id='Back'>
        {
          back && <Navigate to={-1} />
        }
        <img onClick={() => this.setState({
          back: true
        })} src={require('assets/images/back.png')} alt="" />
      </div>
    )
  }
}
