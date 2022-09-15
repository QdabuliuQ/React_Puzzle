import React, { Component } from 'react'

var startx, starty;
export default class Puzzle extends Component {

  touchEndEvent = (e) => {
    var endx, endy;
    endx = e.changedTouches[0].pageX;
    endy = e.changedTouches[0].pageY;
    var direction = this.getDirection(startx, starty, endx, endy);
    switch (direction) {
      case 0:
        console.log("未滑动！");
        break;
      case 1:
        console.log("向上！")
        break;
      case 2:
        console.log("向下！")
        break;
      case 3:
        console.log("向左！")
        break;
      case 4:
        console.log("向右！")
        break;
      default:
    }
  }
  touchStartEvent = (e) => {
    startx = e.touches[0].pageX;
    starty = e.touches[0].pageY;
  }
  //根据起点终点返回方向 1向上 2向下 3向左 4向右 0未滑动
  getDirection = (startx, starty, endx, endy) => {
    var angx = endx - startx;
    var angy = endy - starty;
    var result = 0;

    //如果滑动距离太短
    if (Math.abs(angx) < 2 && Math.abs(angy) < 2) {
      return result;
    }

    var angle = this.getAngle(angx, angy);
    if (angle >= -135 && angle <= -45) {
      result = 1;
    } else if (angle > 45 && angle < 135) {
      result = 2;
    } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
      result = 3;
    } else if (angle >= -45 && angle <= 45) {
      result = 4;
    }
    return result;
  }
  //获得角度
  getAngle = (angx, angy) => {
    return Math.atan2(angy, angx) * 180 / Math.PI;
  };

  componentDidMount() {
    //手指接触屏幕
    document.addEventListener("touchstart", this.touchStartEvent, false);
    //手指离开屏幕
    document.addEventListener("touchend", this.touchEndEvent, false);
  }

  componentWillUnmount() {
    document.removeEventListener('touchstart', this.touchStartEvent)
    document.removeEventListener('touchend', this.touchEndEvent)
  }

  render() {
    return (
      <div>

      </div>
    )
  }
}
