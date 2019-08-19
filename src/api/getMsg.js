import axios from 'axios';
// import Vue from 'vue';

// export let bus = new Vue();
let api = process.env.NODE_ENV == 'production' ? '/web' : '/index'

// 获取头尾信息
export function getMsg() {
  const url = api + '/site'
  return axios.get(url)
}

// 获取菜单
export function getMenu(){
  const url = api + '/menu'
  return axios.get(url)
}

// 获取内容
export function getContent(id){
  const url = api + '/page/' + id
  return axios.get(url)
}

// 请求出错
export const errorMsg = '请求出错啦，请稍后再试(*^_^*)'

