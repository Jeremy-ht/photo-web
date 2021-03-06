import request from '@/utils/request'

const baseURL = 'http://127.0.0.1:3000'

/**
 * admin
 */
export function getAdminList(params) {
  return request({
    url: `/admin/getAdminList`,
    method: 'post',
    data: params
  })
}

export function addAdmin(params) {
  return request({
    url: `/admin/register`,
    method: 'post',
    data: params
  })
}

export function delAdmin(id) {
  return request({
    url: `/admin/delAdmin`,
    method: 'post',
    data: {'id': id}
  })
}

/**
 * user
 */
export function getUserList(params) {
  return request({
    url: `/user/getUsers`,
    method: 'post',
    data: params
  })
}

export function disableUserById(userId) {
  return request({
    url: `/user/disableUserById/${userId}`,
    method: 'get'
  })
}

export function ableUserById(userId) {
  return request({
    url: `/user/ableUserById/${userId}`,
    method: 'get'
  })
}

export function updUserInfo(params) {
  return request({
    url: `/user/updUserInfo`,
    method: 'post',
    data: params
  })
}

/**
 * category
 */
export function getCategoryList(params) {
  return request({
    url: `/category/getCategoryList`,
    method: 'post',
    data: params
  })
}

export function delCategory(id) {
  return request({
    url: `/category/delCategory`,
    method: 'post',
    data: {'id': id}
  })
}

export function addCategory(params) {
  return request({
    url: `/category/addCategory`,
    method: 'post',
    data: params
  })
}

export function getCategoryById(id) {
  return request({
    url: `/category/getCategoryById/${id}`,
    method: 'get'
  })
}

export function updCategory(params) {
  return request({
    url: `/category/updCategory`,
    method: 'post',
    data: params
  })
}


/**
 * log
 */
export function getLogList(params) {
  return request({
    url: `/log/getLogList`,
    method: 'get',
    params
  })
}

export function getUserLogList(params) {
  return request({
    url: `/log/getUserLogList`,
    method: 'get',
    params
  })
}

/**
 * detail
 */
export function addScenery(params) {
  return request({
    url: `/photo/addPhoto`,
    method: 'post',
    data: params
  })
}

export function getInfoList6(id) {
  return request({
    url: `/phones/getInfoList6/${id}`,
    method: 'get'
  })
}

export function addIndexShow(id, image) {
  return request({
    url: `/phones/addIndexShow/${id}/${image}`,
    method: 'get'
  })
}

export function fourList() {
  return request({
    url: `/phones/getFourIcon`,
    method: 'get'
  })
}

export function getSceneryList(params) {
  return request({
    url: `/photo/getPhotoList`,
    method: 'post',
    data: params
  })
}

export function getSceneryIndex() {
  return request({
    url: `/phones/getSceneryIndex`,
    method: 'get'
  })
}

export function getSceneryListByCate(id) {
  return request({
    url: `/flowers/getSceneryListByCate/${id}`,
    method: 'get'
  })

}

// export function getSceneryIndex() {
//   return request({
//     url: `/flowers/getSceneryIndex`,
//     method: 'get'
//   })
// }

export function getSceneryInfo(id) {
  return request({
    url: `/photo/getPhotoById`,
    method: 'post',
    data: {'id': id}
  })
}

export function pullScenery(id, state) {
  return request({
    url: `/category/pullCategory/${id}/${state}`,
    method: 'get'
  })
}

export function pullScenery2(id, state) {
  return request({
    url: `/flowers/pullScenery/${id}/${state}`,
    method: 'get'
  })
}

export function delScenery(id) {
  return request({
    url: `/photo/delPhoto`,
    method: 'post',
    data: {'id': id}
  })
}

export function getrotationList(id) {
  return request({
    url: `/detail/getrotationList`,
    method: 'get'
  })
}

export function getSearchContent(params) {
  return request({
    url: `/user/getSearchList`,
    method: 'post',
    data: params
  })
}

