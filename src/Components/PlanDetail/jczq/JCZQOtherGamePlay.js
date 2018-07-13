import React, {Component} from "react";
import utils from "../../../common/fangAnUtils";
import commonConfig from '../../../config/commonConfig'
import {PlanNumber} from '../../../common/LotType'
import _ from 'lodash'

// 其他玩法 结构
class OtherGameplay extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let {item, ResultsState, HalfScore, index, gid, source, gyj, items ,result} = this.props;
    let tdrowSpanLen = '';
    let reState = ''
    let code = ''
    let codeKey = []
    let codes = ''
    if (gid === '98' || gid === '99') {
      tdrowSpanLen = 2
      console.log(123, items)
      codes = PlanNumber[gid][0] + '：'
      if (!Array.isArray(items)) {
        items = [items]
      }
      _.each(items, it => {
        codes += `${it.name} (${it.spvalue})，`
      })
      codes = codes.substring(0, codes.length - 1)
    } else {
      code = utils.CcodesSplit(item, gid);
      codeKey = Object.keys(code);
      reState = ResultsState();
      tdrowSpanLen = codeKey && codeKey.length + 1;
    }

    return (
      <tbody key={index ? index : 1}>
      <tr>
        {!gyj &&
        <td className="td4" rowSpan={tdrowSpanLen}>
          <p>{item.name.substring(0, 2)}</p>
          <p>{item.name.substring(2, 5)}</p>
        </td>
        }
        {
          gyj ?
            <td className="td5">
              <span>{commonConfig.sjb}</span>
            </td>
            :
            <td className="td5">
            <span>
              <span className="span3 blackColor">
                {item.isdan == '1' ? <span className="redColor">(胆)</span> : ''}
                {item.hn.substring(0, 5)}</span>
              <span className="span4 blackColor">vs</span>
              <span className="span5 blackColor">{item.gn.substring(0, 5)}</span>
            </span>
            </td>
        }
        {(gid !== '98' && gid !== '99') &&
        (reState ? (
          item.hs != "" ? (
            <td className="td6">
              {Boolean(item.hs)
                ? `${item.hs}:${item.gs}${HalfScore(item)}`
                : ""}
              <br/>
              <span>{gid && gid == "92" && `(半/全)`}</span>
            </td>
          ) : (
            <td className="td6" rowSpan={1}>
              {item.jsbf}
            </td>
          )
        ) : (
          <td className="td6" rowSpan={tdrowSpanLen}>
            开赛后公开<p/>
          </td>
        ))}
        {
          (gid === '98' || gid === '99') &&
          <td className="td6" rowSpan={tdrowSpanLen}>
            {result.result?result.result:''}
          </td>
        }
      </tr>
      {reState
        ? code &&
        codeKey.map((item1, index) => {
          let lotResult = "";
          let fontRedClass = "";
          let value = {close: item.lose};
          const score = {
            hs: item.hs,
            gs: item.gs,
            hhs: item.hhs,
            hgs: item.hgs
          };
          let co = utils.JCCcodeAnalysis(
            item1,
            code[item1],
            gid,
            item.lose
          );
          let result = utils.lotResult(score, value, item1);
          return (
            <tr key={index}>
              <td className="td5">
                {`${(source == "8" || source == "14") ? '2选1' : co.lotType}${co.lose}:`}
                {co[co.lotType].map((it, index) => {
                  fontRedClass = it.desc == result ? "redColor" : "";
                  return (
                    <span key={index}>
                          <span className={fontRedClass}>
                            {it.desc}({it.odds})
                          </span>
                        </span>
                  );
                })}
              </td>
            </tr>
          );
        })
        : <tr></tr>}
      {
        (gid === '98' || gid === '99') &&
        <tr>
          <td className="td5">
            <span>{codes}</span>
          </td>
          <td className={`td6 redColor`}>{''}</td>
        </tr>
      }
      </tbody>
    );
  }
}

class OtherGameplayJudge extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(11111)
    const {row, gid, ResultsState, HalfScore, source, gyj, items,result} = this.props;
    console.log(gyj, items)
    return (
      <table cellSpacing="0" cellPadding="0" className="programmeTable">
        <thead>
        {gyj ?
          <tr>
            <th className="th11">联赛/投注选项</th>
            <th className="th6">彩果</th>
          </tr>
          :
          <tr>
            <th className="th4">场次</th>
            <th className="th5">主队vs客队/投注选项</th>
            <th className="th6">彩果</th>
          </tr>}

        </thead>
        {typeof row == "object" &&
        (row instanceof Array ? (
          row.map((item, index) => {
            return (
              <OtherGameplay
                key={index}
                gyj={gyj}
                item={item}
                items={items}
                result={result}
                gid={gid}
                index={index}
                ResultsState={ResultsState}
                HalfScore={HalfScore}
                source={source}
              />
            );
          })
        ) : (
          <OtherGameplay
            item={row}
            gid={gid}
            items={items}
            result={result}
            gyj={gyj}
            ResultsState={ResultsState}
            HalfScore={HalfScore}
            source={source}
          />
        ))}
      </table>
    );
  }
}

export default OtherGameplayJudge;
