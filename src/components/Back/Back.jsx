import React, { Component } from 'react'
import PubSub from 'pubsub-js'
import { Navigate } from "react-router-dom";
import "./Back.less"

export default class Back extends Component {
  state = {
    back: false
  }
  backEvent = () => {
    PubSub.publish('clickItem')
    this.setState({
      back: true
    })
  }

  render() {
    const {back} = this.state

    return (
      <div id='Back'>
        {
          back && <Navigate to={-1} />
        }
        <img onClick={this.backEvent} src={require('assets/images/back.png')} alt="" />
      </div>
    )
  }
}