/**
 * login
 */

export function adminLogin(params) {
  return request({
    url: `/admin/login`,
    method: 'post',
    data: params
  })
}

export function updPasswordById(params) {
  return request({
    url: `/user/updPasswordById`,
    method: 'post',
    data: params
  })
}

export function updPasswordByIdadmin(id, params) {
  return request({
    url: `/admin/updPasswordById/${id}`,
    method: 'post',
    data: params
  })
}

/**
 * uploadFile
 */
export function uploadFile(params) {
  return request({
    url: `http://8.136.218.79:8080/upload/updataFile`,
    method: 'post',
    data: params
  })
}

export function getHomeCount() {
  return request({
    url: `/admin/getHomeCount`,
    method: 'get'
  })
}

/**
 * 网站首页
 */

export function getCategoryListHome() {
  return request({
    url: `/category/getCategoryList`,
    method: 'get'
  })
}

export function userLogin(params) {
  return request({
    url: `/user/login`,
    method: 'post',
    data: params
  })
}

export function addUser(params) {
  return request({
    url: `/user/register`,
    method: 'post',
    data: params
  })
}

/**
 * 统计
 */

export function getEchartsCategory() {
  return request({
    url: `/detail/getEchartsCategory`,
    method: 'get'
  })
}

export function getEchartsOrder() {
  return request({
    url: `/orders/getEchartsOrder`,
    method: 'post'
  })
}

export function getEchartsCate() {
  return request({
    url: `/orders/getEchartsCate`,
    method: 'post'
  })
}

export function getEchartsUser() {
  return request({
    url: `/detail/getEchartsUser`,
    method: 'get'
  })
}

/**
 * 地址
 */
export function addAddress(address) {
  return request({
    url: `/address/addAddress`,
    method: 'post',
    data: address
  })
}

export function getAddressList(param) {
  return request({
    url: `/category/getCategoryList`,
    method: 'post',
    data: param
  })
}

/**
 * 购物车
 */
export function addCart(cart) {
  return request({
    url: `/cart/addCart`,
    method: 'post',
    data: cart
  })
}

export function getCartList(id) {
  return request({
    url: `/order/getOrderById`,
    method: 'post',
    data: {'userid': id}
  })
}

export function delCart(id) {
  return request({
    url: `/cart/delCart/${id}`,
    method: 'get'
  })
}

export function updAmount(uid, id, value) {
  return request({
    url: `/cart/updAmount/${uid}/${id}/${value}`,
    method: 'get'
  })
}

export function getShoppingNum(id) {
  return request({
    url: `/cart/getShoppingNum`,
    method: 'post',
    data: {'userid': id}
  })
}

/**
 * 订单
 */
export function addOrder(order) {
  return request({
    url: `/orders/addOrder`,
    method: 'post',
    data: order
  })
}

export function addOrder2(order) {
  return request({
    url: `/order/addOrder`,
    method: 'post',
    data: order
  })
}

export function getOrderList(params) {
  return request({
    url: `/orders/getOrderList`,
    method: 'post',
    data: params
  })
}

/**
 * ======================== 拍照平台 ====================
 */
export function getUsers() {
  return request({
    url: `/users/getUsers`,
    method: 'post'
  })
}


/**
 * comment
 */
export function getCommentList(pagenum = 1, pagesize = 100, detailId = 0) {
  return request({
    url: `/comment/getCommentList`,
    method: 'post',
    data: {
      pagenum: pagenum,
      pagesize: pagesize,
      detailId: detailId
    }
  })
}

export function disableComment(id, state) {
  return request({
    url: `/comment/disableComment`,
    method: 'post',
    data: {
      id: id,
      state: state
    }
  })
}
export function updOrder(id) {
  return request({
    url: `/order/updOrder`,
    method: 'post',
    data: {
      id: id
    }
  })
}

export function addComment(params) {
  return request({
    url: `/comment/addComment`,
    method: 'post',
    data: params
  })
}
