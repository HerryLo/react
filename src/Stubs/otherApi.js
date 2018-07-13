import APIUtils from './apiUtils'

/**
 * 第三方车轮信息 openID&accesstoken
 * @param params
 * @returns {*|Promise.<TResult>}
 */
export const authorizeToCL = (params)=> {
  return APIUtils.commonPost('/user/authorizeToCL.go', params)
}

export const hzzc = ()=> {
  return APIUtils.jsonGet('/news/ad/parterconfig.js')
}
