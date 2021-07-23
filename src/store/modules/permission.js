import { constantRoutes } from '@/router'
import { getMenuList } from '@/api/auth'
import user from './user'
import Layout from '@/layout'
const _import = require('../../router/utils/_import_' + process.env.NODE_ENV) // 获取组件的方法

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
// 遍历后台传来的路由字符串，转换为组件对象
function filterAsyncRouter(asyncRouterMap) {
  return asyncRouterMap.filter(route => {
    if (route.component) {
      if (route.component === 'Layout') { // Layout组件特殊处理
        route.component = Layout
      } else if (typeof route.component !== 'object') {
        route.component = _import(route.component)
      }
    }
    if (route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children)
    }
    return true
  })
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }) {
    return new Promise((resolve, reject) => {
      getMenuList().then(response => {
        const { data } = response
        console.log(data)
        commit('SET_ROUTES', filterAsyncRouter(data))
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })

    // return new Promise(resolve => {
    //   const accessedRoutes = asyncRoutes || []
    //   commit('SET_ROUTES', accessedRoutes)
    //   resolve(accessedRoutes)
    // })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
