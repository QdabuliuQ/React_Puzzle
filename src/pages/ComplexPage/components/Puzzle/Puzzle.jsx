import React, { Component } from 'react'
import PubSub from 'pubsub-js'
import { SpinLoading, Toast } from 'antd-mobile'
import { getRandomImage } from "network/index";
import download from "utils/download";
import PuzzleItem from "components/PuzzleItem/PuzzleItem";
import "./Puzzle.less"

let token1;
let token2;
let token3;
let token4;
let startx, starty;
export default class Puzzle extends Component {

  state = {
    randomList: [],
    imageList: [],
    containWidth: 0,
    isLoad: true,
    itemWidth: 0,
    imageUrl: '',
    mode: 3,
    gap: 5,  // 图片间隙
    moveIndex: 0,
    moveLeft: 0,
    moveTop: 0
  }

  // 获取图片url
  getImageUrl = () => {
    // getRandomImage().then(res => {
    //   this.state.imageUrl = res.replace('https://tuapi.eees.cc', '/api1')
    //   const image = new Image()
    //   image.src = this.state.imageUrl
    //   image.crossOrigin = '';
    //   image.onload = () => {
    //     let size = image.width > image.height ? image.height : image.width
    //     this.computedCanvas(image, size)
    //   }
    // })
    this.setState({
      imageUrl: require('assets/images/coder.jpg')
    }, () => {
      const image = new Image()
      image.src = this.state.imageUrl
      image.crossOrigin = '';
      image.onload = () => {
        let size = image.width > image.height ? image.height : image.width
        this.computedCanvas(image, size)
      }
    })
  }

  // 切割图片
  computedCanvas = (image, size) => {
    let tempList = []
    let width = size / this.state.mode
    let k = 1
    for (let j = 0; j < this.state.mode; j++) {
      for (let i = 0; i < this.state.mode; i++) {
        if (i != this.state.mode - 1 || j != this.state.mode - 1) {
          const canvas = document.createElement('canvas')
          const ctx = canvas.getContext('2d')
          canvas.width = width
          canvas.height = width
          canvas.style.width = '100%'
          ctx.drawImage(image, i * width, j * width, width, width, 0, 0, width, width)
          tempList.push({
            ...this.computedAxis(k - 1, 'x', 'y'),
            index: k,
            base64: canvas.toDataURL("image/png")
          })
        }
        k++
      }
    }
    this.setState({
      imageList: tempList
    }, () => {
      this.randomList()
    })
  }

  // 打乱数组元素
  randomList = () => {
    let temp = [...this.state.imageList]
    temp.sort((item) => {
      return Math.random() - 0.5
    })
    let i = this.state.mode * this.state.mode
    temp.push({
      ...this.computedAxis(i - 1, 'x', 'y'),
      index: i,
      moveIndex: i,
    })
    for (let i = 0; i < temp.length; i++) {
      temp[i] = Object.assign(temp[i], { moveIndex: i + 1 }, this.computedAxis(i));
    }
    this.setState({
      randomList: temp,
      isLoad: false
    })
  }

  // 计算坐标
  computedAxis = (index, propertyName_x = 'left', propertyName_y = 'top') => {
    console.log(index, this.state.mode, '---');
    let left;
    let top;
    if (index == 0) {
      left = index % this.state.mode * this.state.itemWidth + 'px'
      top = Math.floor(index / this.state.mode) * this.state.itemWidth + 'px'
    } else if (index != 0 && index < this.state.mode) {
      left = index % this.state.mode * this.state.itemWidth + (this.state.gap * (index % this.state.mode)) + 'px'
      top = Math.floor(index / this.state.mode) * this.state.itemWidth + 'px'
    } else if (index % this.state.mode == 0) {
      left = index % this.state.mode * this.state.itemWidth + 'px'
      top = Math.floor(index / this.state.mode) * this.state.itemWidth + (this.state.gap * Math.floor(index / this.state.mode)) + 'px'
    } else {
      left = index % this.state.mode * this.state.itemWidth + (this.state.gap * (index % this.state.mode)) + 'px'
      top = Math.floor(index / this.state.mode) * this.state.itemWidth + (this.state.gap * Math.floor(index / this.state.mode)) + 'px'
    }
    return {
      [propertyName_x]: left,
      [propertyName_y]: top
    }
  }

  // 移动拼图
  movePuzzleItem = (targetIndex) => {
    let temp = [...this.state.randomList]
    for (let [index, item] of this.state.randomList.entries()) {
      if (item.moveIndex == targetIndex) {
        let t_left = item.left
        let t_top = item.top
        let m_index = item.moveIndex
        temp[index].left = this.state.moveLeft
        temp[index].top = this.state.moveTop
        temp[index].moveIndex = this.state.moveIndex
        this.setState({
          randomList: temp,
          moveLeft: t_left,
          moveTop: t_top,
          moveIndex: m_index
        }, () => {
          this.checkPuzzle()
        })
        break;
      }
    }
  }

