'use strict'
import React, {Component} from 'react'
import {Flex, Toast} from 'antd-mobile';
import CommonNavBar from '../../CommonComts/CommonNavBar'
import {hashHistory} from 'react-router'
import '../../../Style/lotteryBetting/champion.less'
import "../../../Style/lotteryBetting/mixedPop.less"
import _ from 'lodash'
import utils from '../../../common/utils'
import {AppJiek} from '../../../common/AppApi'

import {
  ShiJieBeiGJ,
  ShiJieBeiGYJ,
  userBasicInfo
} from '../../../Stubs/API'

class LotteryBetting extends Component {
  constructor(...args) {
    super(...args)
    this.state = {
      GJListdata: [],
      GYJListdata: [],

      GJChoseData: [],
      GJChoseDataSP: [],
      GYJChoseData: [],
      GYJChoseDataSP: [],

      tabchosename: 'gj',
      GYJCountryName: [
        {
          ChoseName: "全部",
          ChoseType: true,
        }, {
          ChoseName: "德国",
          ChoseType: false,
        }, {
          ChoseName: "巴西",
          ChoseType: false,
        }, {
          ChoseName: "阿根廷",
          ChoseType: false,
        }, {
          ChoseName: "法国",
          ChoseType: false,
        }, {
          ChoseName: "西班牙",
          ChoseType: false,
        }, {
          ChoseName: "英格兰",
          ChoseType: false,
        }, {
          ChoseName: "葡萄牙",
          ChoseType: false,
        }, {
          ChoseName: "比利时",
          ChoseType: false,
        }, {
          ChoseName: "俄罗斯",
          ChoseType: false,
        }, {
          ChoseName: "乌拉圭",
          ChoseType: false,
        }, {
          ChoseName: "哥伦比亚",
          ChoseType: false,
        }, {
          ChoseName: "克罗地亚",
          ChoseType: false,
        }],
      GYJCountryChoseArry: [],
      beiNum: 10,
      minBei: 1,
      maxBei: 99,
      pid: 18001,
      listHeight: ''
    };
    this.doOrder = this.doOrder.bind(this);
    this.setBeiNum = this.setBeiNum.bind(this)
    this.ClassNameFilter = this.ClassNameFilter.bind(this)
    this.ChoseTeam = this.ChoseTeam.bind(this)
    this.GetGYJListdata = this.GetGYJListdata.bind(this)
    this.TabChange = this.TabChange.bind(this)
    this.GYJCountryChose = this.GYJCountryChose.bind(this)
    this.PayTotal = this.PayTotal.bind(this)
    this.GetBonces = this.GetBonces.bind(this)
    this.computeHeight = this.computeHeight.bind(this)
  }

  componentWillMount() {
    ShiJieBeiGJ().then(res => {
      res.data.map(item => {
        item['choseType'] = false
      })
      this.setState({
        GJListdata: res.data,
        // pid: res.data[0]['mid']
      })
    })
  }

  componentDidMount() {
    this.computeHeight()
  }
  computeHeight(){
    let allHeight = utils.setHeight()
    let ulHeight = this.refs.tabUl.clientHeight
    let footHeight = this.refs.championFooter.clientHeight
    this.setState({
      listHeight:allHeight-ulHeight-footHeight
    })
  }
  GetGYJListdata(CountryItem, CountryIndex) {
    const _this = this

    let countryname = CountryItem.ChoseName || ''
    let getChoseNameAry = []
    _.forEach(_this.state.GYJCountryName, (item) => {
      if (item.ChoseType && item.ChoseName !== '全部') {
        getChoseNameAry.push(item.ChoseName)
      }
    })
    console.log(getChoseNameAry)
    // let getRex = eval("/"+countryname+"/")
    ShiJieBeiGYJ().then(res => {
      let data = []
      if (countryname === '全部') {
        data = res.data
      } else {
        let getData = res.data
        let arry = []
        _.forEach(getChoseNameAry, (choseItem) => {
          _.forEach(getData, (item, index) => {
            if (item.name.indexOf(choseItem) != -1) {
              arry.push(item)
            }
          })
        })
        arry.sort(utils.compare('cindex'))
        data = _.uniqBy(arry, 'cindex');
      }

      this.setState({
        GYJListdata: data,
        // pid: res.data[0]['mid']
      })
    })
  }

