import variables from '@/styles/element-variables.scss'

import { getSetting } from '@/utils/auth'

const getDefaultState = () => {
  return {
    theme: getSetting('theme') ? getSetting('theme') : variables.theme,
    showSettings: getSetting('showSettings') ? getSetting('showSettings') : true,
    fixedHeader: getSetting('fixedHeader') ? getSetting('fixedHeader') : true,
    sidebarLogo: getSetting('sidebarLogo') ? getSetting('sidebarLogo') : true,
    tagsView: getSetting('tagsView') ? getSetting('tagsView') : true,
    supportPinyinSearch: getSetting('supportPinyinSearch') ? getSetting('supportPinyinSearch') : true
  }
}

const state = getDefaultState()

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    // eslint-disable-next-line no-prototype-builtins
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  }
}

const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

