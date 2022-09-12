import React, { Component } from 'react'
import { SpinLoading, Toast } from 'antd-mobile'
import PubSub from 'pubsub-js'
import { getRandomImage } from "network/index";
import PuzzleItem from "components/PuzzleItem/PuzzleItem";
import "./Puzzle.less"

export default class Puzzle extends Component {
  state = {
    isLoad: true,
    imageUrl: '', // 图片url
    mode: 3,  // 3*3
    imageList: [],  // 小图片数组
    randomList: [],  // 小图片乱序
    itemWidth: 0,
    gap: 5,  // 图片间隙
    containWidth: 0,  // 拼图容器的宽度
    activeIndex: -1,  // 被点击的拼图
  }

  // 切割图片
  computedCanvas = (image, size) => {
    let tempList = []
    let width = size / this.state.mode
    let k = 1
    for (let j = 0; j < this.state.mode; j++) {
      for (let i = 0; i < this.state.mode; i++) {
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
        k++
      }
    }
    this.setState({
      imageList: tempList
    }, () => {
      this.randomList()
    })
  }

  // 获取图片url
  getImageUrl = () => {
    getRandomImage().then(res => {
      this.state.imageUrl = res.replace('https://tuapi.eees.cc', '/api1')
      const image = new Image()
      image.src = this.state.imageUrl
      image.crossOrigin = '';
      image.onload = () => {
        let size = image.width > image.height ? image.height : image.width
        this.computedCanvas(image, size)
      }
    })
  }

  // 打乱数组元素
  randomList = () => {
    let temp = [...this.state.imageList]
    temp.sort((item) => {
      return Math.random() - 0.5
    })
    for (let i = 0; i < temp.length; i++) {
      temp[i] = Object.assign(temp[i],this.computedAxis(i));
    }
    this.setState({
      randomList: temp,
      isLoad: false
    })
  }

  // 计算坐标
  computedAxis = (index, propertyName_x = 'left', propertyName_y = 'top') => {
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

  // 拼图点击
  puzzleItemClick = (e) => {
    if (e == this.state.activeIndex) {
      this.setState({
        activeIndex: -1,
      })
    } else if (this.state.activeIndex == -1) {
      this.setState({
        activeIndex: e,
      })
    } else {  // 交换拼图位置
      // 获取 activeIndex 上一个点击的拼图索引
      let temp = JSON.parse(JSON.stringify(this.state.randomList))
      let e_left = temp[e].left
      let e_top = temp[e].top
      temp[e].left = temp[this.state.activeIndex].left
      temp[e].top = temp[this.state.activeIndex].top
      temp[this.state.activeIndex].left = e_left
      temp[this.state.activeIndex].top = e_top
      this.setState({
        activeIndex: -1,
        randomList: temp
      })
      this.checkPuzzle(temp)
    }
  }

  checkPuzzle = (arr) => {
    for (let i = 1; i < arr.length; i++) {
      if ((arr[i].left != arr[i].x) || (arr[i].top != arr[i].y)) {
        return
      }
    }
    PubSub.publish('success')
  }

  downloadIamge = (imgsrc, name) => {//下载图片地址和图片名
    let image = new Image();
    // 解决跨域 Canvas 污染问题
    image.setAttribute("crossOrigin", "anonymous");
    image.onload = function() {
      let canvas = document.createElement("canvas");
      canvas.width = image.width;
      canvas.height = image.height;
      let context = canvas.getContext("2d");
      context.drawImage(image, 0, 0, image.width, image.height);
      let url = canvas.toDataURL("image/png"); //得到图片的base64编码数据
      let a = document.createElement("a"); // 生成一个a元素
      let event = new MouseEvent("click"); // 创建一个单击事件
      a.download = name || "photo"; // 设置图片名称
      a.href = url; // 将生成的URL设置为a.href属性
      a.dispatchEvent(event); // 触发a的单击事件
      Toast.clear()
      Toast.show({
        icon: 'success',
        content: '下载成功',
      })
    };
    image.src = imgsrc;
  }

  componentDidMount() {
    let width = (document.documentElement.clientWidth - 30) / this.state.mode
    this.setState({
      itemWidth: width,
      containWidth: width * this.state.mode + ((this.state.mode - 1) * this.state.gap)
    })
    this.getImageUrl()
    
    // 替换图片
    PubSub.subscribe('replace', () => {
      this.setState({
        isLoad: true
      }, () => {
        this.getImageUrl()
      })
    })  
    
    // 保存图片
    PubSub.subscribe('save', () => {
      Toast.show({
        icon: 'loading',
        content: '下载中',
      })
      this.downloadIamge(this.state.imageUrl, 'image')
    })

    // 重新排序图片
    PubSub.subscribe('rank', () => {
      this.setState({
        isLoad: true
      }, () => {
        this.randomList()
      })  
    })
  }

  render() {
    const { isLoad, randomList, itemWidth, containWidth, activeIndex, imageList } = this.state
    return (
      <div id='Puzzle'>
        <div style={{ width: containWidth + 'px' }} className='puzzleContainer'>
          {
            isLoad && (
              <div className='loadMask'>
                <SpinLoading style={{'--color': '#eaad30', '--size': '100px' }} />
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
                index={index}
                activeIndex={activeIndex}
                clickEvent={this.puzzleItemClick} />
              )
            )
          }
        </div>
      </div>
    )
  }
}