  setBeiNum(e) {
    console.log(e.target.value)
    let value = e.target.value;
    value = value.replace(/\D/g, '')
    if (value > this.state.maxBei) {
      value = this.state.maxBei
      Toast.info('最多可以投' + value + '倍', 1, null, false)
    } else if (value === '0') {
      value = 1
    }
    this.setState({
      beiNum: value
    })
  }

  ClassNameFilter(item) {
    let obj={
      divClass:'',
      logoClass:''
    }
    if (item.isale === '0') {
      if (item.rs === '0') {
        obj.divClass='fail'
        obj.logoClass='championFail'
      } else {
        if (this.state.tabchosename === 'gj') {
          obj.divClass = this.state.GJChoseData.indexOf(item.cindex) != -1
            ? 'on' : ''
        } else if (this.state.tabchosename === 'gyj') {
          obj.divClass = this.state.GYJChoseData.indexOf(item.cindex) != -1
            ? 'on' : ''
        }
      }
    } else if (item.isale === '1') {
      obj.divClass = 'stop'
      obj.logoClass = 'championStop'
    }
    return obj
  }

  ChoseTeam(item, index, TargetChoseData) {
    const _this = this
    console.log(item, index)
    const cindex = item.cindex
    const sp = item.sp
    if (item.cl === '0' && item.isale === '0' &&  item.rs!=='0') {
      let ChoseData = _this.state[TargetChoseData]
      let ChosdDataSP = _this.state[`${TargetChoseData}SP`]
      ChoseData.indexOf(cindex) != -1 ? (
        _.remove(ChoseData, function (n) {
          return n == cindex;
        }),
        _.remove(ChosdDataSP, function (n) {
          return n.cindex == item.cindex;
        }),
        _this.setState({
          [TargetChoseData]: ChoseData,
          [`${TargetChoseData}SP`]: ChosdDataSP
        }, () => {
          _this.computeHeight()
        })
      ) : (
        ChoseData.push(cindex),
        ChosdDataSP.push(item),
        _this.setState({
          [TargetChoseData]: ChoseData,
          [`${TargetChoseData}SP`]: ChosdDataSP
        }, () => {
          _this.computeHeight()
        })
      )
      // _this.state.GJListdata[index]['choseType'] = !_this.state.GJListdata[index]['choseType']
      // _this.setState({
      //   GJListdata: _this.state.GJListdata
      // })
    }
  }

  TabChange(tabname) {
    const _this = this
    this.setState({
      tabchosename: tabname
    }, () => {
      this.computeHeight()
      tabname === 'gyj' ? _this.GetGYJListdata({ChoseName: '全部'}) : ''
    })
  }

  GYJCountryChose(CountryItem, index) {
    let getGYJCountry = this.state.GYJCountryName

    getGYJCountry[index]['ChoseType'] = !getGYJCountry[index]['ChoseType']
    if (index === 0 && getGYJCountry[index]['ChoseType']) {
      for (var i = 1; i < getGYJCountry.length; i++) {
        getGYJCountry[i]['ChoseType'] = false
      }
      this.setState({
        GYJCountryName: getGYJCountry
      })
      this.GetGYJListdata(CountryItem, index)
    } else if (
      getGYJCountry.findIndex((item, index) => {
        return item.ChoseType && index > 0
      }) != -1
    ) {
      getGYJCountry[0]['ChoseType'] = false
      this.setState({
        GYJCountryName: getGYJCountry
      })
      this.GetGYJListdata(CountryItem, index)
    } else {
      getGYJCountry[0]['ChoseType'] = true
      this.GetGYJListdata(getGYJCountry[0], 0)
    }

  }

