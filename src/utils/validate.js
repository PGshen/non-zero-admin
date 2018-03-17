/**
 * Created by jiachenpan on 16/11/18.
 */

export function isvalidUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

/* 合法uri*/
export function validateURL(textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlregex.test(textval)
}

/* 小写字母*/
export function validateLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/* 大写字母*/
export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/* 大小写字母*/
export function validatAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/* 是否是公司邮箱*/
export function isWscnEmail(str) {
  const reg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
  return reg.test(str.trim())
}

/**
 * validate email
 * @param email
 * @returns {boolean}
 */
export function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}
/* 是否是合法手机号 */
export function isMobile(str) {
  const reg = /^((1[3-8][0-9])+\d{8})$/
  return reg.test(str)
}

/* 是否是合法的电话号码 */
export function isTel(str) {
  const reg = /^0\d{2,3}-?\d{7,8}$/
  return reg.test(str)
}

// 微信号正则，6至20位，以字母开头，字母，数字，减号，下划线
export function validateWechat(wechat) {
  const reg = /^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/
  return reg.test(wechat)
}

// QQ号正则，5至11位
export function validateQQ(qq) {
  const reg = /^[1-9][0-9]{4,10}$/
  return reg.test(qq)
}

// 身份证号（15/18位）正则
export function validateCreditCard(creditCard) {
  const reg15 = /^[1-9]\\d{7}((0\\d)|(1[0-2]))(([0|1|2]\\d)|3[0-1])\\d{3}$/
  const reg18 = /^[1-9]\\d{5}[1-9]\\d{3}((0\\d)|(1[0-2]))(([0|1|2]\\d)|3[0-1])\\d{3}([0-9]|X)$/
  return reg15.test(creditCard) | reg18.test(creditCard)
}

// 字符串仅能是中文
export function chineseOnly(str) {
  const reg = /^[\\u4e00-\\u9fa5]{0,}$/
  return reg.test(str)
}

// 校验金额(精确到2位小数)
export function validateMoneyNum(num) {
  const reg = /^[0-9]+(.[0-9]{2})?$/
  return reg.test(num)
}
