/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/views/layout/Layout'

const paymentRouter = {
  path: '/payment',
  component: Layout,
  redirect: 'noredirect',
  name: 'Payment',
  meta: {
    title: '费用管理',
  },
  children: [
    {
      path: 'logcall',
      component: () => import('@/views/payment/logcall'),
      name: 'Logcall',
      meta: {title: '咨询管理', noCache: true}
    },
    {
      path: 'audit',
      component: () => import('@/views/payment/audit'),
      name: 'Audit',
      meta: {title: '审核队列', noCache: true}
    },
    {
      path: 'pay',
      component: () => import('@/views/payment/pay'),
      name: 'Pay',
      meta: {title: '付费批次', noCache: true}
    }
  ]
}

export default paymentRouter
