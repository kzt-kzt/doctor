import axios from '@/libs/api.request'
import qs from 'qs'

export const login = ({ userName, password }) => {
  const data = qs.stringify({
    username: userName,
    password
  })
  console.log(data)
  return axios.request({
    url: '/login.zhtml',
    data,
    method: 'post'
  })
}


export const getUserInfo = (token) => {
  return axios.request({
    url: '/user/getUserInfo',
    params: {
      token
    },
    method: 'post'
  })
}

export const logout = (token) => {
  return axios.request({
    url: '/logOut.zhtml',
    method: 'post'
  })
}
