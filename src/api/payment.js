import http from '../lib/http'

//获取费用项目确认表
export const getPaymentConfirmation = (id) => {
  return http.request({
    url: '/getPaymentConfirmation/' + id,
    method: 'get'
  })
}
//更新费用项目确认表
export const updatePaymentConfirmation = (id) => {
  return http.request({
    url: '/updatePaymentConfirmation/' + id,
    method: 'post'
  })
}
//获取业务项目确认表
export const getProjectConfirmation = (id) => {
  return http.request({
    url: '/getProjectConfirmation/' + id,
    method: 'get'
  })
}
//更新业务项目确认表
export const updateProjectConfirmation = (id) => {
  return http.request({
    url: '/updateProjectConfirmation/' + id,
    method: 'post'
  })
}
//获取咨询记录logcall
export const getLogcallList = () => {
  return http.request({
    url: '/getLogcallList',
    method: 'get'
  })
}
//获取付费批次
export const getPayBatchList = () => {
  return http.request({
    url: '/getPayBatchList',
    method: 'get'
  })
}
//生成文件
export const mergePDF = (params) => {
  return http.request({
    url: '/mergePDF',
    method: 'post'
  })
}
//批量更新状态
export const updateLogcallStatus = (params) => {
  return http.request({
    url: '/updateLogcallStatus',
    method: 'post'
  })
}
//更新拒绝通过理由
export const updateRejectReason = (params) => {
  return http.request({
    url: '/updateRejectReason',
    method: 'post'
  })
}

//关联账户
export const getRelationAccount = (params) => {
  return http.request({
    url: '/getRelationAccount',
    method: 'get'
  })
}

export const relationAccount = (params) => {
  return http.request({
    url: '/relationAccount',
    method: 'post'
  })
}

//加入批次
export const joinPayBatch = (params) => {
  return http.request({
    url: '/joinPayBatch',
    method: 'get'
  })
}

//生成批次
export const createPayBatch = (params) => {
  return http.request({
    url: '/createPayBatch',
    method: 'post'
  })
}

//更新批次状态
export const updatePayBatch = (params) => {
  return http.request({
    url: '/updatePayBatch',
    method: 'post'
  })
}

//获取付费列表
export const getPaymentList = (params) => {
  return http.request({
    url: '/getPaymentList',
    method: 'get'
  })
}

//更新payment表
export const updatePayment = (params) => {
  return http.request({
    url: '/updatePayment',
    method: 'get'
  })
}

export const packageToFinance = (params) => {
  return http.request({
    url: '/packageToFinance',
    method: 'post'
  })
}

export const packageToOut = (params) => {
  return http.request({
    url: '/packageToOut',
    method: 'post'
  })
}

