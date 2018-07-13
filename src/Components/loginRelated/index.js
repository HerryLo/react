import React, { Component } from 'react'
import { Link, hashHistory } from 'react-router'
// import '../../Style/loginRelated/loginRelated.less'

// import {relatedCodeForInfo} from '../../Stubs/API'

//新登录页面
class LoginIndex extends Component {
    constructor() {
        super(...arguments)
    }
    render() {
        let { children } = this.props;
        let content;
        if (children) {
            content = children
        } else {
            content = (
                <div>
                    <h2>跳转页</h2>
                </div>
            )
        }
        return (
            <div>
                {content}
            </div>
        )
    }
}
export default LoginIndex
