import Mock from 'mockjs'
import {
  getPaymentConfirmation,
  updatePaymentConfirmation,
  getProjectConfirmation,
  updateProjectConfirmation,
  getLogcallList,
  getPayBatchList,
  mergePDF,
  updateLogcallStatus,
  getRelationAccount,
  relationAccount,
  updateRejectReason,
  joinPayBatch,
  createPayBatch,
  getPaymentList,
  updatePayment,
  updatePayBatch,
  packageToFinance,
  packageToOut
} from './payment'

// 配置Ajax请求延时，可用来测试网络延迟大时项目中一些效果
Mock.setup({
  timeout: 1000
})
if (process.env.NODE_ENV === 'development') {
  Mock.mock(/\/getPaymentConfirmation/, getPaymentConfirmation)
  Mock.mock(/\/updatePaymentConfirmation/, updatePaymentConfirmation)
  Mock.mock(/\/getProjectConfirmation/, getProjectConfirmation)
  Mock.mock(/\/updateProjectConfirmation/, updateProjectConfirmation)
  Mock.mock(/\/getLogcallList/, getLogcallList)
  Mock.mock(/\/getPayBatchList/, getPayBatchList)
  Mock.mock(/\/joinPayBatch/, joinPayBatch)
  Mock.mock(/\/createPayBatch/, createPayBatch)
  Mock.mock(/\/mergePDF/, mergePDF)
  Mock.mock(/\/updateLogcallStatus/, updateLogcallStatus)
  Mock.mock(/\/getRelationAccount/, getRelationAccount)
  Mock.mock(/\/relationAccount/, relationAccount)
  Mock.mock(/\/updateRejectReason/, updateRejectReason)
  Mock.mock(/\/getPaymentList/, getPaymentList)
  Mock.mock(/\/updatePayment/, updatePayment)
  Mock.mock(/\/updatePayBatch/, updatePayBatch)
  Mock.mock(/\/packageToOut/, packageToOut)
  Mock.mock(/\/packageToFinance/, packageToFinance)


}

export default Mock
