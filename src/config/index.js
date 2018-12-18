export default {
  /**
   * @description 配置显示在浏览器标签的title
   */
  title: 'west-admin',
  /**
   * @description token在Cookie中存储的天数，默认1天
   */
  cookieExpires: 1,
  /**
   * @description 是否使用国际化，默认为false
   *              如果不使用，则需要在路由中给需要在菜单中展示的路由设置meta: {title: 'xxx'}
   *              用来在菜单中显示文字
   */
  useI18n: true,
  /**
   * @description api请求基础路径
   */
  baseUrl: {
    // dev: 'https://www.easy-mock.com/mock/5add9213ce4d0e69998a6f51/iview-admin/',
    dev: 'http://localhost:6569/api/',
    pro: 'https://produce.com'
  },
  /**
   * @description 默认打开的首页的路由name值，默认为home
   */
  homeName: 'home',
  /**
   * @description 需要加载的插件
   */
  plugin: {
    'error-store': {
      showInHeader: true, // 设为false后不会在顶部显示错误日志徽标
      developmentOff: true // 设为true后在开发环境不会收集错误信息，方便开发中排查错误
    }
  },
  ids4Config: {
    clientApi: 'http://localhost:6569/api/client/',
    activityApi: 'http://localhost:6569/api/activity/',
    authority: 'http://localhost:6566',
    client_id: 'expert-web',
    redirect_uri: 'http://localhost:6568/openIdCallback',
    response_type: 'id_token token',
    scope: 'openid profile expert-api',
    post_logout_redirect_uri: 'http://localhost:6566'
  },
  adminMenu: [
    {
      type: 'item',
      name: '项目信息',
      router: {
        name: 'project'
      }
    },
    {
      type: 'item',
      name: '专家',
      router: {
        name: 'expert'
      }
    },
    {
      type: 'item',
      name: '客户',
      router: {
        name: 'client'
      }
    },
    {
      type: 'tree',
      icon: '',
      name: '付费管理',
      items: [
        {
          type: 'item',
          name: '咨询记录',
          router: {
            name: 'logcall'
          }
        },
        {
          type: 'item',
          name: '审核队列',
          router: {
            name: 'audit'
          }
        },
        {
          type: 'item',
          name: '付费批次',
          router: {
            name: 'pay'
          }
        }
      ]
    },
  ]
}
