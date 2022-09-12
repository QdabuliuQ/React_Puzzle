import React, { Component, createRef } from 'react'
import { Mask } from 'antd-mobile'
import PubSub from 'pubsub-js'
import "./Fireworks.less"
import ScatterFlowers from "utils/success";

export default class Fireworks extends Component {
  state = {
    isShow: false,
    visible: false,
    audioRef: createRef()
  }

  success = () => {
    let dpr = 0
    let devicePixelRatio = window.devicePixelRatio;
    if (devicePixelRatio >= 3) {
      dpr = 3;
    } else if (devicePixelRatio >= 2) {
      dpr = 2;
    } else {
      dpr = 1;
    }
    window.dpr = dpr;
    this.scatterFlowers = new ScatterFlowers({
      canvas: document.getElementById('FireworksCanvas'),
      flowersColor: [[
        '250,174,255-60-11', '244,150,255-80-63', '247,197,255-100-100'
      ], [
        '255,255,255-80-25', '255,169,108-100-100'
      ], [
        '195,255,176-80-0', '69,197,117-100-100'
      ], [
        '79,213,255-80-0', '43,187,250-100-100'
      ]],
      faceColor: '255,200,44-100', // 笑脸颜色
      eyeColor: '76,64,65-100', // 眼睛颜色
      mouthColor: '255,109,64-100', // 笑嘴颜色
      flowersLength: 60,
      autoStart: true
    });
  }

  componentDidMount() {
    PubSub.subscribe('success', () => {
      this.setState({
        visible: true
      }, () => {
        setTimeout(() => {
          // 庆祝动画
          this.state.audioRef.current.play()
          this.success()
        }, 500);
      })
    })
  }

  render() {
    const { isShow, audioRef, visible } = this.state

    return (
      // <div style={{zIndex: isShow ? 5 : -1}} id='Fireworks'>
      <div id='Fireworks'>
        <Mask
          visible={visible}
          onMaskClick={() => this.setState({
            visible: false
          })}
          opacity='thick'>
          <audio ref={audioRef} src={require('assets/audios/success.wav')}></audio>
          <img className={[visible ? 'showSuccessIcon' : '', 'successIcon'].join(' ')} src={require('assets/images/success.png')} alt="" />
          <img className={[visible ? 'showSuccessBgLight' : '', 'successBglight'].join(' ')} src={require("assets/images/success_bgLight.png")} alt="" />
          {
            visible && <canvas onClick={() => this.setState({
              visible: false
            })} id='FireworksCanvas'></canvas>
          }
        </Mask>

      </div>
    )
  }
}