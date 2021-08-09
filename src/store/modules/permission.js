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
        let { data } = response
        console.log(data)
        data = [
          {
            path: '/',
            component: 'Layout',
            redirect: 'dashboard/index',
            children: [{
              path: 'dashboard/index',
              name: 'dashboard/index',
              component: 'dashboard/index',
              meta: { title: '控制台', icon: 'dashboard', affix: true }
            }]
          },

          {
            path: '/table',
            component: 'Layout',
            redirect: '/table/index',
            meta: { title: '案例', icon: 'el-icon-s-help' },
            children: [
              {
                path: 'table/index',
                name: 'table/index',
                component: 'table/index',
                meta: { title: '表格', icon: 'table' }
              },
              {
                path: 'tree/index',
                name: 'tree/index',
                component: 'tree/index',
                meta: { title: '树形', icon: 'tree' }
              }
            ]
          },

          {
            path: '/form',
            component: 'Layout',
            children: [
              {
                path: 'index',
                name: 'Form',
                component: 'form/index',
                meta: { title: '表单', icon: 'form' }
              }
            ]
          },

          {
            path: '/nested',
            component: 'Layout',
            redirect: '/nested/menu1',
            name: 'Nested',
            meta: {
              title: '菜单',
              icon: 'nested'
            },
            children: [
              {
                path: 'menu1',
                component: 'nested/menu1/index', // Parent router-view
                name: 'Menu1',
                meta: { title: '菜单1' },
                children: [
                  {
                    path: 'menu1-1',
                    component: 'nested/menu1/menu1-1/index',
                    name: 'Menu1-1',
                    meta: { title: 'Menu1-1' }
                  },
                  {
                    path: 'menu1-2',
                    component: 'nested/menu1/menu1-2/index',
                    name: 'Menu1-2',
                    meta: { title: 'Menu1-2' },
                    children: [
                      {
                        path: 'menu1-2-1',
                        component: 'nested/menu1/menu1-2/menu1-2-1/index',
                        name: 'Menu1-2-1',
                        meta: { title: 'Menu1-2-1' }
                      },
                      {
                        path: 'menu1-2-2',
                        component: 'nested/menu1/menu1-2/menu1-2-2/index',
                        name: 'Menu1-2-2',
                        meta: { title: 'Menu1-2-2' }
                      }
                    ]
                  },
                  {
                    path: 'menu1-3',
                    component: 'nested/menu1/menu1-3/index',
                    name: 'Menu1-3',
                    meta: { title: 'Menu1-3' }
                  }
                ]
              },
              {
                path: 'menu2',
                component: 'nested/menu2/index',
                name: 'Menu2',
                meta: { title: '菜单2' }
              }
            ]
          },

          {
            path: 'external-link',
            component: 'Layout',
            children: [
              {
                path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
                meta: { title: '外链', icon: 'link' }
              }
            ]
          },
          // 404 page must be placed at the end !!!
          { path: '*', redirect: '/404', hidden: true }

        ]
        data = response.data
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
