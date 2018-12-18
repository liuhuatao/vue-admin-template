import Mock from 'mockjs'
import {doCustomTimes} from '@/lib/util'

const Random = Mock.Random

//专家劳务费确认表
export const getPaymentConfirmation = req => {
  let data = {
    projectId: '@projectId', //项目编号
    client: '@client', //客户名称
    id: '@id', //合同编号
    expertName: '@expertName', //专家姓名
    expertId: '@expertId', //专家编号
    expertEmail: '@expertEmail', //专家邮箱
    expertMobile: '@expertMobile', //联系电话
    type: '@type', //付费类型1.咨询费2.推荐费
    projectStart: '@projectStart', //开始时间
    consultationType: '@consultationType', //咨询类型
    projectEffect: '@projectEffect', //咨询效果概述
    clientReportedDuration: '@clientReportedDuration', //服务时长
    needtoPay: '@needtoPay', //专家劳务费小写金额
    needtoPayChinese: '@needtoPayChinese', //专家劳务费大写金额
    expertBankAccount: '@expertBankAccount', //银行卡号
    expertIdnumber: '@expertIdnumber',  //身份证
    expertBank: '@expertBank', //开户行
    expertBankDetail: '@expertBankDetail', //开户行详细
    sign: '@sign', //签名
    projectRemarks: '@projectRemarks', //备注
  }
  data = Mock.mock(data);
  return data
}
//专家劳务费确认表
export const updatePaymentConfirmation = req => {
  let data;
  data = Mock.mock({});
  return data
}

//专家咨询项目确认表
export const getProjectConfirmation = req => {
  let data;
  data = Mock.mock({
    projectId: '@projectId', //项目编号
    client: '@client', //客户名称
    id: '@id', //合同编号
    consultationType: '@consultationType', //咨询方式
    projectOrderStart: '@projectOrderStart', //意向咨询服务日期
    projectOrderTopic: '@projectOrderTopic', //咨询项目概述
    sign: '@sign', //签名
    expertName: '@expertName', //专家姓名
    expertId: '@expertId', //专家编号
    expertEmail: '@expertEmail', //专家邮箱
    expertMobile: '@expertMobile', //联系电话
    expertIndustry: '@expertIndustry', //所属行业
    expertCompany: '@expertCompany', //所属公司
    jobTitle: '@jobTitle', //专家职位
    jobStatus: '@jobStatus', //专家任职状态
    projectOrderRelationship: '@projectOrderRelationship', //可能存在利益冲突的任何第三方关系
    projectOrderInformation: '@projectOrderInformation', //其他信息
    expertBank: '@expertBank',  //专家银行
    needtoPay: '@needtoPay', //专家劳务费小写金额
    needtoPayChinese: '@needtoPayChinese', //专家劳务费大写金额
    projectRemarks: '@projectRemarks', //备注
  });
  return data
}
//专家咨询项目确认表
export const updateProjectConfirmation = req => {
  let data;
  data = Mock.mock({});
  return data
}

export const getLogcallList = req => {
  let data = []
  doCustomTimes(5, () => {
    data.push(Mock.mock({
      consultationType: '@consultationType', //咨询类型
      date: '@date', //咨询日期
      expertName: '@expertName', //专家
      projectId: '@projectId', //项目编号
      projectName: '@projectName', //项目名称
      pm: '@pm', //PM
      client: '@client', //客户
      status: '@status', //状态
      time: '@time', //时长  clientReportedDuration+'/'+expertReportedDuration
      payType: '@payType', //付费类型 小时 场次
      payMoney: '@payMoney', //支付金额
      clientInvoiceName: '', //账户
      mergePdfUrl: '', //专家付费文件
      referrerId: '', //推荐费 若有referrerId则有推荐费
      displine:'/',
      tutor:'/',
      acceptionAttachment:'/'
    }))
  })
  doCustomTimes(5, () => {
    data.push(Mock.mock({
      consultationType: '@consultationType', //咨询类型
      date: '@date', //咨询日期
      expertName: '@expertName', //专家
      projectId: '@projectId', //项目编号
      projectName: '@projectName', //项目名称
      pm: '@pm', //PM
      client: '@client', //客户
      status: '待申请付费', //状态
      time: '@time', //时长  clientReportedDuration+'/'+expertReportedDuration
      payType: '@payType', //付费类型 小时 场次
      payMoney: '@payMoney', //支付金额
      clientInvoiceName: '@clientInvoiceName', //账户
      mergePdfUrl: '专家', //专家付费文件
      referrerId: '', //推荐费 若有referrerId则有推荐费
    }))
  })
  return {data: data, count: 1000}
}

