
import React, {Component} from 'react'
import {Link, hashHistory} from 'react-router'
import {Modal, Toast} from 'antd-mobile'
import utils from '../../common/utils'
import { relatedAgreeLogin } from "../../Stubs/API";
import {phoneCheck, userPassCheck} from '../Login/loginUtils'
import PhoneTemplate from '../Login/PhoneTemplate'
import UserNameTemplate from '../Login/UserNameTemplate'
import {saveUserName} from '../Login/loginUtils'
import CommonNavBar from '../CommonComts/CommonNavBar'
import '../../Style/loginRelated/loginRelated.less'

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
    const paramArr = location.hash.split('?')[location.hash.split('?').length - 1].split('&');
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
  confirmLogin() {
    let params = {
      uid: this.state.uid
    }
    relatedAgreeLogin(params).then(result => {
      if (result.code !== '0') {
        Toast.info(result.desc, 1, null, false)
      } else {
        saveUserName(this.state.phone)
        sessionStorage.removeItem('userData')
        hashHistory.push('my')
      }
    })
  }
  render() {
    return (
      <div id="loginRelated">
        <div className="imgBox">
          <div className="imgDiv"><img src={this.state.imgUrl ? this.state.imgUrl : require('../../Img/defalut_heard.png')} /></div>
          <p className="p1">{this.state.uid}</p>
          <p className="p2">你的微信账号已绑定以上9188彩票账户，是否直接登录</p>
        </div>
        <div className="btnBox">
          <a className="loginBtn1 m_b40" onClick={this.confirmLogin.bind(this)}>确认</a>
          <a className="loginBtn2" onClick={() => {
            hashHistory.push('Login')
          }}>使用其他账号登录</a>
        </div>
      </div>
    )
  }
}
export default LoginIndex
