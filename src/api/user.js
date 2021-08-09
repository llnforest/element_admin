import request from '@/utils/request'

export function login(data) {
  console.log(data)
  return request({
    url: 'auth/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: 'auth/userInfo',
    method: 'get'
    // headers: { token }
  })
}

export function logout() {
  return request({
    url: 'auth/logout',
    method: 'post'
  })
}
