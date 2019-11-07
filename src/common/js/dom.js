export function addClass (el, className) {
  if (hasClass(el, className)) {
    return
  }
  let newClass = el.className.split(' ')
  newClass.push(className)
  el.className = newClass.join(' ')
}

export function hasClass (el, className) {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)') // className前后可以跟空白字符
  return reg.test(el.className)
}

/**
 * 获取或设置元素中'data-'属性的值
 * @param {Object} el 元素对象
 * @param {String} name 属性名
 * @param {String} val 属性值
 */
export function getData (el, name, val) {
  if (val) {
    el.dataset[name] = val
  } else {
    return el.dataset[name]
  }
}
