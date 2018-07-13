'use strict'
import React, {Component} from 'react'
import "../../Style/lotteryBetting/wanFa.less"
import Img30 from "../../Img/lotteryBetting/30.png"
import Img70 from "../../Img/lotteryBetting/70.png"

class WanFaSJB extends Component {

  render() {
    return (
      <div className="wrapSJB">
        <h1>冠军游戏</h1>
        <p className="p1">本玩法是中国竞彩官方所售玩法，猜中世界杯冠军球队即中奖。</p>
        <p className="titleP">1.如何计算奖金</p>
        <p className="p2">奖金 = 出票赔率 × 单注2元 × 投注倍数</p>
        <p className="p3">(赔率指当你猜对冠军球队时，每投入1元可获得的奖金值)</p>
        <p className="p2">示例：</p>
        <div className="blueBox">
          <p className="p4">巴西</p>
          <p className="p5">3.00</p>
        </div>
        <p className="p6">投注巴西获得冠军的出票赔率为3.00，投注5倍，猜中可获得的奖金值为：</p>
        <img src={Img30} />
        <p className="titleP">2.赔率为什么会实时变动？</p>
        <p className="p2">投注量的实时变化会造成赔率变动，页面赔率可能和最终出票赔率略有差异，请以出票赔率为准。</p>
        <p className="p10">温馨提示：<br />
          *球队夺冠赔率根据赛况变动，越早投注赔率越高。<br />
          *在保证盈利的前提下，合理投注多支球队可以增加中奖概率哦。</p>

        <div className="lineBox"></div>

        <h1>冠亚军游戏</h1>
        <p className="p1">本玩法是中国竞彩官方所售玩法，猜中进入决赛的两支队伍即中奖。</p>
        <p className="titleP">1.如何计算奖金</p>
        <p className="p2">奖金 = 出票赔率 × 单注2元 × 投注倍数</p>
        <p className="p3">(赔率指当你猜对冠亚军球队时，每投入1元可获得的奖金值)</p>
        <p className="p2">示例：</p>
        <div className="blueBox">
          <p className="p4">巴西&德国</p>
          <p className="p5">7.00</p>
        </div>
        <p className="p6">投注巴西&德国获得冠亚军的出票赔率为7.00，投注5倍，猜中可获得的奖金值为：</p>
        <img src={Img70} />
        <p className="titleP">2.赔率为什么会实时变动？</p>
        <p className="p2">投注量的实时变化会造成赔率变动，页面赔率可能和最终出票赔率略有差异，请以出票赔率为准。</p>
        <p className="p10">温馨提示：<br />
          *冠亚军组合的赔率根据赛况变动，越早投注赔率越高。<br />
          *在保证盈利的前提下，合理投注多种冠亚组合可以增加中奖概率哦。</p>
      </div>
    )
  }
}

export default WanFaSJB

