import React, { Component } from 'react'
import PubSub from 'pubsub-js'
import "./OpeList.less"

export default class OpeList extends Component {
  replaceEvent = () => {
    PubSub.publish('clickItem')
    PubSub.publish('replace')
  }
  saveEvent = () => {
    PubSub.publish('clickItem')
    PubSub.publish('save')
  }
  rankEvent = () => {
    PubSub.publish('clickItem')
    PubSub.publish('rank')
  }

  render() {
    return (
      <div id='OpeList'>
        <img onClick={this.replaceEvent} src={require('assets/images/replace.png')} alt="" />
        <img onClick={this.rankEvent} src={require('assets/images/recreate.png')} alt="" />
        <img onClick={this.saveEvent} src={require('assets/images/save.png')} alt="" />
      </div>
    )
  }
}