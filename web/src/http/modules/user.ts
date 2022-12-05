/*
	用户相关api
**/

import $axios from '../index'

// 登录
export const login = (p: any) => $axios.post('/inkwash/auth/login', p)

// 注册
export const register = (p: any) => $axios.post('/inkwash/auth/register', p)

// 获取用户信息
export const getUserInfo = () => $axios.get('/inkwash/user/info')
// 获取用户信息 by userId
export const getUserInfoById = (p: any) => $axios.get('/inkwash/user/getInfoById', p)
// 获取用户信息 by userId
export const getUserInfoByIds = (p: any) => $axios.get('/inkwash/user/getInfoByIds', p)

// 修改用户昵称
export const updateNickName = (p: any) => $axios.post('/inkwash/user/update/name', p)

// 修改密码
export const updateUserPass = (p: any) => $axios.post('/inkwash/user/update/pass', p)

// 修改头像
export const updateUserAvatar = (p: any) => $axios.post('/inkwash/user/update/avatar', p)

// 关键字搜索用户列表
export const getUserListByKeywords = (p: any) => $axios.get('/inkwash/user/getUserList', p)

/**
 * 文章作者相关
 */
export const getAuthorInfo = (p: any) => $axios.post('/inkwash/author/info', p)
