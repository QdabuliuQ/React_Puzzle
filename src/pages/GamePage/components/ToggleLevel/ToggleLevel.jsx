import React, { Component, createRef } from 'react'
import PubSub from 'pubsub-js'
import { Swiper } from 'antd-mobile'
import "./ToggleLevel.less"

let swiperRef = createRef();
let timer = null
export default class ToggleLevel extends Component {
  state = {
    modeList: [
      {
        mode: 3,
        image: require('assets/images/3x3.png')
      },
      {
        mode: 4,
        image: require('assets/images/4x4.png')
      },
      {
        mode: 5,
        image: require('assets/images/5x5.png')
      },
    ],
  }

  swiperChange = (e) => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      PubSub.publish('modeChange', this.state.modeList[e].mode)
    }, 400);
  }

  render() {
    const {modeList} = this.state

    return (
      <div id='ToggleLevel'>
        <img onClick={() => swiperRef.current.swipePrev()} className='arrowIcon leftIcon' src={require('assets/images/left.png')} alt="" />
        <Swiper onIndexChange={this.swiperChange} ref={swiperRef} indicator={() => null} slideSize={70} trackOffset={15} loop stuckAtBoundary={false}>
          {
            modeList.map(item => (
              <Swiper.Item key={item.mode}>
                <div className='btnItem'>
                  <img src={item.image} alt="" />
                </div>
              </Swiper.Item>
            ))
            
          }
        </Swiper>
        <img onClick={() => swiperRef.current.swipeNext()} className='arrowIcon rightIcon' src={require('assets/images/right.png')} alt="" />
      </div>
    )
  }
}
