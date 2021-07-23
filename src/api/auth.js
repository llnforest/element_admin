import request from '@/utils/request'

export function getMenuList() {
  return request({
    url: '/auth/menu',
    method: 'post'
  })
}

