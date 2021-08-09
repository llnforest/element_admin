import variables from '@/styles/element-variables.scss'

import { getSetting } from '@/utils/auth'

const getDefaultState = () => {
  console.log(getSetting('tagsView') || 0)
  return {
    theme: variables.theme,
    showSettings: 1,
    fixedHeader: 1,
    sidebarLogo: 1,
    tagsView: 1,
    supportPinyinSearch: 1
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