//获取付费批次
export const getPayBatchList = req => {
  let data = []
  doCustomTimes(50, (index) => {
    data.push(Mock.mock({
      id: index,
      payBatchName: 20181101 + index,
      status: 'lock',
      logcallCount: index * 10,
    }))
  })
  return data
}

//加入付费批次
export const joinPayBatch = params => {
  let data;
  data = Mock.mock({});
  return data
}

//创建付费批次
export const createPayBatch = params => {
  let data;
  data = Mock.mock({});
  return data
}

//更新payBatch表
export const updatePayBatch = req => {
  let data;
  data = Mock.mock({});
  return data
}


//合并付费文件
export const mergePDF = req => {
  let data;
  data = Mock.mock({});
  return data
}

//合并付费文件
export const updateLogcallStatus = req => {
  let data;
  data = Mock.mock({});
  return data
}

//更新拒绝通过理由
export const updateRejectReason = req => {
  let data;
  data = Mock.mock({});
  return data
}


export const getRelationAccount = req => {
  let data = []
  doCustomTimes(10, (index) => {
    data.push(Mock.mock({
      id: index,
      clientInvoiceName: '@clientInvoiceName',
    }))
  })
  return data
}

export const relationAccount = req => {
  let data;
  data = Mock.mock({});
  return data
}


export const getPaymentList = req => {
  let data = []
  doCustomTimes(5, () => {
    data.push(Mock.mock({
      consultationType: '@consultationType', //咨询类型
      date: '@date', //咨询日期
      expertName: '@expertName', //专家
      projectId: '@projectId', //项目编号
      projectName: '@projectName', //项目名称
      pm: '@pm', //PM
      client: '@client', //客户
      status: '@status', //状态
      time: '@time', //时长  clientReportedDuration+'/'+expertReportedDuration
      payType: '@payType', //付费类型 小时 场次
      payMoney: '@payMoney', //支付金额
      clientInvoiceName: '', //账户
      mergePdfUrl: '', //专家付费文件
      referrerId: '', //推荐费 若有referrerId则有推荐费
    }))
  })
  doCustomTimes(5, () => {
    data.push(Mock.mock({
      consultationType: '@consultationType', //咨询类型
      date: '@date', //咨询日期
      expertName: '@expertName', //专家
      projectId: '@projectId', //项目编号
      projectName: '@projectName', //项目名称
      pm: '@pm', //PM
      client: '@client', //客户
      status: '待申请付费', //状态
      time: '@time', //时长  clientReportedDuration+'/'+expertReportedDuration
      payType: '@payType', //付费类型 小时 场次
      payMoney: '@payMoney', //支付金额
      clientInvoiceName: '@clientInvoiceName', //账户
      mergePdfUrl: '专家', //专家付费文件
      referrerId: '', //推荐费 若有referrerId则有推荐费
    }))
  })
  return {data: data, count: 1000}
}

//更新payment表
export const updatePayment = req => {
  let data;
  data = Mock.mock({});
  return data
}

//更新payment表
export const packageToFinance = req => {
  let data;
  data = Mock.mock({});
  return data
}


//更新payment表
export const packageToOut = req => {
  let data;
  data = Mock.mock({});
  return data
}



