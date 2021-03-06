'use strict'
import React, {Component} from 'react'
import LotteryNum from "../../common/HighlotteryNum";
import {Popover} from 'antd-mobile';
import ZhuShou from '../../common/zhushou'
const Item = Popover.Item;
export class ErXingZuXuanHeZhi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      omitState: false
    }
    this.bigShow = this.bigShow.bind(this);
    this.bigHide = this.bigHide.bind(this);
    this.Template = this.Template.bind(this);
    this.TemplateOmit = this.TemplateOmit.bind(this);
    this.omitStateJudge = this.omitStateJudge.bind(this);
    this.omitJudge = this.omitJudge.bind(this);
    this.clickItem = this.clickItem.bind(this);
    this.receiveYL = this.receiveYL.bind(this);
  }
  //接受popover传回的遗漏
  receiveYL(yl) {
    this.setState({
      omitState: yl
    })
  }
  clickItem(e) {
    const {chooseList, callChoose} = this.props;
    let dataset = e.target.dataset;
    let i = dataset.v;
    let type = dataset.type;
    let active = dataset.active;
    let arr = JSON.parse(JSON.stringify(chooseList[active][type]));
    if (arr.indexOf(i) >= 0) {
      arr = arr.slice(0, arr.indexOf(i)).concat(arr.slice(arr.indexOf(i) + 1));
    } else {
      arr.push(i);
    }
    let choose = JSON.parse(JSON.stringify(chooseList));
    choose[active][type] = JSON.parse(JSON.stringify(arr));
    callChoose(choose);
  }

  bigShow(e) {
    let a = e.target.nextElementSibling;
    a.classList.add("active");
    this.clickItem(e);
  }

  bigHide(e) {
    let a = e.target.nextElementSibling;
    setTimeout(() => {
      a.classList.remove("active");
    }, 200);
  }

  Template(start, end, type, color) {
    const {chooseList} = this.props;
    const {active} = this.props;
    let st = start;
    let en = end;
    let ty = type;
    let child = [];
    let choose = "";
    if (ty == "kil") {
      choose = chooseList[active].kil;
      ty = "kil";
    } else if (ty == "mir") {
      choose = chooseList[active].mir;
      ty = "mir";
    } else if (ty == "ten") {
      choose = chooseList[active].ten;
      ty = "ten";
    } else if (ty == "hun") {
      ty = "hun";
      choose = chooseList[active].hun;
    } else if (ty == "unit") {
      ty = "unit";
      choose = chooseList[active].unit;
    }
    for (let i = st; i <= en; i++) {
      let value = `${i}`;
      child.push(
        <div className={choose.indexOf(value) > -1 ? `redBg` : ""} key={i}>
          <p
            data-v={value}
            data-type={ty}
            data-active={active}
            onTouchStart={this.bigShow.bind(this)}
            onTouchEnd={this.bigHide.bind(this)}
          >
            {value}
          </p>
          {color ? (
            <p className="hoverRedBg">
              <span>{value}</span>
            </p>
          ) : (
            ""
          )}
        </div>
      );
    }
    return child;
  }

  TemplateOmit(start, end, arr) {
    if (arr) {
      let child = [];
      for (let i = start - 1; i < end; i++) {
        let value = arr[i];
        child.push(<div key={i}>{value}</div>);
      }
      return child;
    }
    return false;
  }

  omitStateJudge() {
    const {omitState} = this.state;
    this.setState({
      omitState: !omitState
    })
  }

  omitJudge() {
    const {active, omit} = this.props;
    if (active && omit) {
      if (active == '1') {
        return omit.m6.split(',')
      } else if (active == '2' || active == '3') {
        return omit.m5.split(',')
      } else if (active == '4') {
        return omit.m4.split(',')
      }
    }
    return false;

  }

  render() {
    const {
      ConHeight,
      omit,
      HistoryStage,
      nowStage,
      HistoryStageFunc,
      active,
      gid,
      desc,
      Judgeactive,
      callChoose,
      chooseList
    } = this.props;
    const {omitState} = this.state;
    const m9 = omit && omit.m9.split(',')
    return (
      <div id="lotteryBetting">
        <div className="sscBetting">
          <LotteryNum
            nowStage={nowStage}
            HistoryStage={HistoryStage}
            HistoryStageFunc={HistoryStageFunc}
            active={active}
            gid={gid}
            serverTime={this.props.serverTime}
          />
          {/*选号*/}
          <div className="redBallTitle">
            <p className="p4"><span onClick={() => {
              this.props.creatOne()
            }
            }>摇一摇机选</span></p>
            <p className="p2" dangerouslySetInnerHTML={{__html: desc}}></p>
            <ZhuShou receiveYL={this.receiveYL} yilouShow={this.state.omitState} type={this.props.type}/>
          </div>
          <div className="BallChoice redBallChoice">
            <div className="column">
              {this.Template(0, 4, 'unit', 'red')}
            </div>
            <div className="column_missing" style={{ display: omitState ? "flex" : "none" }}>
              {this.TemplateOmit(1,5, m9)}
            </div>
            <div className="column">
              {this.Template(5, 9, 'unit', 'red')}
            </div>
            <div className="column_missing" style={{ display: omitState ? "flex" : "none" }}>
              {this.TemplateOmit(6,10, m9)}
            </div>
            <div className="column">
              {this.Template(10, 14, 'unit', 'red')}
            </div>
            <div className="column_missing" style={{ display: omitState ? "flex" : "none" }}>
              {this.TemplateOmit(11,15, m9)}
            </div>
            <div className="column">
              {this.Template(15, 18, 'unit', 'red')}
              <div className="emptyDiv"></div>
            </div>
            <div className="column_missing" style={{ display: omitState ? "flex" : "none" }}>
              {this.TemplateOmit(16,19, m9)}
              <div className="emptyDiv"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