  async doOrder(params, type) {
    let flag = await utils.checkLogin()
    if (!flag) {
      AppJiek.thirdAppLoginCheck(() => {
        hashHistory.push({
          pathname: '/champion/login',
          query: {
            flag: type
          }
        })
      }, flag)
    } else {
      let phone = '';
      let idCard = ''
      await userBasicInfo().then(result => {
        if (result.code === '0') {
          let row = result.row;
          phone = row.mobbind;
          idCard = row.idcard;
        }
      })
      if (!phone || phone === '0') {
        utils.showAlert('温馨提示', '该账户未绑定手机号', '去绑定', () => {
          hashHistory.push({
            pathname: 'jczqBet/editMobile',
            query: {
              needBack: true
            }
          })
        })
      } else if (!idCard) {
        utils.showAlert('温馨提示', '该账户未绑定身份证', '去绑定', () => {
          hashHistory.push({
            pathname: 'jczqBet/editIdCard',
            query: {
              needBack: true
            }
          })
        })
      } else {
        let imoney = params.imoney
        // if (imoney > betConfig.buyLimit.jczq) {
        //   Toast.info('最高投注金额' + betConfig.buyLimit.jczq + '元', 1, null, false)
        //   return
        // }
        console.log('params:', params)
        let active = this.state.tabchosename
        let gid = ''
        let codes = '';
        let chooseInfo = params.chooseInfo;
        //以下部分是拼投注内容，不知哪个二货后台定的接口 每个彩种玩法拼法都有差异，后人保重
        switch (active) {
          case 'gj':
            // V GYJ|14001=1/3/4/2
            gid = 98
            codes = `GJ|${this.state.pid}=${this.state.GJChoseData.join('/')}`
            break;
          case 'gyj':
            gid = 99
            codes = `GYJ|${this.state.pid}=${this.state.GYJChoseData.join('/')}`
            break;
          default:

            break;
        }
        console.log('投注内容：', codes)

        params.gid = gid;
        params.codes = codes;
        params.money = imoney;

        hashHistory.push({
          pathname: '/jczqBet/order',
          state: {
            params: params
          }
        })
      }

    }
  }

  PayTotal() {
    const _this = this
    const ChoseDataName = _this.state.tabchosename == 'gj' ? 'GJChoseData' : 'GYJChoseData'
    let getMax = _.maxBy(_this.state[`${ChoseDataName}SP`], (o) => { return +o.sp; })
    let getMin = _.minBy(_this.state[`${ChoseDataName}SP`], (o) => { return +o.sp; })
    this.doOrder({
      pid: _this.state.pid,
      beiNum: _this.state.beiNum,
      betNum: _this.state[ChoseDataName].length,
      imoney: _this.state[ChoseDataName].length * 2 * _this.state.beiNum,
      bonus: {
        max: (getMax.sp * 2 * _this.state.beiNum).toFixed(2),
        min: (getMin.sp * 2 * _this.state.beiNum).toFixed(2)
      }
    }, 'needBack')
  }

