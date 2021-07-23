import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken, removeSetting, setSetting } from '@/utils/auth'
import { resetRouter } from '@/router'
import store from "@/store";

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password, uuid, geetest_challenge, geetest_validate, geetest_seccode } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password, uuid: uuid, geetest_challenge: geetest_challenge, geetest_validate: geetest_validate, geetest_seccode: geetest_seccode }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          return reject('Verification failed, please Login again.')
        }

        const { nickname, avatar, showSettings, fixedHeader, sidebarLogo, tagsView, supportPinyinSearch, theme } = data
        setSetting('theme', theme)
        setSetting('showSettings', showSettings)
        setSetting('fixedHeader', fixedHeader)
        setSetting('sidebarLogo', sidebarLogo)
        setSetting('tagsView', tagsView)
        setSetting('supportPinyinSearch', supportPinyinSearch)
        store.dispatch('settings/changeSetting', { key: 'theme', value: theme })
        store.dispatch('settings/changeSetting', { key: 'showSettings', value: showSettings })
        store.dispatch('settings/changeSetting', { key: 'fixedHeader', value: fixedHeader })
        store.dispatch('settings/changeSetting', { key: 'sidebarLogo', value: sidebarLogo })
        store.dispatch('settings/changeSetting', { key: 'tagsView', value: tagsView })
        store.dispatch('settings/changeSetting', { key: 'supportPinyinSearch', value: supportPinyinSearch })
        commit('SET_NAME', nickname)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        removeSetting()
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