  touchEndEvent = (e) => {
    let mode = this.state.mode * this.state.mode
    let endx, endy;
    endx = e.changedTouches[0].pageX;
    endy = e.changedTouches[0].pageY;
    let direction = this.getDirection(startx, starty, endx, endy);
    switch (direction) {
      case 1:
        if (this.state.moveIndex + this.state.mode <= mode) {
          this.movePuzzleItem(this.state.moveIndex + this.state.mode)
        }
        break;
      case 2:
        if (this.state.moveIndex - this.state.mode >= 0) {
          this.movePuzzleItem(this.state.moveIndex - this.state.mode)
        }
        break;
      case 3:
        if (this.state.moveIndex + 1 <= mode && this.state.moveIndex % this.state.mode != 0) {
          this.movePuzzleItem(this.state.moveIndex + 1)
        }
        break;
      case 4:
        if (this.state.moveIndex - 1 >= 0 && this.state.moveIndex % this.state.mode != 1) {
          this.movePuzzleItem(this.state.moveIndex - 1)
        }
        break;
      default:
    }
  }
  touchStartEvent = (e) => {
    startx = e.touches[0].pageX;
    starty = e.touches[0].pageY;
  }
  // 检查是否完成
  checkPuzzle = () => {
    for (const item of this.state.randomList) {
      if (item.x != item.left || item.y != item.top) {
        return
      }
    }
    PubSub.publish('success')
  }
  //根据起点终点返回方向 1向上 2向下 3向左 4向右 0未滑动
  getDirection = (startx, starty, endx, endy) => {
    let angx = endx - startx;
    let angy = endy - starty;
    let result = 0;

    //如果滑动距离太短
    if (Math.abs(angx) < 2 && Math.abs(angy) < 2) {
      return result;
    }

    let angle = this.getAngle(angx, angy);
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
    let width = (document.documentElement.clientWidth - 30) / this.state.mode
    this.setState({
      moveIndex: this.state.mode * this.state.mode,
      itemWidth: width,
      containWidth: width * this.state.mode + ((this.state.mode - 1) * this.state.gap)
    })
    this.getImageUrl()

    //手指接触屏幕
    document.addEventListener("touchstart", this.touchStartEvent, false);
    //手指离开屏幕
    document.addEventListener("touchend", this.touchEndEvent, false);

    setTimeout(() => {
      let { x, y } = this.computedAxis(this.state.mode * this.state.mode - 1, 'x', 'y')
      this.setState({
        moveLeft: x,
        moveTop: y
      })
    }, 100);

    // 替换图片
    token1 = PubSub.subscribe('replace', () => {
      this.setState({
        isLoad: true
      }, () => {
        this.getImageUrl()
      })
    }) 

    // 保存图片
    token2 = PubSub.subscribe('save', () => {
      download(this.state.imageUrl, 'image')
    })

    // 重新排序图片
    token3 = PubSub.subscribe('rank', () => {
      this.setState({
        isLoad: true
      }, () => {
        this.randomList()
      })
    })

    // 模式切换
    token4 = PubSub.subscribe('modeChange', (msg, e) => {
      this.setState({
        isLoad: true,
        itemWidth: (this.state.containWidth - (e - 1) * this.state.gap) / e,
        mode: e,
        moveIndex: e * e
      }, () => {
        const image = new Image()
        image.src = this.state.imageUrl
        image.crossOrigin = '';
        let {x, y} = this.computedAxis(e*e - 1, 'x', 'y')
        this.setState({
          moveLeft: x,
          moveTop: y
        })
        image.onload = () => {
          let size = image.width > image.height ? image.height : image.width
          this.computedCanvas(image, size)
        }
      })
    })
  }

  componentWillUnmount() {
    document.removeEventListener('touchstart', this.touchStartEvent)
    document.removeEventListener('touchend', this.touchEndEvent)

    PubSub.unsubscribe(token1)
    PubSub.unsubscribe(token2)
    PubSub.unsubscribe(token3)
    PubSub.unsubscribe(token4)
  }

  render() {
    const { isLoad, randomList, containWidth, itemWidth } = this.state

    return (
      <div id='Puzzle'>
        <div style={{ width: containWidth + 'px' }} className='puzzleContainer'>
          {
            isLoad && (
              <div className='loadMask'>
                <SpinLoading style={{ '--color': '#eaad30', '--size': '100px' }} />
              </div>
            )
          }
          {
            randomList.map((value, index) => (
              <PuzzleItem
                i={value.index}
                key={index}
                image={value.base64}
                size={itemWidth}
                left={value.left}
                top={value.top}
                index={index} />
            ))
          }
        </div>
      </div>
    )
  }
}