  GetBonces(){
    const _this = this
    const ChoseDataName = _this.state.tabchosename == 'gj' ? 'GJChoseData' : 'GYJChoseData'
    if (_this.state[`${ChoseDataName}SP`].length == 0) {
      return ''
    } else{
      let getMax = _.maxBy(_this.state[`${ChoseDataName}SP`], (o) => { return +o.sp; })
      let getMin = _.minBy(_this.state[`${ChoseDataName}SP`], (o) => { return +o.sp; })
      let bonce = {
        max: (getMax.sp * 2 * _this.state.beiNum).toFixed(2),
        min: (getMin.sp * 2 * _this.state.beiNum).toFixed(2)
      }
      if (_this.state[`${ChoseDataName}SP`].length == 1) {
        return <p className="p2">预测奖金<span>{bonce.max}</span>元</p>
      } else {
        return <p className="p2">预测奖金<span>{`${bonce.min}~${bonce.max}`}</span>元</p>
      }
    }
  }
  render() {
    const _this = this
    let {children} = this.props;
    let content;
    if (children) {
      content = children
    }

    return (
      <div id="champion">
        {children && content}
        <div style={{display: children ? 'none' : ''}} >
          <CommonNavBar title="冠军／冠亚军"/>
          <ul className="tabUl clearfix" ref="tabUl">
            <li className={this.state.tabchosename === 'gj' ? 'on' : ''} onClick={() => {
              this.TabChange('gj')
            }}>冠军游戏
            </li>
            <li className={this.state.tabchosename === 'gyj' ? 'on' : ''} onClick={() => {
              this.TabChange('gyj')
            }}>冠亚军游戏
            </li>
          </ul>
          {/*冠军游戏*/}
          <div className="listDivView" style={{height:this.state.listHeight}}>
            <div style={{display: this.state.tabchosename === 'gj' ? 'block' : 'none'}}>
              <Flex wrap="wrap" justify="between" className="championFlex">
                {
                  this.state.GJListdata.length > 0 ? this.state.GJListdata.map((item, index) => {
                    return (
                      <div
                        className='championBox'
                        key={index}
                        onClick={() => {
                          _this.ChoseTeam(item, index, 'GJChoseData')
                        }}>
                        <div className={`championBox_info ${this.ClassNameFilter(item).divClass}`}>
                          <p className="p1">{item.name}</p>
                          <p className="p2" style={{'display':
                            (item.isale === '1' || item.rs === '0') ? 'none' : 'block' 
                          }}>
                            {`${(+item.sp).toFixed(2)}` || '--'}
                          </p>
                          <div className={`${this.ClassNameFilter(item).logoClass}`}></div>
                          <div className="championTop">{item.cindex}</div>
                        </div>
                        {
                          item.rs === '0' ? <p className="p3">--</p> : <p className="p3">概率{item.gl}</p>
                        }
                      </div>
                    )
                  }) : ''
                }
                <div className="championBox">

                </div>
              </Flex>
            </div>
            {/*冠亚军游戏*/}
            <div style={{display: this.state.tabchosename === 'gyj' ? 'block' : 'none',position:'relative'}}>
              <div className="championTab">
                <ul>
                  {
                    this.state.GYJCountryName.map((item, index) => {
                      return (
                        <li
                          key={index}
                          className={item.ChoseType === true ? 'on' : ''}
                          onClick={() => {
                            this.GYJCountryChose(item, index)
                          }}>
                          {item.ChoseName}
                        </li>
                      )
                    })
                  }
                </ul>
              </div>

              <Flex wrap="wrap" justify="between" className="championFlex">
                {
                  this.state.GYJListdata.length > 0 ? this.state.GYJListdata.map((item, index) => {
                    return (
                      <div
                        className='championBox championBox_2'
                        key={index}
                        onClick={() => {
                          _this.ChoseTeam(item, index, 'GYJChoseData')
                        }}>
                        <div className={`championBox_info ${this.ClassNameFilter(item).divClass}`}>
                          <p className="p1">{item.name}</p>
                          <p className="p2" style={{ 'display': 
                              (item.isale === '1' || item.rs === '0') ? 'none' : 'block' 
                            }}>
                            {`${(+item.sp).toFixed(2)}` || '--'}
                          </p>
                          <div className={`${this.ClassNameFilter(item).logoClass}`}></div>
                          <div className="championTop">{item.cindex}</div>
                        </div>
                        {
                          item.rs === '0' ? <p className="p3">--</p> : <p className="p3">概率{item.gl}</p>
                        }
                      </div>
                    )
                  }) : ''
                }
              </Flex>
            </div>
          </div>
          {/*底部投注*/}
          <div className="championFooter" ref="championFooter">
            <div className="div1">
              {
                this.GetBonces()
              }
              <p className="p1">
                {
                   this.state[_this.state.tabchosename == 'gj' ? 'GJChoseData' : 'GYJChoseData'].length > 0 
                    ? 
                  '奖金=赔率×投入金额，赔率请以出票值为准': '页面赔率仅作参考，请以出票赔率为准'
                }
                <span onClick={()=>{hashHistory.push('champion/wanfa?type=sjb')}}/></p>
            </div>
            <div className="div2">
              <div className="inptBox">
                <span>投</span>
                <input type="tel"
                       onBlur={v => {
                         if (v.target.value === '' || v.target.value === '0') {
                           _this.setState({beiNum: _this.state.minBei})
                         }
                       }}
                       onChange={_this.setBeiNum.bind(this)}
                       value={this.state.beiNum}
                />
                <span>倍</span>
              </div>
              {
                this.state[_this.state.tabchosename == 'gj' ? 'GJChoseData' : 'GYJChoseData'].length > 0
                  ?
                  <a href="javascript:;" className="btnA_2" onClick={() => {
                    this.PayTotal()
                  }}>立即支付
                    {
                      this.state[_this.state.tabchosename == 'gj' ? 'GJChoseData' : 'GYJChoseData'].length * 2 * this.state.beiNum
                    }元</a>
                  :
                  <a href="javascript:;" className="btnA_1">{this.state.tabchosename==='gj'?'请选择冠军球队':'请选择冠亚军球队'}</a>
              }
              {/*可点击状态 btnA_2  立即支付120元*/}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default LotteryBetting
