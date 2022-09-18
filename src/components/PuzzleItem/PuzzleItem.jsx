import React, { Component } from 'react'
import PubSub from 'pubsub-js'
import "./PuzzleItem.less";

export default class PuzzleItem extends Component {
  clickEvent = () => {
    if (this.props.clickEvent) {
      PubSub.publish('clickItem')
      this.props.clickEvent(this.props.index)
    }
  }
  render() {
    const {i, image, size, left, top, index, activeIndex} = this.props
    return (
      <div 
        index={i}
        onClick={this.clickEvent} 
        style={{
          width: size + 'px',
          height: size + 'px',
          left, 
          top,
        }} 
        className={[activeIndex == index ? 'activePuzzleItem' : '' ,'puzzleItem', '__'+i].join(' ')}>
        <img src={image} alt="" />
      </div>
    )
  }
}
