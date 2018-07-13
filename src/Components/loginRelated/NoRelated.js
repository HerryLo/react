import React, { Component } from 'react'
import { Link, hashHistory } from 'react-router'
import '../../Style/loginRelated/loginRelated.less'
import { browser } from '../../common/AppApi'

//新登录页面
class LoginIndex extends Component {
  constructor() {
    super(...arguments)
    this.state = {
      imgUrl: '',
      uid: ''
    }
  }
  componentWillMount() {
    console.log(location.search);
    console.log(browser.versions._weixin);
    const paramArr = location.hash.split('?')[location.hash.split('?').length - 1].split('&');
    console.log(paramArr);
    paramArr.forEach((item) => {
      let arr = item.split('=');
      if (arr[0] === 'imgUrl') {
        this.setState({
          imgUrl: arr[1]
        })
      }
      else if (arr[0] === 'uid') {
        this.setState({
          uid: decodeURI(arr[1])
        })
      }
    })
  }
  render() {
    return (
      <div id="loginRelated">
        <div className="imgBox">
          <div className="imgDiv"><img src={this.state.imgUrl ? this.state.imgUrl : require('../../Img/defalut_heard.png')} /></div>
          <p className="p1">{this.state.uid}</p>
        </div>
        <div className="btnBox">
          <p>你还没有9188彩票账号？</p>
          <a className="loginBtn1" onClick={() => {
            hashHistory.push('loginRelated/registerConnect')
          }}>注册关联</a>
          <p>已有9188彩票账号？</p>
          <a className="loginBtn2" onClick={() => {
            hashHistory.push('loginRelated/loginConnect')
          }}>登录关联</a>
        </div>
        <div className="footerBox" onClick={() => {
          hashHistory.push('Login')
        }}>使用9188彩票账号直接登录</div>

      </div >
    )
  }
}
export default LoginIndex
