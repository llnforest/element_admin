import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'
const SettingKey = 'vue_admin_template_setting_'
const SettingKeyArr = ['theme', 'showSettings', 'fixedHeader', 'sidebarLogo', 'tagsView', 'supportPinyinSearch']
export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getSetting(key) {
  return Cookies.get(SettingKey + key)
}

export function setSetting(key, set) {
  return Cookies.set(SettingKey + key, set)
}

export function removeSetting() {
  SettingKeyArr.forEach(function(val, index, SettingKeyArr) {
    Cookies.remove(SettingKey + val)
  })
}

