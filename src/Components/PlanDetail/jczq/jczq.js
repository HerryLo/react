"use strict";
import React, {Component} from "react";
import TopIcon from "../common/topIcon";
import Progress from "../common/progress";
import FootBtn from "../common/footBtn";
import utils from "../../../common/fangAnUtils";
import {lotPlanDetail, szcPlanDetail} from "../../../Stubs/API";
import Awinner from "./Awinner";
import OtherGameplay from "./JCZQOtherGamePlay";
import JJYHList from "./JJYHList";
import FootDesc from "../common/footDesc";
import TableTicket from "../common/tableTicket";

class JczqDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contHeight: 0,
      gid: 70,
      hid: "",
      lotName: "",
      gp: "",
      data: {},
      gyj: false
    };
    this.initialize = this.initialize.bind(this);
    this.ResultsState = this.ResultsState.bind(this);
    this.HalfScore = this.HalfScore.bind(this);
    this.DataJudge = this.DataJudge.bind(this);
  }

  componentWillMount() {
    const {gid, hid} = this.props.location.query;
    let gyj = false;
    if (gid === '98' || gid === '99') {
      gyj = true
    }
    this.setState(
      {
        gid: gid,
        hid: hid,
        gyj: gyj
      },
      () => {
        this.initialize();
      }
    );
  }

  componentDidMount() {
    let height = utils.setHeight();
    let progFootDomHeight = document.getElementsByClassName('programmeFooter');
    if (progFootDomHeight) {
      height = height - progFootDomHeight[0].offsetHeight;
    }
    this.setState({
      contHeight: height
    });
  }

  initialize() {
    const {hid, gid} = this.state;
    if (gid === '98' || gid === '99') {
      szcPlanDetail(hid, gid).then(res => {
        this.setState({
          data: res
        });
        return true;
      });
    } else {
      lotPlanDetail(hid, gid).then(res => {
        this.setState({
          data: res
        });
        return true;
      });
    }

  }

  /**
   * 数据判断
   * 奖金优化与一般订单 数据结构存在差异
   * @param {*} data
   */
  DataJudge(d) {
    if (d.row || d.matchs) {
      return d.row || d.matchs.row;
    }
  }

  /**
   * 赛果 显示结构判断
   */
  ResultsState() {
    const {data,gid} = this.state;
    if(gid==='98' || gid==='99'){
      return true
    }
    if (data.shareGod) {
      if (data.shareGod == 2 && data.showCode == false) {
        //神单状态
        return false;
      } else if (data.shareGod) {
        return true;
      }
    }
  }

  /**
   * 竞彩足球 半全场显示判断
   * @param {*} da
   */
  HalfScore(data) {
    const {gid} = this.state;
    if (data) {
      if (gid == "92") {
        return `/${data.hhs}:${data.hgs}`;
      } else {
        return "";
      }
    }
    return;
  }

  render() {
    const {contHeight, data, gid, hid, gyj} = this.state;
    let row = this.DataJudge(data);
    let items = data.item || []
    let result = data.result || {}
    let AWJJStat = utils.AwinnerState(data.source);
    return (
      <div>
        {data.row &&
        <div className="programmeDetails listDivView" style={{height: contHeight}}>
          {/*顶部 icon*/}
          <TopIcon data={data} gid={gid}/>
          {/*进度 金额*/}
          <Progress data={data} gid={gid}/>
          {/*方案内容*/}
          <div className="titleDiv">方案内容</div>
          {
            (gid === '98' || gid === '99') && !data.source &&
            <OtherGameplay
              gyj={gyj}
              row={row}
              items={items}
              result={result}
              gid={gid}
              ResultsState={this.ResultsState}
              HalfScore={this.HalfScore}
              source={data.source}
            />
          }
          {/* 竞彩足球 一场制胜特殊判断, 其中单关与串关也不同*/}
          {data.source &&
          (data.source != "15" ? (
            <OtherGameplay
              gyj={gyj}
              row={row}
              items={items}
              result={result}
              gid={gid}
              ResultsState={this.ResultsState}
              HalfScore={this.HalfScore}
              source={data.source}
            />
          ) : (
            <Awinner
              row={row}
              gid={gid}
              ResultsState={this.ResultsState}
              HalfScore={this.HalfScore}
            />
          ))}
          <TableTicket data={data} gyj={gyj} state={true} gid={gid} hid={hid}/>
          {
            data.detail && <JJYHList detail={data.detail} source={data.source}/>
          }
          {
            <FootDesc hid={hid} state={true}/>
          }
        </div>
        }
        <FootBtn jindu={data.jindu} shareGod={data.shareGod} gid={gid}/>
      </div>
    );
  }
}

export default JczqDetail;
