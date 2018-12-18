import axios from 'axios'
import {global} from './global'
import config from '@/config'
import Vue from 'vue'

class HttpRequest {
  constructor (baseUrl = baseURL) {
    this.baseUrl = baseUrl
    this.queue = {}
  }

  getInsideConfig () {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        //
      }
    }
    return config
  }

  destroy (url) {
    delete this.queue[url]
    if (!Object.keys(this.queue).length) {
      // Spin.hide()
    }
  }

  interceptors (instance, url) {
    // 请求拦截
    instance.interceptors.request.use(config => {
      // 添加全局的loading...
      if (!Object.keys(this.queue).length) {
        // Spin.show() // 不建议开启，因为界面不友好
      }
      this.queue[url] = true
      return config
    }, error => {
      return Promise.reject(error)
    })
    // 响应拦截
    instance.interceptors.response.use(res => {
      this.destroy(url)
      const {data, status} = res
      return {data, status}
    }, error => {
      this.destroy(url)
      let errorInfo = error.response
      if (!errorInfo) {
        const {request: {statusText, status}, config} = JSON.parse(JSON.stringify(error))
        errorInfo = {
          statusText,
          status,
          request: {responseURL: config.url}
        }
        console.error(errorInfo)
      }
      return Promise.reject(error)
    })
  }

  request (options) {
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    if (Vue && Vue.prototype.$user && Vue.prototype.$user.access_token) {
      options.headers['Authorization'] = 'Bearer ' + global.$user.access_token
    }
    this.interceptors(instance, options.url)
    return instance(options)
  }
}

const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro

export default new HttpRequest(baseUrl)
